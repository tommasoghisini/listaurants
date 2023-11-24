import React from "react";
import { useNavigate } from "react-router-dom";
import "./GoBackButton.css";

const GoBackButton = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="back-button-container">
      <button onClick={GoBack} className="back-button">
        <img src="/icons/back.svg" alt="Back" />
      </button>
    </div>
  );
};

export default GoBackButton;
