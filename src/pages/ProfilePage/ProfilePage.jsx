import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListCards from "../../components/ListCard/listcards";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import ButtonSh from "../../components/shared/ButtonShort/ButtonShort";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./ProfilePage.css";
import Parse from "parse/dist/parse.min";

function ProfilePage() {
  const navigate = useNavigate();
  const [editProfilePressed, setEditProfilePressed] = useState(false);
  const [friendsPressed, setFriendsPressed] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the user's name
  const [friendsNumber, setFriendsNumber] = useState(0); // State to store the number of friends

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUserName(currentUser.get("name") || "Anonymous"); // dunno if necessary

      const FriendshipData = Parse.Object.extend("Friendship");
      const User = Parse.Object.extend("User");
      const userPointer = new User();
      userPointer.id = currentUser.getUsername();

      // Query for friendships where current user is user1
      const queryUser1 = new Parse.Query(FriendshipData);
      queryUser1.equalTo("user1", userPointer);
      queryUser1.equalTo("status", "Friends");
      queryUser1.include("user2"); // Include user2 data

      // Query for friendships where current user is user2
      const queryUser2 = new Parse.Query(FriendshipData);
      queryUser2.equalTo("user2", userPointer);
      queryUser2.equalTo("status", "Friends");
      queryUser2.include("user1"); // Include user1 data

      // Combine the queries
      const combinedQuery = Parse.Query.or(queryUser1, queryUser2);
      combinedQuery.count().then((count) => {
        setFriendsNumber(count);
      });
    }
  }, []);

  const handleEditProfileClick = () => {
    navigate("/editprofilepage");
    setEditProfilePressed(true);
  };

  const handleFriendsClick = () => {
    navigate("/friendspage");
    setFriendsPressed(true);
  };

  return (
    <div className="container-sana">
      <TopBar pageName="Profile" />
      {/*<BackButton />*/}
      <div>
        <ProfilePicture2 showEditButton={false} />
        <p className="profile-name">{userName}</p>{" "}
        {/* dsplay the user name from our app db */}
      </div>
      <div className="buttons-container-profile">
        <ButtonSh
          text="Edit Profile"
          onClick={handleEditProfileClick}
          className={editProfilePressed ? "button pressed" : "button"}
        />
        <ButtonSh
          text={friendsNumber + " Friends"}
          onClick={handleFriendsClick}
          className={friendsPressed ? "button pressed" : "button"}
        />
      </div>
      <div className="cards-container">
        <ListCards className="cards" />
      </div>
    </div>
  );
}

export default ProfilePage;
