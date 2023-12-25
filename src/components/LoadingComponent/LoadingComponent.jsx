import React from "react";
import "./LoadingComponent.css"; // Import CSS file

function LoadingComponent() {
	return (
		<div className="loading-container">
			<div className="loading-spinner"></div>
			<p>Loading...</p>
		</div>
	);
}

export default LoadingComponent;
