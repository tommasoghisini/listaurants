import Post from "../../components/MainPage/Post/Post";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./MainPage.css";
import postData from "../../data/user1.json";
import { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";

function MainPage() {
	console.log(postData);

	const userName = postData["userName"];
	const categories = [
		postData["category_1"],
		postData["category_2"],
		postData["category_3"],
	];
	const imgSrcUser = postData["imgSrcUser"];
	const imgSrcCommenter = postData["imgSrcCommenter"];
	const imgSrcRestaurant = postData["imgSrcRestaurant"];

	const [posts, setPosts] = useState([]);

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
				let imgSrcRestaurant = postData["imgSrcRestaurant"];
				try {
					imgSrcRestaurant = userPost.get("image").url();
				} catch (error) {
					console.log("No image found");
				}

				const listName = userPost.get("savedToList");
				const postText = userPost.get("text");
				const restaurantName = userPost.get("restaurantName");
				const restaurantAddress = userPost.get("restaurantAddress");

				return (
					<Post
						imgSrcUser={imgSrcUser}
						imgSrcRestaurant={imgSrcRestaurant}
						imgSrcCommenter={imgSrcCommenter}
						userName={userName}
						listName={listName}
						categories={categories}
						postText={postText}
						restaurantName={restaurantName}
						restaurantAddress={restaurantAddress}
					/>
				);
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
					{posts.map((post) => {
						console.log(1);
						return post;
					})}
				</div>
			</div>
		</>
	);
}

export default MainPage;
