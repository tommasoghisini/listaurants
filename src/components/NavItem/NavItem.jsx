import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../shared/Icon/Icon";
import "./NavItem.css";

const NavItem = ({
	iconSrc,
	icon_clicked,
	activeColor,
	defaultColor,
	to,
	text,
}) => {
	const location = useLocation();

	const isActive = location.pathname === to;

	return (
		<Link
			to={to}
			className="nav-item-link"
			style={{ textDecoration: "none" }}>
			{isActive ? <Icon src={icon_clicked} /> : <Icon src={iconSrc} />}
			<div
				className="nav-item-text"
				style={{ color: isActive ? activeColor : defaultColor }}>
				{text}
			</div>
		</Link>
	);
};

export default NavItem;
