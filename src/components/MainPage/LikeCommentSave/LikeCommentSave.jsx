import "./LikeCommentSave.css";
function LikeCommentSave() {
	return (
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
	);
}

export default LikeCommentSave;
