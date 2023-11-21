import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import MainPage from "./pages/MainPage/MainPage";
import BottomNavBar from "./components/NavBar/NavBar";
import { Fragment } from "react";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import AddRestaurantPage1 from "./pages/AddRestaurantPage1/AddRestaurantPage1";
import AddRestaurantPage2 from "./pages/AddRestaurantPage2/AddRestaurantPage2";
import AddRestaurantPage3 from "./pages/AddRestaurantPage3/AddRestaurantPage3";

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
        <Route path="/add" element={<AddRestaurantPage1 />} />
		<Route path="/add/p2" element={<AddRestaurantPage2/>} />
		<Route path="/add/p2/done" element={<AddRestaurantPage3/>} />
      </Routes>
      {location.pathname !== "/" && <BottomNavBar />}
    </Fragment>
  );
}

export default App;
