import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './NavItem.css';

const NavItem = ({ icon, activeColor, defaultColor, to }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <Icon icon={icon} fill={isActive ? activeColor : defaultColor} />
    </Link>
  );
};

export default NavItem;
