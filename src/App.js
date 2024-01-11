// import with curly brackets is used with named exports (when you export multiple things from a file)
import React, { Fragment, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

// auth context is used to pass the authentication state to all the components
// that need it without having to pass it through props
import AuthContext from "./components/AuthContext/AuthContext";

import "./App.css";

// import all the pages
import LoginPage from "./pages/LoginProcess/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import SignupPage from "./pages/LoginProcess/SignupPage/SignupPage";
import VerificationPage from "./pages/LoginProcess/VerificationPage/VerificationPage";
import SignupNamePage from "./pages/LoginProcess/SignupNamePage/SignupNamePage";
import ListPage from "./pages/ListPage/ListPage";
import MainPage from "./pages/MainPage/MainPage";
import NotificationPage from "./pages/NotificationPage/NotificationPage";

import AddProfilePicture from "./pages/LoginProcess/AddProfilePicture/AddProfilePicture";
import AddedProfilePicture from "./pages/LoginProcess/AddedProfilePicture/AddedProfilePicture";
import BottomNavBar from "./components/NavBar/NavBar";
import AddRestaurantPage1 from "./pages/AddRestaurantPage/AddRestaurantPage1";
import AddRestaurantPage2 from "./pages/AddRestaurantPage/AddRestaurantPage2";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Parse initialization
const PARSE_APPLICATION_ID = "LQnwm0hvEVNo9UTc5XH0xryIdfqgKCDelr6ETCSJ";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "ci5dv6jVNkOpT6A2O57lA9fTZK0c8HMWCEtV2eLM";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// Not sure
Parse.setAsyncStorage(AsyncStorage);

function App() {
	const location = useLocation();

	// array of paths that don't need the navbar
	const noNavBarPaths = [
		"",
		"add-picture",
		"added-picture",
		"signup",
		"verification",
		"signup-name",
	];
	// state to control navbar visibility
	const [isNavbarVisible, setIsNavbarVisible] = useState(true);

	// Listen for changes in the route and reset navbar visibility
	useEffect(() => {
		// Reset navbar visibility when the route changes
		setIsNavbarVisible(true);
	}, [location.pathname]);

	// Get the base path (right side of /)
	const basePath = location.pathname.split("/")[1];

	// state to control authentication
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// array of routes
	const routes = [
		{ path: "/", component: LoginPage, isProtected: false, extraProps: { setIsAuthenticated } },
		{ path: "/signup", component: SignupPage, isProtected: false, extraProps: { setIsAuthenticated } },
		{ path: "/home", component: MainPage, isProtected: true, extraProps: { setIsNavbarVisible } },
		{ path: "/notification", component: NotificationPage, isProtected: true },
		{ path: "/profile", component: ProfilePage, isProtected: true },
		{ path: "/friendspage", component: FriendsPage, isProtected: true },
		{ path: "/list/:listname", component: ListPage, isProtected: true },
		{ path: "/editprofilepage", component: EditProfilePage, isProtected: true },
		{ path: "/add-picture/:username", component: AddProfilePicture, isProtected: true },
		{ path: "/added-picture/:username", component: AddedProfilePicture, isProtected: true },
		{ path: "/verification", component: VerificationPage, isProtected: true },
		{ path: "/signup-name", component: SignupNamePage, isProtected: true },
		{ path: "/add", component: AddRestaurantPage1, isProtected: true },
		{ path: "/add/p2", component: AddRestaurantPage2, isProtected: true },
	];

	return (
		// AuthContext.Provider is used to pass the authentication state to all the components
		<AuthContext.Provider value={isAuthenticated}>
			<Fragment>
				<div className="app-container">
					<div className="content">
						// Routes is wrapper that containes all the routes components
						<Routes>
							// Iterate through the routes array and element prop is used to
							// conditionally render a protected route or a normal route
							{routes.map((route) => (
								<Route
									path={route.path}
									element={
										route.isProtected ? (
											<ProtectedRoute>
												{<route.component {...route.extraProps} />}
											</ProtectedRoute>
										) : (
											<route.component {...route.extraProps} />
										)
									}
								/>
							))}
						</Routes>
					</div>
					// BottomNavBar is rendered only if page is not in the noNavBarPaths array
					{isNavbarVisible && !noNavBarPaths.includes(basePath) && (
						<BottomNavBar />
					)}
				</div>
			</Fragment>
		</AuthContext.Provider>
	);
}

export default App;
