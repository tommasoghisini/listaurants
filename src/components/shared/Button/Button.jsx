import React from "react";
import "./Button.css";

// const Button = ({ text, onClick }) => {
//     return (
//         <button className="button" onClick={onClick}>
//             {text}
//         </button>
//     );
// };
// Since there is no style property marked in the button, it's hard coded for button.css
const Button = ({ text, onClick, style, className = "" }) => {
  return (
    <button className={`button ${className}`} style={style} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
