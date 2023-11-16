import React from "react";
import "./notificationcards.css";
import profile from "../../assets/icons/profile.svg";
import bob from "../../assets/images/bob.jpeg";

function NotificationCard() {
  const texts = ["Bob liked your post", "Cate commented on your post"];

  return (
    <div>
      {texts.map((text, index) => (
        <Card key={index} text={text} />
      ))}
    </div>
  );
}

function Card({text}) {
  return (
    <div className="friend-card">
      <div className="friend-content">
        <div className="image-container">
          <div className="profile-image-border">
            <div className="profile-image-wrapper">
              <img src={bob} alt="Profile" className="profile-image" />
            </div>
          </div>
        </div>
        <div className="text-container">
          <h1 className="notification-text">{text}</h1>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
