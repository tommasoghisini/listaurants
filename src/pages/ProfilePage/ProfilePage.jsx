import React from "react";
import { useNavigate } from "react-router-dom";
import ListCards from "../../components/ListCard/listcards";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import ButtonSh from "../../components/shared/ButtonShort/ButtonShort";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate("/edit-profile");
  };

  const handleFriendsClick = () => {
    navigate("/FriendsPage");
  };

  return (
    <div className="container">
      <TopBar pageName="Profile" />
      <div className="profile-section">
        <div className="profile-picture">
          <ProfilePicture2 />
        </div>
        <p className="profile-name">Alice</p>
      </div>
      <div className="buttons-container">
        <ButtonSh text="Edit Profile" onClick={handleEditProfileClick} />
        <ButtonSh text="30 Friends" onClick={handleFriendsClick} />
      </div>
      <div className="cards-container">
        <ListCards className="cards" />
      </div>
    </div>
  );
}

export default ProfilePage;
