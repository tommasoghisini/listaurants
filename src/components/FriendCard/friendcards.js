import React from "react";
import "./friendcards.css";
import ProfilePicture from "../shared/ProfilePicture/ProfilePicture";

function FriendCard() {
  const titles = ["Bob Dylan", "Cate Blanchett"];
  const texts = ["1 friend", "2 friends"];

  return (
    <div>
      {titles.map((title, index) => (
        <Card key={index} title={title} text={texts[index]} />
      ))}
    </div>
  );
}

function Card({ title, text }) {
  const handleRemove = () => {
    console.log(`Removing friend: ${title}`);
  };

  return (
    <div className="friend-card">
      <div className="friend-content">
        <ProfilePicture imgSrc={"/images/bob.jpeg"} height="50px" />
        <div className="text-container">
          <h1 className="friend-name">{title}</h1>
          <h1 className="friend-text">{text}</h1>
        </div>
        <button className="remove-button" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default FriendCard;
