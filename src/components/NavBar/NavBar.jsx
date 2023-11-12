import React from 'react';
import NavItem from '../NavItem/NavItem';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/profile.svg';
import './NavBar.css';

const BottomNavBar = () => (
    <div className="bottom-nav-bar">
        <NavItem icon={<HomeIcon />} activeColor="#9746FF" defaultColor="grey" to="/home" />
        <NavItem icon={<AddIcon />} activeColor="#9746FF" defaultColor="grey" to="/add" />
        <NavItem icon={<ProfileIcon />} activeColor="#9746FF" defaultColor="grey" to="/profile" />
    </div>
);

export default BottomNavBar;
