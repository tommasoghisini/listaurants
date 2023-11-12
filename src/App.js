import "./App.css";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BottomNavBar from "./components/NavBar/NavBar";
import { Fragment } from "react";

function App() {
	
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
			<BottomNavBar />
		</Fragment >
	);
}

export default App;
