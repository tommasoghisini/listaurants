import React from "react";
import "./friendcards.css";

function FriendCard() {
	const titles = ["Bob Dylan", "Cate Blanchett"];
	const texts = ["1 friend", "2 friends"];

	return (
		<div>
			{titles.map((title, index) => (
				<Card
					key={index}
					title={title}
					text={texts[index]}
				/>
			))}
		</div>
	);
}

function Card({ title, text }) {
	const handleRemove = () => {
		// Implement the logic for removing the friend
		console.log(`Removing friend: ${title}`);
	};

	return (
		<div className="friend-card">
			<div className="friend-content">
				<div className="image-container">
					<div className="profile-image-border">
						<div className="profile-image-wrapper">
							<img
								src={"/images/bob.jpeg"}
								alt="Profile"
								className="profile-image"
							/>
						</div>
					</div>
				</div>
				<div className="text-container">
					<h1 className="friend-name">{title}</h1>
					<h1 className="friend-text">{text}</h1>
				</div>
				<button
					className="remove-button"
					onClick={handleRemove}>
					Remove
				</button>
			</div>
		</div>
	);
}

export default FriendCard;
