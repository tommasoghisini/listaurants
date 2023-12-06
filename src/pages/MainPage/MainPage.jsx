import Post from "../../components/MainPage/Post/Post";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./MainPage.css";
import postData from "../../data/user1.json";
import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import SaveListOverlay from "../../components/MainPage/SaveListOverlay/SaveListOverlay";
import NoPosts from "../../components/NoPosts/NoPosts";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function MainPage({ setIsNavbarVisible }) {
	const imgSrcCommenter = postData["imgSrcCommenter"];
	const defaultImgSrcRestaurant = "/icons/defaultImage.svg";

	// Store the selected post information
	const [selectedPostInfo, setSelectedPostInfo] = useState(null);
	const [posts, setPosts] = useState([]);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);
	const [loading, setLoading] = useState(true);

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
	};

	const fetchRestaurantData = async (restaurantId) => {
		try {
			const RestaurantData = Parse.Object.extend("Restaurant");
			const query = new Parse.Query(RestaurantData);
			query.equalTo("objectId", restaurantId);
			const result = await query.first();

			if (result) {
				const category_1 = result.get("price");
				const category_2 = result.get("cousine");
				const category_3 = result.get("diet");

				const image = result.get("image").url();

				return [category_1, category_2, category_3, image];
			} else {
				console.log("No restaurant found");
				return [
					postData["category_1"],
					postData["category_2"],
					postData["category_3"],
					defaultImgSrcRestaurant,
				];
			}
		} catch (error) {
			console.error(error);
		}
	};

	const fetchFriends = async (userId) => {
		try {
			const FriendshipData = Parse.Object.extend("Friendship");
			const query = new Parse.Query(FriendshipData);

			// Create a pointer to the User object
			const User = Parse.Object.extend("User");
			const userPointer = new User();
			userPointer.id = userId;

			// Query friendships where user1 is the current user
			query.equalTo("user1", userPointer);
			query.equalTo("status", "Friends");

			// Execute the query
			const results = await query.find();

			// Map results to get user2's id
			const friends = results.map((friendship) => {
				const user2 = friendship.get("user2");
				return user2 ? user2.id : null;
			});

			return friends;
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setLoading(true);
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

			// // Get friends
			// const friends = await fetchFriends(currentUser.getUsername());

			// console.log("Friends:", friends);
			// Filter results first
			const userPosts = results.filter(
				(result) => result.get("userId") === currentUser.id
			);

			const postPromises = userPosts.map(async (userPost) => {
				const restaurantId = userPost.get("restaurantId");
				let [category_1, category_2, category_3, imgSrcRestaurant] =
					await fetchRestaurantData(restaurantId);

				const categories = [category_1, category_2, category_3];

				const listName = userPost.get("savedToList");
				const postText = userPost.get("text");
				const restaurantName = userPost.get("restaurantName");
				const restaurantAddress = userPost.get("restaurantAddress");
				const time = userPost.get("updatedAt");
				const id = userPost.id;
				const [userName, imgSrcUser] = await fetchUserData(
					userPost.get("userId")
				);

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
			const posts = await Promise.all(postPromises);
			setPosts(posts);
			setLoading(false);
		};
		fetchPosts();
	}, []);

	return (
		<>
			<div className="main-page">
				<TopBar pageName={"Home"} />
				{loading ? (
					<LoadingComponent />
				) : (
					<div className="main-page-posts">
						{posts.length === 0 ? (
							<NoPosts />
						) : (
							posts
								// Sort posts by time
								.sort((a, b) => b[0] - a[0])
								.map((post) => {
									return post[1];
								})
						)}
					</div>
				)}
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
