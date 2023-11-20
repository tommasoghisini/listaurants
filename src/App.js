import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginProcess/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/LoginProcess/SignupPage/SignupPage";
import VerificationPage from "./pages/LoginProcess/VerificationPage/VerificationPage";
import SignupNamePage from "./pages/LoginProcess/SignupNamePage/SignupNamePage";

import MainPage from "./pages/MainPage/MainPage";
import BottomNavBar from "./components/NavBar/NavBar";
import { Fragment } from "react";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import AddProfilePicture from "./pages/LoginProcess/AddProfilePicture/AddProfilePicture";
import AddedProfilePicture from "./pages/LoginProcess/AddedProfilePicture/AddedProfilePicture";

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
				<Route
					path="/home"
					element={<MainPage />}
				/>
				<Route
					path="/"
					element={<LoginPage />}
				/>
				<Route
					path="/notification"
					element={<NotificationPage />}
				/>
				<Route
					path="/profile"
					element={<ProfilePage />}
				/>
				<Route
					path="/signup"
					element={<SignupPage />}></Route>
				<Route
					path="/verification"
					element={<VerificationPage />}
				/>
				<Route
					path="/signup-name"
					element={<SignupNamePage />}></Route>
				<Route
					path="/add-picture/:username"
					element={<AddProfilePicture />}
				/>
				<Route
					path="/added-picture/:username"
					element={<AddedProfilePicture />}></Route>
			</Routes>
			{!noNavBarPaths.includes(basePath) && <BottomNavBar />}
		</Fragment>
	);
}

export default App;
