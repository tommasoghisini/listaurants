import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import Button from "../../components/shared/Button/Button";
import "./EditProfilePage.css";
import GoBackButton from "../../components/shared/GoBackButton/GoBackButton";

function EditProfilePage() {
	const navigate = useNavigate();
	const [editMode, setEditMode] = useState(false);
	const [name, setName] = useState("");

	useEffect(() => {
		const currentUser = Parse.User.current();
		if (currentUser) {
			setName(currentUser.get("name") || "Anonymous"); // fallback for at least something
		}
	}, []);

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleSaveEdits = async () => {
		console.log("Saving edits...");
		const currentUser = Parse.User.current();
		if (currentUser) {
			currentUser.set("name", name);
			try {
				await currentUser.save();
				console.log("Name updated successfully");
				navigate("/profile");
			} catch (error) {
				console.error("Error updating name:", error);
			}
		}
	};

	const handleLogOut = async () => {
		try {
			await Parse.User.logOut();
			console.log("Logged out successfully");
			navigate("/"); // Navigate to login page or wherever you want
		} catch (error) {
			console.log("Error while logging out: ", error);
		}
	};

	const handleDeleteAccount = async () => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete your account?"
		);
		if (confirmDelete) {
			const currentUser = Parse.User.current();
			try {
				await currentUser.destroy();
				console.log("Account deleted successfully");
				navigate("/");
			} catch (error) {
				console.log("Error while deleting account: ", error);
			}
		}
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleNameSubmit = () => {
		setEditMode(false);
		handleSaveEdits();
	};

	return (
		<div className="container-sana">
			{/* <GoBackButton /> */}
			<div>
				<ProfilePicture2 showEditButton={true} />
			</div>
			<div className="name-and-buttons-container">
				{editMode ? (
					<div className="profile-name-edit">
						<input
							type="text"
							value={name}
							onChange={handleNameChange}
						/>
						<button onClick={handleNameSubmit}>Submit</button>
					</div>
				) : (
					<div className="profile-name-container">
						<span className="profile-name">{name}</span>
						<img
							src="https://www.svgrepo.com/show/75500/edit-button.svg"
							alt="Edit"
							onClick={() => setEditMode(true)}
							className="edit-icon"
						/>
					</div>
				)}
				<div className="buttons-container-edit-profile">
					<Button
						text="Save Edits"
						onClick={handleSaveEdits}
					/>
					<Button
						text="Log out"
						onClick={handleLogOut}
					/>
					<Button
						text="Delete Account"
						onClick={handleDeleteAccount}
					/>
				</div>
			</div>
		</div>
	);
}

export default EditProfilePage;
