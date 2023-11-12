import "./TopBar.css";

function TopBar() {
	return (
		<div className="top-bar">
			<div className="top-bar-name">Home</div>
			<img
				src="/notification.svg"
				alt="notification"
				style={{ height: "20px" }}
				class="top-bar-notification"
			/>
		</div>
	);
}
export default TopBar;
