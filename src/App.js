import "./App.css";

import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={<LoginPage />}
			/>
			<Route
				path="/profile"
				element={<ProfilePage />}
			/>
		</Routes>
	);

}

export default App;
