import Post from "../../components/MainPage/Post/Post";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./MainPage.css";
import postData from "../../data/user1.json";

function MainPage() {
	console.log(postData);
	let restaurantName = postData["restaurantName"];
	let restaurantAddress = postData["restaurantAddress"];
	let userName = postData["userName"];
	let listName = postData["listName"];
	let categories = [
		postData["category_1"],
		postData["category_2"],
		postData["category_3"],
	];
	let postText = postData["postText"];
	let imgSrcUser = postData["imgSrcUser"];
	let imgSrcRestaurant = postData["imgSrcRestaurant"];
	let imgSrcCommenter = postData["imgSrcCommenter"];
	return (
		<>
			<TopBar pageName={"Home"} />
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
		</>
	);
}

export default MainPage;
