import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import MainPage from "./pages/MainPage/MainPage";
import BottomNavBar from "./components/NavBar/NavBar";
import { Fragment } from "react";
import NotificationPage from "./pages/NotificationPage/NotificationPage";

function App() {
	const location = useLocation();

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
			</Routes>
			{location.pathname !== "/" && <BottomNavBar />}
		</Fragment>
	);
}

export default App;
