import React from "react";
import { useNavigate } from "react-router-dom";
import ListCards from "../../components/ListCard/listcards";
import RoundProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Button from "../../components/shared/ButtonShort/ButtonShort";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate("/edit-profile");
  };

  const handleFriendsClick = () => {
    navigate("/friends");
  };

  return (
    <div className="container">
      <h1 className="page-title">Profile</h1>
      <div className="profile-section">
        <div className="profile-picture">
          <RoundProfilePicture />
        </div>
        <p className="profile-name">Alice</p>
      </div>
      <div className="buttons-container">
        <Button
          text="Edit Profile"
          onClick={handleEditProfileClick}
          className="button"
        />
        <Button
          text="30 Friends"
          onClick={handleFriendsClick}
          className="button"
        />
      </div>
      <div className="cards-container">
        <ListCards className="cards" />
      </div>
    </div>
  );
}

export default ProfilePage;
