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
				<LikeCommentSave />
				<div className="comment-section">
					<ProfilePicture
						imgSrc={imgSrcCommenter}
						height="30px"
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
			{categories.map((category) => {
				return <div className="category">{category}</div>;
			})}
		</div>
	);
}

export default Post;
