import React from 'react';
import './InputField.css';


const InputField = ({ label, type, placeholder, name }) => (
  <div className="input-container">
    <label>
      {label}
      <input type={type} placeholder={placeholder} name={name} required />
    </label>
  </div>
);

export default InputField;
