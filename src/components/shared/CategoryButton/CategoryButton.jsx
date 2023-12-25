import React from 'react';
import './CategoryButton.css';

const CategoryButton = ({ text, onClick, color }) => {
  return (
    <button className="restaurant-category" style={{ '--category-button-color': color }} onClick={onClick}>
      {text}
    </button>
  );
};

export default CategoryButton;
