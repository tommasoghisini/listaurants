import Post from "../../components/MainPage/Post/Post";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./MainPage.css";
import postData from "../../data/user1.json";
import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import SaveListOverlay from "../../components/MainPage/SaveListOverlay/SaveListOverlay";
import NoPosts from "../../components/NoPosts/NoPosts";

function MainPage({ setIsNavbarVisible }) {
	const userName = postData["userName"];
	const categories = [
		postData["category_1"],
		postData["category_2"],
		postData["category_3"],
	];
	const imgSrcUser = postData["imgSrcUser"];
	const imgSrcCommenter = postData["imgSrcCommenter"];
	const defaultImgSrcRestaurant = "/icons/defaultImage.svg";

	// Store the selected post information
	const [selectedPostInfo, setSelectedPostInfo] = useState(null);
	const [posts, setPosts] = useState([]);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const handleOverlayClose = () => {
		setIsNavbarVisible(true);
		setIsOverlayOpen(false);
	};

	const handleSaveClicked = (postInfo) => {
		setIsNavbarVisible(false);
		setSelectedPostInfo(postInfo);
		setIsOverlayOpen(true);
	};
	const handleSaveToList = async (listName) => {
		// Handle the logic to save the post to the selected list
		if (selectedPostInfo) {
			// Create a new Post object using Parse
			const PostObject = Parse.Object.extend("Post");
			const newPost = new PostObject();
			// Orginial Post Query to get the image
			const originalPostQuery = new Parse.Query(PostObject);
			originalPostQuery.equalTo("objectId", selectedPostInfo.id); // Use the ID of the selected post
			const originalPost = await originalPostQuery.first();

			if (originalPost && originalPost.get("image")) {
				// Set the image from the original post
				newPost.set("image", originalPost.get("image"));
			} else {
				console.error("No image found");
			}

			// Set the attributes of the new Post object
			newPost.set("userId", Parse.User.current().id);
			newPost.set("savedToList", listName);
			newPost.set("text", "");
			newPost.set("restaurantName", selectedPostInfo.restaurantName);
			newPost.set("restaurantAddress", selectedPostInfo.restaurantAddress);

			// Save the new Post object to the Parse database
			try {
				await newPost.save();
				console.log("Post saved successfully to", listName);
			} catch (error) {
				console.error("Error saving post:", error);
			}
		}
		setIsOverlayOpen(false);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const currentUser = Parse.User.current();

			// Check if currentUser is not null
			if (!currentUser) {
				console.log("No user logged in");
				return;
			}

			const PostData = Parse.Object.extend("Post");
			const query = new Parse.Query(PostData);
			const results = await query.find();

			// Filter results first
			const userPosts = results.filter(
				(result) => result.get("userId") === currentUser.id
			);

			const posts = userPosts.map((userPost) => {
				let imgSrcRestaurant = defaultImgSrcRestaurant;
				try {
					imgSrcRestaurant = userPost.get("image").url();
				} catch (error) {
					console.log("No image found");
				}

				const listName = userPost.get("savedToList");
				const postText = userPost.get("text");
				const restaurantName = userPost.get("restaurantName");
				const restaurantAddress = userPost.get("restaurantAddress");
				const time = userPost.get("updatedAt");
				const id = userPost.id;
				return [
					time,

					<Post
						id={id}
						imgSrcUser={imgSrcUser}
						imgSrcRestaurant={imgSrcRestaurant}
						imgSrcCommenter={imgSrcCommenter}
						userName={userName}
						listName={listName}
						categories={categories}
						postText={postText}
						restaurantName={restaurantName}
						restaurantAddress={restaurantAddress}
						handleSaveClicked={() => {
							handleSaveClicked({
								id: id,
								imgSrcRestaurant: imgSrcRestaurant,
								restaurantName: restaurantName,
								restaurantAddress: restaurantAddress,
							});
						}}
						saveClicked={isOverlayOpen}
					/>,
				];
			});
			setPosts(posts);
		};
		fetchPosts();
	}, []);

	return (
		<>
		  <div className="main-page">
			<TopBar pageName={"Home"} />
			<div className="main-page-posts">
			  {posts.length === 0 ? (
				<NoPosts/>
			  ) : (
				posts
				  // Sort posts by time
				  .sort((a, b) => b[0] - a[0])
				  .map((post) => {
					return post[1];
				  })
			  )}
			</div>
		  </div>
		  <SaveListOverlay
			isOpen={isOverlayOpen}
			onClose={handleOverlayClose}
			onSave={handleSaveToList}
		  />
		</>
	  );
}

export default MainPage;
