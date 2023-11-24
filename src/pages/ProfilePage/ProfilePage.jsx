import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListCards from "../../components/ListCard/listcards";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import ButtonSh from "../../components/shared/ButtonShort/ButtonShort";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./ProfilePage.css";
import BackButton from "../../components/shared/GoBackButton/GoBackButton";

function ProfilePage() {
  const navigate = useNavigate();
  const [editProfilePressed, setEditProfilePressed] = useState(false);
  const [friendsPressed, setFriendsPressed] = useState(false);
  const [editMode, setEditMode] = useState(false);
  

  const handleEditProfileClick = () => {
    navigate("/editprofilepage");
    setEditProfilePressed(true);
  };

  const handleFriendsClick = () => {
    navigate("/friendspage");
    setFriendsPressed(true);
  };

  return (
    <div className="container">
      <TopBar pageName="Profile" />
      <BackButton />
      {/*<div className="profile-section">*/}
      {/*  <div className="profile-picture">*/}
      {/*    <ProfilePicture2 />*/}
      {/*  </div>*/}
      {/*  <p className="profile-name">Alice</p>*/}
      {/*</div>*/}
      <div className="profile-section">
        <div className="profile-picture">
          <ProfilePicture2 />
        </div>
        <p className="profile-name">Alice</p> 
        
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
