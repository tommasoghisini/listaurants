import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";
import LikeCommentSave from "../LikeCommentSave/LikeCommentSave";
import "./Post.css";

function Post() {
	return (
		<div class="post">
			<div class="post-header">
				<ProfilePicture
					imgSrc="/profilePic2.png"
					height="40px"
				/>
				<div class="post-header-discription">
					<div class="post-title">
						Bob added <strong>Noma</strong> to their <strong>Favorites</strong>
					</div>
					<div class="categories">
						<div class="category">Asian</div>
						<div class="category">$$$</div>
						<div class="category">Vegan</div>
					</div>
				</div>
			</div>
			<div class="post-content">
				<div class="post-text">
					I think this was a cool place. There is a variety of vegan options!
				</div>
				<div className="post-image-container">
					<img
						src="/restaurant1.jpeg"
						alt="Restaurant"
						className="post-image"
					/>
					<div className="image-overlay">
						<div className="image-overlay-text">
							<p className="restaurant-name">Noma</p>
							<p className="restaurant-address">
								Refshalevej 96, 1432 København K
							</p>
						</div>
					</div>
				</div>
				<LikeCommentSave />
				<div class="comment-section">
					<ProfilePicture
						imgSrc="/profilePic.png"
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

export default Post;
