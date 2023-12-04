import React, { useState } from "react";
import Parse from 'parse/dist/parse.min.js';
import Button from "../../../components/shared/Button/Button";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../../components/ForgotPassword/ForgotPassword";
import Signup from "../../../components/SignupForm/SignupForm";
import "./LoginPage.css";
import LoginForm from "../../../components/LoginForm/LoginForm";

function LoginPage({ setIsAuthenticated }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [currentUser, setCurrentUser] = useState(null);
	const navigate = useNavigate();

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const getCurrentUser = async function () {
		const currentUser = await Parse.User.current();
		setCurrentUser(currentUser);
		return currentUser;
	};

	const doUserLogIn = async function () {
		// Note that these values come from state variables that we've declared before
		const usernameValue = email;
		const passwordValue = password;
		try {
			const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
			// logIn returns the corresponding ParseUser object
			console.log(
				`Success! User ${loggedInUser.get(
					'username'
				)} has successfully signed in!`
			);
			// To verify that this is in fact the current user, `current` can be used
			const currentUser = await Parse.User.current();
			console.log(loggedInUser === currentUser);
			// Clear input fields
			setEmail('');
			setPassword('');
			// Update state variable holding current user
			getCurrentUser();
			// Set authentication state to true and redirect to home page
			setIsAuthenticated(true);
			navigate("/home"); // Navigate to the main page
			return true;
		} catch (error) {
			// Error can be caused by wrong parameters or lack of Internet connection
			console.log(`Error! ${error.message}`);
			return false;
		}
	};

	return (
		<div>
			<h1 className="title">Your Restaurant Finder</h1>
			<LoginForm
				email={email}
				password={password}
				handleEmailChange={handleEmailChange}
				handlePasswordChange={handlePasswordChange}
			/>
			<ForgotPassword />
			<Button
				text="Login"
				onClick={doUserLogIn}
			/>
			<Signup />
		</div>
	);
}

export default LoginPage;