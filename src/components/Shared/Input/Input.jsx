import React from 'react';
import './Input.css';

function Input({ type, label, name, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className='name'>{label}</label>
      <input className="input" type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  );
}

export default Input;

