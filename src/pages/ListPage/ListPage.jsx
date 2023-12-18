import { useNavigate, useParams } from "react-router-dom";
import "./ListPage.css";
import Parse from "parse/dist/parse.min.js";
import postData from "../../data/user1.json";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import { useState, useEffect } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { Link } from 'react-router-dom';

function ListPage() {
	const navigate = useNavigate();
	const { listname } = useParams();
	const decodedListName =
		listname === "💖 Favourites" ? "Favourites" : "Wishlist";
	const defaultImgSrcRestaurant = "/icons/defaultImage.svg";
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);

	const goBack = () => {
		navigate(-1); // Use the history object to go back to the previous page
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

			// Filter results first
			const userPosts = results.filter(
				(result) =>
					result.get("userId") === currentUser.id &&
					result.get("savedToList") === decodedListName
			);

			const postPromises = userPosts.map(async (userPost) => {
				const restaurantId = userPost.get("restaurantId");
				let [category_1, category_2, category_3, tempRestaurantImage] =
					await fetchRestaurantData(restaurantId);

				const categories = [category_1, category_2, category_3];
				const postText = userPost.get("text");
				const restaurantName = userPost.get("restaurantName");
				const restaurantAddress = userPost.get("restaurantAddress");
				const time = userPost.get("updatedAt");
				const id = userPost.id;
				const imgSrcRestaurant = userPost.get("image")
				? userPost.get("image").url()
				: tempRestaurantImage;

				return [
					time,

					<RestaurantCard
						key={id}
						imgSrcRestaurant={imgSrcRestaurant}
						restaurantName={restaurantName}
						restaurantAddress={restaurantAddress}
						categories={categories}
						comment={postText}
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
		<div className="list-page">
			<div className="list-top-bar">
				<img
					src="/icons/back.svg"
					alt="back"
					className="close-icon"
					onClick={goBack}
				/>
				<div className="list-top-bar-name">{listname}</div>
			</div>
			<div className="list-items">
				{loading ? (
					<LoadingComponent />
				) : (
					posts
						// Sort posts by time
						.sort((a, b) => b[0] - a[0])
						.map((post) => {
							return post[1];
						})
						//Add Edit link on click here for every card like:
						//const id=""
        				//const edit = post.id;
						//console.log(edit, "edit");
						//<Link to={`/add?restIdParameter=${id}&edit=${edit}`}>
						// </Link>
				)}
			</div>
		</div>
	);
}

export default ListPage;
