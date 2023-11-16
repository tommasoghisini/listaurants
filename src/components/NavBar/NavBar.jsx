import React from "react";
import NavItem from "../NavItem/NavItem";
import "./NavBar.css";

const activeColor = "#9746FF";
const defaultColor = "#B3B3B3";

const BottomNavBar = () => (
	<div className="bottom-nav-bar">
		<NavItem
			iconSrc="/icons/home.svg"
			icon_clicked="/icons/home_clicked.svg"
			text="Home"
			activeColor={activeColor}
			defaultColor={defaultColor}
			to="/home"
		/>
		<NavItem
			iconSrc="/icons/add.svg"
			icon_clicked="/icons/add_clicked.svg"
			text="Add Restaurant"
			activeColor={activeColor}
			defaultColor={defaultColor}
			to="/add"
		/>
		<NavItem
			iconSrc="/icons/profile.svg"
			icon_clicked="/icons/profile_clicked.svg"
			text="Profile"
			activeColor={activeColor}
			defaultColor={defaultColor}
			to="/profile"
		/>
	</div>
);

export default BottomNavBar;
