import React from "react";
import "./ProfilePicture2.css";

const images = ["/images/Alice.jpeg"];

function ProfilePicture2() {
  return (
    <div className="profile-container">
      <img className="profile-picture" src={images[0]} alt="Alice" />
    </div>
  );
}

export default ProfilePicture2;
