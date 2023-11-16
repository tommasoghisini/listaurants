import { useNavigate } from "react-router-dom";
import "./TopBar.css";

function TopBar({ pageName }) {
	const navigate = useNavigate();

	return (
		<div className="top-bar">
			<div className="top-bar-name">{pageName}</div>
			<img
				src="./icons/notification.svg"
				onClick={() => {
					navigate("/notification");
				}}
				alt="notification"
				style={{ height: "20px" }}
				class="top-bar-notification"
			/>
		</div>
	);
}
export default TopBar;
