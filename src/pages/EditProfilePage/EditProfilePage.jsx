import React from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2"; //fix this
import EditProfile from "../../components/EditProfile/EditProfile";
import Button from "../../components/shared/Button/Button";
import UploadImageButton from "../../components/shared/UploadImageButton/UploadImageButton";
import "./EditProfilePage.css";
import GoBackButton from "../../components/shared/GoBackButton/GoBackButton";

function EditProfilePage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveEdits = () => {
    console.log("Saving edits...");
  };

  const handleLogOut = () => {
    console.log("Logging out...");
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account...");
  };

  return (
    <div className="container">
      <GoBackButton />
      <div className="profile-section">
        <div className="profile-picture">
          <ProfilePicture2 />
        </div>
        <p className="profile-name">Alice</p>
      </div>
      <div className="buttons-container">
        <div className="button-container">
          <Button text="Save Edits" onClick={handleSaveEdits} />
        </div>
        <div className="button-container">
          <Button text="Log out" onClick={handleLogOut} />
        </div>
        <div className="button-container">
          <Button text="Delete Account" onClick={handleDeleteAccount} />
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
