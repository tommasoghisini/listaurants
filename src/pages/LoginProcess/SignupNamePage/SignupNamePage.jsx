import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
import "./SignupNamePage.css";
import Input from "../../../components/shared/Input/Input";
import Button from "../../../components/shared/Button/Button";
import TopbarSignup from "../../../components/TopbarSignup/TopbarSignup";

const SignupNamePage = () => {
	const [name, setName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const user = Parse.User.current();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add logic to handle account creation
		if (name === "") {
			setErrorMessage("Please fill in the field");
			return;
		}
		try {
			// send name to backend
			user.set("name", name);
			user.save()
				.then((response) => {
					console.log('Updated user', response);
				})
		} catch (error) {
			console.error('Error while updating user', error);
		}
		navigate(`/add-picture/${name}`);
	};

	return (
		<div className="signup-page">
			<div>
				<TopbarSignup
					prevProgress={0.4}
					progressMax={0.6}
				/>

				<h1 className="title">What's your preferred username?</h1>
				<div className="input-field">
					<Input
						type="text"
						label=""
						name="email"
						required={true}
						value={name}
						onChange={(e) => setName(e.target.value)}></Input>
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

export default SignupNamePage;
