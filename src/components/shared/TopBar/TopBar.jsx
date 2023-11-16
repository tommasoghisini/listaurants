import "./TopBar.css";

function TopBar({ pageName }) {
	return (
		<div className="top-bar">
			<div className="top-bar-name">{pageName}</div>
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
