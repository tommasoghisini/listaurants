import React from 'react';
import NavItem from '../NavItem/NavItem';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import './NavBar.css';

const activeColor = "#9746FF";
const defaultColor = "#B3B3B3";

const BottomNavBar = () => (
    <div className="bottom-nav-bar">
        <NavItem icon={<HomeIcon />} text="Home" activeColor={activeColor} defaultColor={defaultColor} to="/home" />
        <NavItem icon={<AddIcon />} text="Add Restaurant" activeColor={activeColor} defaultColor={defaultColor} to="/add" />
        <NavItem icon={<ProfileIcon />} text="Profile" activeColor={activeColor} defaultColor={defaultColor} to="/profile" />
    </div>
);

export default BottomNavBar;
