import React from "react";
import AliceImage from "../../../public/images/Alice.jpeg";
import "./ProfilePicture2.css";

function ProfilePicture2() {
  return (
    <div className="profile-container">
      <img className="profile-picture" src={AliceImage} alt="Alice" />
    </div>
  );
}

export default ProfilePicture2;
