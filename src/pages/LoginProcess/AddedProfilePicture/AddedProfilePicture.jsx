import "./AddedProfilePicture.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/shared/Button/Button";
import TopbarSignup from "../../../components/TopbarSignup/TopbarSignup";
import ProfilePicture2 from "../../../components/ProfilePicture2/ProfilePicture2";
import React from "react";

const AddedProfilePicture = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle account creation
    navigate("/home");
  };

  return (
    <div className="verification-page">
      <div>
        <TopbarSignup prevProgress={0.8} progressMax={1} />

        <h1 className="title">
          Welcome {username}, your account is all set up!
        </h1>
        <div className="profile-img-default">
          <ProfilePicture2 showEditButton={false} />
        </div>
      </div>
      <Button text="Let's start" onClick={handleSubmit} />
    </div>
  );
};

export default AddedProfilePicture;
