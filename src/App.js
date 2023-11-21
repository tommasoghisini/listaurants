import React, { Fragment } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';

import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MainPage from "./pages/MainPage/MainPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import BottomNavBar from "./components/NavBar/NavBar";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const PARSE_APPLICATION_ID = 'LQnwm0hvEVNo9UTc5XH0xryIdfqgKCDelr6ETCSJ';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'ci5dv6jVNkOpT6A2O57lA9fTZK0c8HMWCEtV2eLM';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


function App() {
	const location = useLocation();

	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/home" element={<MainPage />} />
				<Route path="/notification" element={<NotificationPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
			{location.pathname !== "/" && location.pathname !== "/signup" && <BottomNavBar />}
		</Fragment>
	);
}

export default App;
