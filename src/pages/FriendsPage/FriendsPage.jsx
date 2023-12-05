import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import FriendCards from "../../components/FriendCard/friendcards";
import "./FriendsPage.css";
import TopBar from "../../components/shared/TopBar/TopBar";

function FriendsPage() {
  const [allNames, setAllNames] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [allFriends, setAllFriends] = useState([]);
  const [addedUserNames, setAddedUserNames] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const currentUser = Parse.User.current();
      if (currentUser) {
        const currentUserName = currentUser.getUsername();
        setCurrentUserName(currentUserName);
        try {
          const userQuery = new Parse.Query("_User");
          userQuery.notEqualTo("objectId", currentUser.id);
          const allUsers = await userQuery.find();
          const allNames = allUsers.map((user) => user.get("username"));
          setAllNames(allNames);
        } catch (error) {
          console.error("Error fetching friend data:", error);
        }
      }
    }
    fetchAll();
  }, []);

  useEffect(() => {
    async function fetchFriendData() {
      const currentUser = Parse.User.current();
      if (currentUser) {
        const currentUserName = currentUser.getUsername();
        setCurrentUserName(currentUserName);
        try {
          const friendshipQuery1 = new Parse.Query("Friendship");
          friendshipQuery1.equalTo("user1", currentUserName);
          friendshipQuery1.equalTo("status", "Friends");
          const result1 = await friendshipQuery1.find();
          const friends1 = result1.map(
            (friendship) => friendship.get("user2")?.id || null
          );

          const friendshipQuery2 = new Parse.Query("Friendship");
          friendshipQuery2.equalTo("user2", currentUserName);
          friendshipQuery2.equalTo("status", "Friends");
          const result2 = await friendshipQuery2.find();
          const friends2 = result2.map(
            (friendship) => friendship.get("user1")?.id || null
          );

          const allFriends = friends1.concat(friends2);

          setAllFriends(allFriends);

          const friendshipQuery3 = new Parse.Query("Friendship");
          friendshipQuery3.equalTo("user1", currentUserName);
          friendshipQuery3.equalTo("status", "Pending");
          const result3 = await friendshipQuery3.find();
          const addedUserNames = result3.map(
            (friendship) => friendship.get("user2")?.id || null
          );

          setAddedUserNames(addedUserNames);

          console.log("added users:" + addedUserNames);
          console.log("friends:" + allFriends);
        } catch (error) {
          console.error("Error fetching friend data:", error);
        }
      } else {
        console.log("No current user");
      }
    }

    fetchFriendData();
  }, []);

  const filteredUsers = searchValue
    ? allNames.filter((name) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : allFriends;

  return (
    <div className="friend-page">
      <TopBar pageName={"Friends"} />
      <div className="friend-search-container">
        <input
          type="text"
          placeholder="🔍 Add a new friend by username"
          className="friend-search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="friend-card-appearance">
        <FriendCards
          filteredUsers={filteredUsers}
          friendNames={allFriends}
          currentUserName={currentUserName}
          addedNames={addedUserNames}
        />
      </div>
    </div>
  );
}

export default FriendsPage;
