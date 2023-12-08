import React from "react";
import "./listcards.css";
import { useNavigate } from "react-router-dom";

const personalLists = [
	["Check out their Favourites"],
	["Check out their Wishlist"],
]; //To be changed after demo

const images = ["/images/noma.jpeg", "/images/durum.jpeg"];

function ListCards() {
	const titles = ["💖 Favourites", "🌠 Wishlist"];

	return (
		<div>
			{titles.map((title, index) => {
				const truncatedText = personalLists[index].slice(0, 5);

				if (personalLists[index].length > 5) {
					truncatedText[5] = truncatedText.slice(5) + " and more";
				}

				return (
					<Card
						key={index}
						title={title}
						text={truncatedText.join(", ")}
						imageSource={images[index]}
					/>
				);
			})}
		</div>
	);
}

function Card({ title, text, imageSource }) {
	const navigate = useNavigate();

	const handleClick = () => {
		console.log(title);
		navigate(`/list/${title}`);
	};

	return (
		<div
			className="list-card"
			onClick={handleClick}>
			<div className="list-content">
				<div className="image-container">
					<img
						src={imageSource}
						alt="placeholder"
						className="image-placeholder"
					/>
				</div>
				<div className="text-container">
					<h1 className="list-title">{title}</h1>
					<h1 className="list-text">{text}</h1>
				</div>
			</div>
		</div>
	);
}

export default ListCards;
