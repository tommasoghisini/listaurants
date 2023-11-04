import React from 'react';
import './Input.css';

function Input({ type, name, placeholder }) {
  return (
    <div>
        <p className='name'>{name}</p>
        <input className="input" type={type} placeholder={placeholder} />
    </div>
  );
}

export default Input;
