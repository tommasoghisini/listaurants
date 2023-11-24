import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import Input from "../../../components/shared/Input/Input";
import Button from "../../../components/shared/Button/Button";
import TopbarSignup from "../../../components/TopbarSignup/TopbarSignup";

const SignupPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add logic to handle account creation
		if (email === "" || password === "" || confirmPassword === "") {
			setErrorMessage("Please fill in all fields");
			return;
		}
		if (password !== confirmPassword) {
			setErrorMessage("Passwords do not match");
			return;
		}
		console.log(email, password, confirmPassword);
		navigate("/verification");
	};

	return (
		<div className="signup-page">
			<div>
				<TopbarSignup
					prevProgress={0}
					progressMax={0.2}
				/>
				<h1 className="title">Create your account</h1>
				<div className="input-field">
					<Input
						type="text"
						label="Email"
						name="email"
						required={true}
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Input>
				</div>
				<div className="input-field">
					<Input
						type="password"
						label="Password"
						name="pasword"
						required={true}
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Input>
				</div>
				<div className="input-field">
					<Input
						type="password"
						label="Confirm Password"
						name="confirm password"
						required={true}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}></Input>
				</div>
				{errorMessage && <div className="error-message">{errorMessage}</div>}
			</div>
			<Button
				text="Continue"
				onClick={handleSubmit}
			/>
		</div>
	);
};

export default SignupPage;
