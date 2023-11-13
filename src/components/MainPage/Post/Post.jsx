import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";
import LikeCommentSave from "../LikeCommentSave/LikeCommentSave";
import "./Post.css";

function Post({
	imgSrcUser,
	imgSrcRestaurant,
	imgSrcCommenter,
	userName,
	listName,
	categories,
	postText,
	restaurantName,
	restaurantAddress,
}) {
	return (
		<div class="post">
			<div class="post-header">
				<ProfilePicture
					imgSrc={imgSrcUser}
					height="40px"
				/>
				<div class="post-header-discription">
					<div class="post-title">
						{userName} added <strong>{restaurantName}</strong> to their{" "}
						<strong>{listName}</strong>
					</div>
					<Categories categories={categories}></Categories>
				</div>
			</div>
			<div class="post-content">
				<div class="post-text">{postText}</div>
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
				<LikeCommentSave />
				<div class="comment-section">
					<ProfilePicture
						imgSrc={imgSrcCommenter}
						height="30px"
					/>
					<input
						type="text"
						placeholder="What do you think?"
						class="comment-input"
					/>
				</div>
			</div>
		</div>
	);
}

function Categories({ categories }) {
	return (
		<div class="categories">
			{categories.map((category) => {
				return <div class="category">{category}</div>;
			})}
		</div>
	);
}

export default Post;
