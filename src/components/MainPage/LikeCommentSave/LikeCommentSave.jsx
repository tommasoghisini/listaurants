import "./LikeCommentSave.css";

function LikeCommentSave({ like, setLike, save, handleSaveClicked }) {
	return (
		<div className="button-container">
			<div
				className="like-button"
				onClick={() => {
					setLike(!like);
				}}>
				<div
					className="like-text"
					style={{ color: like ? "#9746FF" : "initial" }}>
					Like
				</div>
				<img
					src={like ? "/icons/like_clicked.svg" : "/icons/like.svg"}
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
			<div
				className="like-button"
				onClick={handleSaveClicked}>
				<div
					className="like-text"
					style={{ color: save ? "#9746FF" : "initial" }}>
					Save
				</div>
				<img
					src={save ? "/icons/save_clicked.svg" : "/icons/save.svg"}
					alt="like"
					className="like-image"
				/>
			</div>
		</div>
	);
}

export default LikeCommentSave;
