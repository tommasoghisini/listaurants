import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import Button from "../../components/shared/Button/Button";
import "./EditProfilePage.css";
import GoBackButton from "../../components/shared/GoBackButton/GoBackButton";

function EditProfilePage() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false); //I moved this from profilepage
  const [name, setName] = useState("Alice"); //I moved this from profilepage

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveEdits = () => {
    console.log("Saving edits...");
  };

  const handleLogOut = async () => {
    try {
      await Parse.User.logOut();
      console.log("Logged out successfully");
      navigate("/"); // Navigate to login page or wherever you want
    } catch (error) {
      console.log("Error while logging out: ", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      const currentUser = Parse.User.current();
      try {
        await currentUser.destroy();
        console.log("Account deleted successfully");
        navigate("/");
      } catch (error) {
        console.log("Error while deleting account: ", error);
      }
    }
  };


  const handleNameChange = (e) => {
    setName(e.target.value); // Update name as user types
  };

  const handleNameSubmit = () => {
    setEditMode(false);
    // where is server, where do i write name change? I MOVED line 29-37 HERE FROM PROFILE PAGE
  };

  return (
    <div className="container">
      <GoBackButton />
      <div className="profile-section">
        <div className="profile-picture">
          <ProfilePicture2 />
        </div>
        {editMode ? (
          <div className="profile-name-edit">
            <input type="text" value={name} onChange={handleNameChange} />
            <button onClick={handleNameSubmit}>Submit</button>
          </div>
        ) : (
          <p className="profile-name">
            {name}
            <img
              src="https://www.svgrepo.com/show/75500/edit-button.svg"
              alt="Edit"
              onClick={() => setEditMode(true)}
              className="edit-icon" //I MOVED LINE 41-56 HERE FROM PROFILE PAGE
            />
          </p>
        )}

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
