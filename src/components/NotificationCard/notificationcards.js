import React from "react";
import "./notificationcards.css";
import ProfilePicture from "../shared/ProfilePicture/ProfilePicture";

function NotificationCard({ notifications }) {
  return (
    <div>
      {notifications.map((notification, index) => (
        <Card
          key={index}
          text={notification.message}
          imgSrc={notification.imgSrc}
        />
      ))}
    </div>
  );
}

function Card({ text, imgSrc }) {
  return (
    <div className="friend-card">
      <div className="friend-content">
        <ProfilePicture imgSrc={imgSrc} height="50px" />
        <div className="text-container">
          <h1 className="notification-text">{text}</h1>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
