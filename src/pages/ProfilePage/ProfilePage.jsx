import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListCards from "../../components/ListCard/listcards";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import ButtonSh from "../../components/shared/ButtonShort/ButtonShort";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./ProfilePage.css";
import BackButton from "../../components/shared/GoBackButton/GoBackButton";
import Parse from "parse/dist/parse.min";

function ProfilePage() {
  const navigate = useNavigate();
  const [editProfilePressed, setEditProfilePressed] = useState(false);
  const [friendsPressed, setFriendsPressed] = useState(false);
  const [userName, setUserName] = useState(""); // State to store the user's name

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setUserName(currentUser.get("name") || "Alice"); // dunno if necessary
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
      <BackButton />
      <div className="profile-section">
        <div className="profile-picture">
          <ProfilePicture2 showEditButton={false} />
        </div>
        <p className="profile-name">{userName}</p>{" "}
        {/* dsplay the user name from our app db */}
      </div>
      <div className="buttons-container">
        <ButtonSh
          text="Edit Profile"
          onClick={handleEditProfileClick}
          className={editProfilePressed ? "button pressed" : "button"}
        />
        <ButtonSh
          text="30 Friends"
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
