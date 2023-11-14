import React from "react";
import { useNavigate } from "react-router-dom";
import ListCards from "../../components/ListCard/listcards";
import RoundProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Button from "../../components/shared/Button/Button";

function ProfilePage() {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    // Navigate to the 'edit-profile' page
    navigate("/edit-profile");
  };

  const handleFriendsClick = () => {
    // Navigate to the 'friends' page
    navigate("/friends");
  };

  return (
    <div style={{ backgroundColor: "#f9f3ef", padding: "20px" }}>
      <h1
        style={{
          marginLeft: "20px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "36px",
          fontWeight: "600",
        }}
      >
        Profile
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <RoundProfilePicture />
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            marginTop: "10px",
            fontSize: "36px",
            fontWeight: "600",
          }}
        >
          Alice
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
          gap: "30px",
        }}
      >
        <Button
          text="Edit Profile"
          onClick={handleEditProfileClick}
          style={{ width: "232px", height: "68px" }}
        />{" "}
        <Button
          text="30 Friends"
          onClick={handleFriendsClick}
          style={{ width: "232px", height: "68px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px", //should create a space between the cards
          marginTop: "20px",
        }}
      >
        {/* Inline styles for ListCards */}
        <ListCards
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
