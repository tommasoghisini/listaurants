import React, { useState } from "react";
import Parse from 'parse/dist/parse.min.js';
import { useNavigate } from "react-router-dom";

import Button from "../../components/shared/Button/Button";
import LoginForm from "../../components/LoginForm/LoginForm";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import "./SignUpPage.css";

function SignUpPage() {

	// State variables
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const doUserRegistration = async function () {
		// Note that these values come from state variables that we've declared before
		const usernameValue = username;
		const passwordValue = password;
		try {
		  // Since the signUp method returns a Promise, we need to call it using await
		  const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
		  alert(
			`Success! User ${createdUser.getUsername()} was successfully created!`
		  );
		  navigate("/home"); // Navigate to the main page
		  return true;
		} catch (error) {
		  // signUp can fail if any parameter is blank or failed an uniqueness check on the server
		  alert(`Error! ${error}`);
		  return false;
		}
	};

	return (
		<div>
			<h1 className="title">Sign Up</h1>
			<LoginForm
				email={username}
				password={password}
				handleEmailChange={(event) => setUsername(event.target.value)}
				handlePasswordChange={(event) => setPassword(event.target.value)}
			/>
			<ForgotPassword />
			<Button
				text="Sign Up"
				onClick={() => doUserRegistration()}
			/>
		</div>
	);

}

export default SignUpPage;
