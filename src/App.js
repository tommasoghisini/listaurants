import React, { Fragment } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';

import "./App.css";
import LoginPage from "./pages/LoginProcess/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/LoginProcess/SignupPage/SignupPage";
import VerificationPage from "./pages/LoginProcess/VerificationPage/VerificationPage";
import SignupNamePage from "./pages/LoginProcess/SignupNamePage/SignupNamePage";

import MainPage from "./pages/MainPage/MainPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import AddProfilePicture from "./pages/LoginProcess/AddProfilePicture/AddProfilePicture";
import AddedProfilePicture from "./pages/LoginProcess/AddedProfilePicture/AddedProfilePicture";
import BottomNavBar from "./components/NavBar/NavBar";

const PARSE_APPLICATION_ID = 'LQnwm0hvEVNo9UTc5XH0xryIdfqgKCDelr6ETCSJ';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'ci5dv6jVNkOpT6A2O57lA9fTZK0c8HMWCEtV2eLM';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;


function App() {
	const location = useLocation();
	const noNavBarPaths = [
		"",
		"add-picture",
		"added-picture",
		"signup",
		"verification",
		"signup-name",
	];

	const basePath = location.pathname.split("/")[1];

	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/home" element={<MainPage />} />
				<Route path="/notification" element={<NotificationPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/verification" element={<VerificationPage />} />
				<Route path="/signup-name" element={<SignupNamePage />}></Route>
				<Route path="/add-picture/:username" element={<AddProfilePicture />} />
				<Route path="/added-picture/:username" element={<AddedProfilePicture />}></Route>
			</Routes>
			{!noNavBarPaths.includes(basePath) && <BottomNavBar />}
		</Fragment>
	);
}

export default App;
