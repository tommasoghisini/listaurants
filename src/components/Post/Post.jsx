import "./Post.css";

function Post() {
	return (
		<div class="post">
			<div class="post-header">
				<img
					src="/profilePic2.png"
					alt="logo"
					class="post-logo"
				/>
				<div class="post-header-discription">
					<div class="post-title">Bob added Noma to their favorites</div>
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
				<div className="image-container">
					<img
						src=""
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
				<div class="button-container">
					<div class="like-button">
						<div class="like-text">Like</div>
						<img
							src="/like.svg"
							alt="like"
							class="like-image"
						/>
					</div>
					<div class="like-button">
						<div class="like-text">Comment</div>
						<img
							src="/comment.svg"
							alt="like"
							class="comment-image"
						/>
					</div>
					<div class="like-button">
						<div class="like-text">Save</div>
						<img
							src="/save.svg"
							alt="like"
							class="like-image"
						/>
					</div>
				</div>
				<div class="comment-section">
					<img
						src="/profilePic.png"
						alt="logo"
						class="header-logo"
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
