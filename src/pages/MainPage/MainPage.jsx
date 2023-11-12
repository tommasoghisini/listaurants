import Post from "../../components/MainPage/Post/Post";
import TopBar from "../../components/shared/TopBar/TopBar";
import "./MainPage.css";

function MainPage() {
	return (
		<>
			<TopBar pageName={"Home"} />
			<Post />
		</>
	);
}

export default MainPage;
