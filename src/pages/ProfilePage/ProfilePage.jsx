import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListCards from "../../components/ListCard/listcards";
import ProfilePicture2 from "../../components/ProfilePicture2/ProfilePicture2";
import ButtonSh from "../../components/shared/ButtonShort/ButtonShort";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./ProfilePage.css";
import BackButton from "../../components/shared/GoBackButton/GoBackButton";
import Parse from "parse/dist/parse.min";

function ProfilePage() {
	const navigate = useNavigate();
	const [editProfilePressed, setEditProfilePressed] = useState(false);
	const [friendsPressed, setFriendsPressed] = useState(false);
	const [userName, setUserName] = useState(""); // State to store the user's name
	const [friendsNumber, setFriendsNumber] = useState(0); // State to store the number of friends

	useEffect(() => {
		const currentUser = Parse.User.current();
		if (currentUser) {
			setUserName(currentUser.get("name") || "Alice"); // dunno if necessary

			const friendshipQuery1 = new Parse.Query("Friendship");
			friendshipQuery1.equalTo("user1", currentUser.getUsername());
			friendshipQuery1.equalTo("status", "Friends");
			friendshipQuery1.count().then((count) => {
				setFriendsNumber(count);
			});
		}
	}, []);

	const handleEditProfileClick = () => {
		navigate("/editprofilepage");
		setEditProfilePressed(true);
	};

	const handleFriendsClick = () => {
		navigate("/friendspage");
		setFriendsPressed(true);
	};

	return (
		<div className="container-sana">
			<TopBar pageName="Profile" />
			{/*<BackButton />*/}
			<div className="profile-section">
				<div className="profile-picture">
					<ProfilePicture2 showEditButton={false} />
				</div>
				<p className="profile-name">{userName}</p>{" "}
				{/* dsplay the user name from our app db */}
			</div>
			<div className="buttons-container">
				<ButtonSh
					text="Edit Profile"
					onClick={handleEditProfileClick}
					className={editProfilePressed ? "button pressed" : "button"}
				/>
				<ButtonSh
					text={friendsNumber + " Friends"}
					onClick={handleFriendsClick}
					className={friendsPressed ? "button pressed" : "button"}
				/>
			</div>
			<div className="cards-container">
				<ListCards className="cards" />
			</div>
		</div>
	);
}

export default ProfilePage;
