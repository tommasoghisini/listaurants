import React from "react";
import "./listcards.css";

import testImage1 from "../../assets/images/noma.jpeg"
import testImage2 from "../../assets/images/durum.jpeg";

const personalLists = [
	["Durum Bar", "Doma", "Friheden", "Reffen", "Hart", "Bird"],
	["Llama", "Apollo Bar", "Safari", "Osteria 16"],
];

const images = ["/noma.jpeg", "/durum.jpeg"];

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
	return (
		<div className="card">
			<div className="content">
				<div className="image-container">
					<img
						src={imageSource}
						alt="Image"
						className="image-placeholder"
					/>
				</div>
				<div className="text-container">
					<h1 className="title">{title}</h1>
					<h1 className="text">{text}</h1>
				</div>
			</div>
		</div>
	);
}

export default ListCards;
