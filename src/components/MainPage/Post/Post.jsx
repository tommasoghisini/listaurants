import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";
import LikeCommentSave from "../LikeCommentSave/LikeCommentSave";
import "./Post.css";
import { useState, useEffect } from "react";

function Post({
	id,
	imgSrcUser,
	imgSrcRestaurant,
	imgSrcCommenter,
	userName,
	listName,
	categories,
	postText,
	restaurantName,
	restaurantAddress,
	handleSaveClicked,
	saveClicked,
}) {
	// Initialize like state from localStorage
	let initialLike = localStorage.getItem(`likeStatus-${id}`);
	if (initialLike === null) {
		localStorage.setItem(`likeStatus-${id}`, "false");
		initialLike = false;
	} else {
		initialLike = initialLike === "true";
	}
	const [like, setLike] = useState(initialLike);
	// Update localStorage whenever the like state changes
	useEffect(() => {
		localStorage.setItem(`likeStatus-${id}`, like);
	}, [like]);

	return (
		<div className="post">
			<div className="post-header">
				<ProfilePicture
					imgSrc={imgSrcUser}
					height="40px"
				/>
				<div className="post-header-discription">
					<div className="post-title">
						{userName} added <strong>{restaurantName}</strong> to their{" "}
						<strong>{listName}</strong>
					</div>
					<Categories categories={categories}></Categories>
				</div>
			</div>
			<div className="post-content">
				<div className="post-text">{postText}</div>
				<div className="post-image-container">
					<img
						src={imgSrcRestaurant}
						alt="Restaurant"
						className="post-image"
					/>
					<div className="image-overlay">
						<div className="image-overlay-text">
							<p className="restaurant-name">{restaurantName}</p>
							<p className="restaurant-address">{restaurantAddress}</p>
						</div>
					</div>
				</div>
				<LikeCommentSave
					like={like}
					setLike={setLike}
					saveClicked={saveClicked}
					handleSaveClicked={handleSaveClicked}
				/>
				<div className="comment-section">
					<ProfilePicture
						imgSrc={imgSrcCommenter}
						height="35px"
					/>
					<input
						type="text"
						placeholder="What do you think?"
						className="comment-input"
					/>
				</div>
			</div>
			<div className="divider"></div>
		</div>
	);
}

function Categories({ categories }) {
	return (
		<div className="categories">
			{categories.map((category, index) => {
				return (
					<div
						key={index}
						className="category">
						{category}
					</div>
				);
			})}
		</div>
	);
}

export { Categories, Post };
