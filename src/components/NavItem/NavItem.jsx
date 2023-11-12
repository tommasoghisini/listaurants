import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './NavItem.css';

const NavItem = ({ icon, activeColor, defaultColor, to, text }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link to={to} className="nav-item-link" style={{ textDecoration: 'none' }}>
      <Icon icon={icon} fill={isActive ? activeColor : defaultColor} />
      <div className="nav-item-text" style={{ color: isActive ? activeColor : defaultColor }}>{text}</div>
    </Link>
  );
};

export default NavItem;