import React from "react";
import "./notificationcards.css";
import ProfilePicture from "../shared/ProfilePicture/ProfilePicture";

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

function Card({ text }) {
  return (
    <div className="friend-card">
      <div className="friend-content">
        <ProfilePicture imgSrc={"/images/bob.jpeg"} height="50px" />

        <div className="text-container">
          <h1 className="notification-text">{text}</h1>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
