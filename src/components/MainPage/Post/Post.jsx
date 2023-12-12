import ProfilePicture from "../../shared/ProfilePicture/ProfilePicture";
import LikeCommentSave from "../LikeCommentSave/LikeCommentSave";
import "./Post.css";
import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import Parse from "parse/dist/parse.min.js";
import { formatDistanceToNow } from "date-fns";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
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
	// Store the new comment to fetch the comments again when a new comment is submitted
	const [commentSubmit, setCommentSubmit] = useState(false);
	const [loading, setLoading] = useState(false);

	// Show comments if clicked on comment icon
	const [showComments, setShowComments] = useState(false);
	const handleCommentClicked = () => {
		setShowComments(!showComments);
	};

	// Store the comment
	const [comment, setComment] = useState("");
	const handleCommentSubmit = () => {
		if (comment === "") {
			return;
		}
		const Comment = Parse.Object.extend("Comment");
		const newComment = new Comment();
		newComment.set("userID", Parse.User.current().id);
		newComment.set("postID", id);
		newComment.set("text", comment);
		newComment.save();
		setComment("");
		setCommentSubmit(!commentSubmit);
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleCommentSubmit();
		}
	};

	// Store the comments
	const [comments, setComments] = useState([]);

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
	}, [id, like]);

	// Helper function to fetch user data
	const fetchUserData = async (userId) => {
		try {
			const UserData = Parse.Object.extend("User");
			const query = new Parse.Query(UserData);
			query.equalTo("objectId", userId);
			const result = await query.first();

			if (result) {
				const userName = result.get("name");
				const imgSrcUser = result.get("profilePicture").url();
				return [userName, imgSrcUser];
			} else {
				console.log("No user found");
			}
		} catch (error) {
			console.error(error);
		}

		return ["", ""];
	};

	useEffect(() => {
		console.log("Fetching comments");
		if (!showComments || !id) {
			// If comments are not shown or if there's no post ID, do not fetch data
			return;
		}

		// Fetch comments
		const fetchComments = async () => {
			setLoading(true);
			try {
				const CommentModel = Parse.Object.extend("Comment");
				const query = new Parse.Query(CommentModel);
				query.equalTo("postID", id);
				query.include("userID");
				const results = await query.find();

				const fetchedComments = await Promise.all(
					results.map(async (result) => {
						const user = result.get("userID");
						const [username, userProfilePic] = await fetchUserData(user);
						const commentText = result.get("text");
						const updateDate = formatDistanceToNow(result.updatedAt, {
							addSuffix: true,
						});

						return [
							result.updatedAt,
							<Comment
								key={result.id}
								userProfilePic={userProfilePic}
								username={username}
								commentText={commentText}
								updateDate={updateDate}
							/>,
						];
					})
				);

				setComments(fetchedComments);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
		};

		fetchComments();
	}, [id, commentSubmit, showComments]);

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
					handleCommentClicked={handleCommentClicked}
				/>

				{showComments ? (
					<div className="comments">
						<div className="comment-section">
							<ProfilePicture
								imgSrc={imgSrcCommenter}
								height="35px"
							/>
							<div className="input-container">
								<input
									type="text"
									placeholder="What do you think?"
									className="comment-input"
									value={comment}
									onKeyDown={handleKeyDown}
									onChange={(e) => setComment(e.target.value)}
								/>
								<button
									className="submit-comment"
									onClick={handleCommentSubmit}>
									<img
										alt="send"
										src="/icons/send.svg"
										className="icon-send"></img>
								</button>
							</div>
						</div>
						<div className="comment-items">
							{loading ? (
								<div className="loading-container">
									<LoadingComponent />
								</div>
							) : (
								comments
									// Sort posts by time
									.sort((a, b) => b[0] - a[0])
									.map((comment) => {
										return comment[1];
									})
							)}
						</div>
					</div>
				) : null}
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
