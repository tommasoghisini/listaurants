import "./LikeCommentSave.css";
function LikeCommentSave() {
	return (
		<div className="button-container">
			<div className="like-button">
				<div className="like-text">Like</div>
				<img
					src="/icons/like.svg"
					alt="like"
					className="like-image"
				/>
			</div>
			<div className="like-button">
				<div className="like-text">Comment</div>
				<img
					src="/icons/comment.svg"
					alt="like"
					className="comment-image"
				/>
			</div>
			<div className="like-button">
				<div className="like-text">Save</div>
				<img
					src="/icons/save.svg"
					alt="like"
					className="like-image"
				/>
			</div>
		</div>
	);
}

export default LikeCommentSave;
