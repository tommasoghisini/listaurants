import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { Link } from "react-router-dom";
import "./FriendCards.css";
import ProfilePicture from "../shared/ProfilePicture/ProfilePicture";

function FriendCards({
  filteredUsers,
  allFriends,
  currentUserName
}) {
  return (
    <div>
      {filteredUsers.map((user, index) =>
        user ? (
          allFriends?.some((friend) => friend.username === user.username) ? (
            <Card
              key={index}
              username={user.username}
              userid={user.id}
              profilepicture={user.profilepicture}
              currentUserName={currentUserName}
              isFriend={true}
            />
          ) : (
            <Card
              key={index}
              username={user.username}
              profilepicture={user.profilepicture}
              currentUserName={currentUserName}
              isFriend={false}
            />
          )
        ) : null
      )}
    </div>
  );
}

const Card = React.memo(
  ({ username, profilepicture, isFriend, currentUserName, userid }) => {

    const [friend, setFriend] = useState(isFriend);
    useEffect(() => {
      setFriend(isFriend);
    }, [isFriend]);

    const linkStyle = {
      textDecoration: "none",
      color: "inherit",
    };

    const handleAction = async () => {
      if (friend) {
        console.log("Trying to remove friend");
        try {
          const Friendship = Parse.Object.extend("Friendship");
          const query1 = new Parse.Query(Friendship);
          const query2 = new Parse.Query(Friendship);

          // Query for the friendship where user2=user
          query1.equalTo("user1", {
            __type: "Pointer",
            className: "_User",
            objectId: currentUserName,
          });
          query1.equalTo("user2", {
            __type: "Pointer",
            className: "_User",
            objectId: username,
          });

          // Query for the friendship where user1=user
          query2.equalTo("user1", {
            __type: "Pointer",
            className: "_User",
            objectId: username,
          });
          query2.equalTo("user2", {
            __type: "Pointer",
            className: "_User",
            objectId: currentUserName,
          });

          const mainQuery = Parse.Query.or(query1, query2);

          const rowToDelete = await mainQuery.first();
          if (rowToDelete) {
            const result = await rowToDelete.destroy();

            setFriend(false);
            isFriend = false;

            console.log("Friendship removed successfully:", result);
          } else {
            console.log("Friendship not found");
          }
        } catch (error) {
          console.error("Error removing friend:", error);
        }
      } else {
        console.log(`New friendship with: ${username}`);
        try {
          const Friendship = Parse.Object.extend("Friendship");
          const newFriendship = new Friendship();

          newFriendship.set("user1", {
            __type: "Pointer",
            className: "_User",
            objectId: currentUserName,
          });
          newFriendship.set("user2", {
            __type: "Pointer",
            className: "_User",
            objectId: username,
          });

          newFriendship.set("status", "Friends");

          const result = await newFriendship.save();
          setFriend(true);
          isFriend = true;

          console.log("Friendship added successfully:", result);
        } catch (error) {
          console.error("Error adding friend:", error);
        }
      }
    };

    return (
      <div className="friend-card">
        <div className="friend-content">
          <div className="image-container">
            <ProfilePicture imgSrc={profilepicture} height="50px" />
          </div>
          <div className="text-container">
            {userid ? (
              <Link to={`/profile?userParameter=${userid}`} style={linkStyle}>
                <h1 className="friend-name">{username}</h1>
              </Link>
            ) : (
              <h1 className="friend-name">{username}</h1>
            )}
          </div>
          <button className="action-button" onClick={handleAction}>
            {friend ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    );
  }
);

export default FriendCards;
