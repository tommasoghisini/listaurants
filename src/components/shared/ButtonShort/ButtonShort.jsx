import React from "react";
import "./ButtonShort.css";

const ButtonSh = ({ text, onClick }) => {
  return (
    <button className="button-short" onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonSh;
