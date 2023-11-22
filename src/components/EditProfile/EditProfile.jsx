import React, { useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSaveChanges = () => {
    // Add your logic to save changes (update password) here
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      // Your logic to update the password goes here
      // For example, you might make an API call to your server
      // to update the user's password
      console.log("Password updated successfully!");
      setError(null); // Clear any previous error
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <div>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
