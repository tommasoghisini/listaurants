import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import Button from "../../../components/shared/Button/Button";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../../components/ForgotPassword/ForgotPassword";
import Signup from "../../../components/SignupForm/SignupForm";
import "./LoginPage.css";
import LoginForm from "../../../components/LoginForm/LoginForm";

function LoginPage({ setIsAuthenticated }) {
	// state variables for email and password input fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// state variable to control current user
	const [currentUser, setCurrentUser] = useState(null);

	// Get the navigate function from the router
	const navigate = useNavigate();

	// state variable to hold error message
	const [errorMessage, setErrorMessage] = useState("");

	// event handler for changes in the imput field for email
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	// event.target is the input field
	// event.target.value is the value of the input field
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	// function to get the current user
	const getCurrentUser = async function () { // async keyword means that this function returns a promise
		const currentUser = await Parse.User.current(); // await keyword means that this function waits for the promise to be resolved
		setCurrentUser(currentUser);
		return currentUser;
	};

	// function to log in a user
	const doUserLogIn = async function () {
		// check if email and password are empty and if so, display error message and return
		if (email === "" || password === "") {
			setErrorMessage("Please fill in all fields");
			return;
		}

		// Note that these values come from state variables that we've declared before
		const usernameValue = email;
		const passwordValue = password;
		try {
			// waits for the Parse.User.logIn method to finish and login the user
			const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
			// logIn returns the corresponding ParseUser object
			console.log(
				`Success! User ${loggedInUser.get(
					"username"
				)} has successfully signed in!`
			);
			// To verify that this is in fact the current user, `current` can be used
			const currentUser = await Parse.User.current();
			console.log(loggedInUser === currentUser);

			// Clear input fields
			setEmail("");
			setPassword("");

			// Update state variable holding current user
			getCurrentUser();

			// Set authentication state to true and redirect to home page
			setIsAuthenticated(true);
			navigate("/home"); // Navigate to the main page
			return true;
		} catch (error) {
			// Error can be caused by wrong parameters or lack of Internet connection
			setErrorMessage(error.message);
			return false;
		}
	};

	return (
		<div>
			<h1 className="title">Listaurants</h1>
			<LoginForm
				email={email}
				password={password}
				handleEmailChange={handleEmailChange}
				handlePasswordChange={handlePasswordChange}
			/>
			{/* if there is an error message, display it */}
			{errorMessage && (
				<div
					className="error-message"
					style={{ marginBottom: "20px" }}>
					{errorMessage}
				</div>
			)}
			<Button
				text="Login"
				onClick={doUserLogIn}
			/>
			<Signup />
		</div>
	);
}

export default LoginPage;
