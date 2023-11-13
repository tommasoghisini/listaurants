import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BottomNavBar from "./components/NavBar/NavBar";
import { Fragment } from "react";

function App() {

	const location = useLocation();
	
	return (
		<Fragment>
			<Routes>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/profile"
					element={<ProfilePage />}
				/>
			</Routes>
			{location.pathname !== "/login" && <BottomNavBar />}
		</Fragment >
	);

  
}

export default App;
