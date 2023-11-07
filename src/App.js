import "./App.css";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
	return (
		<Routes>
			<Route
				path="/login"
				element={<LoginPage />}
			/>
			<Route
				path="/"
				element={<MainPage />}
			/>
			<Route
				path="/profile"
				element={<ProfilePage />}
			/>
		</Routes>
	);
}

export default App;
