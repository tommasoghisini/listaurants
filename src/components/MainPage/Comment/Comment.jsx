import React from "react";
import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";
import "./Comment.css"; // Assume you have a CSS file for styling

function Comment({ username, userProfilePic, commentText, updateDate }) {
	return (
		<div className="comment-container">
			<ProfilePicture
				imgSrc={userProfilePic}
				height="35px"
			/>
			<div className="comment-content">
				<div className="comment-header">
					<span className="username">{username}</span>
					<span className="update-date">{updateDate}</span>
				</div>
				<div className="comment-text">{commentText}</div>
			</div>
		</div>
	);
}

export default Comment;
