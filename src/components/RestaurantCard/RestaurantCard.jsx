import "./RestaurantCard.css";
import { Categories } from "../../components/MainPage/Post/Post";

function RestaurantCard({
	imgSrcRestaurant,
	restaurantName,
	restaurantAddress,
	categories,
	comment,
}) {
	return (
		<div className="restaurant-card">
			<div className="list-image-container">
				<img
					src={imgSrcRestaurant}
					alt="Restaurant"
					className="list-image"
				/>
				<div className="image-overlay">
					<div className="image-overlay-text">
						<p className="restaurant-name">{restaurantName}</p>
						<p className="restaurant-address">{restaurantAddress}</p>
					</div>
				</div>
			</div>
			<div className="restaurant-content">
				<Categories categories={categories}></Categories>
				{comment.length === 0 ? (
					<div></div>
				) : (
					<div className="restaurant-text">{comment}</div>
				)}
			</div>
		</div>
	);
}

export default RestaurantCard;
