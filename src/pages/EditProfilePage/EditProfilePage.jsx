import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import Button from "../../components/shared/Button/Button";
import "./EditProfilePage.css";
import GoBackButton from "../../components/shared/GoBackButton/GoBackButton";
import Parse from "parse/dist/parse.min";

function EditProfilePage() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const currentUser = Parse.User.current();
    if (currentUser) {
      setName(currentUser.get("name") || "Alice"); // fallback for al least something
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveEdits = async () => {
    console.log("Saving edits...");
    const currentUser = Parse.User.current();
    if (currentUser) {
      currentUser.set("name", name);
      try {
        await currentUser.save();
        console.log("Name updated successfully");
        navigate("/profile");
      } catch (error) {
        console.error("Error updating name:", error);
      }
    }
  };

  const handleLogOut = () => {
    console.log("Logging out...");
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account...");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameSubmit = () => {
    setEditMode(false);
    handleSaveEdits();
  };

  return (
    <div className="container-sana">
      {/* <GoBackButton /> */}
      <div className="profile-picture">
        <ProfilePicture2 showEditButton={true} />
      </div>
      <div className="name-and-buttons-container">
        {editMode ? (
          <div className="profile-name-edit">
            <input type="text" value={name} onChange={handleNameChange} />
            <button onClick={handleNameSubmit}>Submit</button>
          </div>
        ) : (
          <div className="profile-name-container">
            <span className="profile-name">{name}</span>
            <img
              src="https://www.svgrepo.com/show/75500/edit-button.svg"
              alt="Edit"
              onClick={() => setEditMode(true)}
              className="edit-icon"
            />
          </div>
        )}
        <div className="buttons-container-edit-profile">
          <Button text="Save Edits" onClick={handleSaveEdits} />
          <Button text="Log out" onClick={handleLogOut} />
          <Button text="Delete Account" onClick={handleDeleteAccount} />
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
