import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import FriendCards from "../../components/FriendCard/FriendCards";
import "./FriendsPage.css";
import TopBar from "../../components/shared/TopBar/TopBar";

function FriendsPage() {
	const [allUsers, setAllUsers] = useState([]);
	const [currentUserName, setCurrentUserName] = useState("");

	const [searchValue, setSearchValue] = useState("");
	const [allFriends, setAllFriends] = useState([]);

	useEffect(() => {
		async function fetchAll() {
			const currentUser = Parse.User.current();
			if (currentUser) {
				const currentUserName = currentUser.getUsername();
				setCurrentUserName(currentUserName);

				try {
					const userQuery = new Parse.Query("_User");
					userQuery.notEqualTo("objectId", currentUser.id);
					const allUserRows = await userQuery.find();

					const allUsers = allUserRows.map((user) => {
						return {
							username: user.get("username"),
							id: user.id,
							profilepicture: user.get("profilePicture")
								? user.get("profilePicture").url()
								: "/images/pp.jpeg",
						};
					});

					setAllUsers(allUsers);

					const friendshipQuery1 = new Parse.Query("Friendship");
					friendshipQuery1.equalTo("user1", currentUserName);
					friendshipQuery1.equalTo("status", "Friends");
					const result1 = await friendshipQuery1.find();
					const friends1 = result1.map(
						(friendship) => friendship.get("user2").id
					);

					const friendshipQuery2 = new Parse.Query("Friendship");
					friendshipQuery2.equalTo("user2", currentUserName);
					friendshipQuery2.equalTo("status", "Friends");
					const result2 = await friendshipQuery2.find();

					const friends2 = result2.map(
						(friendship) => friendship.get("user1").id
					);

					const friends1Subset = allUsers.filter((user) =>
						friends1.includes(user.username)
					);
					const friends2Subset = allUsers.filter((user) =>
						friends2.includes(user.username)
					);

					const allFriends = friends1Subset.concat(friends2Subset);
					console.log("All friends", allFriends);
					setAllFriends(allFriends);

				} catch (error) {
					console.error("Error fetching friend data:", error);
				}
			}
		}

		fetchAll();
	}, []);

	const filteredUsers = searchValue
		? allUsers.filter((user) =>
				user.username.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: allFriends;

	return (
		<div className="friend-page">
			<TopBar pageName={"Friends"} />
			<div className="friend-search-container">
				<input
					type="text"
					placeholder="🔍 Add a new friend by email"
					className="friend-search-input"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>
			<div className="friend-card-appearance">
				<FriendCards
					filteredUsers={filteredUsers}
					allFriends={allFriends}
					currentUserName={currentUserName}
				/>
			</div>
		</div>
	);
}

export default FriendsPage;
