import React, { useState, useEffect } from "react";
import "./ProgressIndicator.css"; // This will contain our CSS

const MyCustomClipper = ({ progress }) => {
	// We will use a div and style it accordingly to simulate the clipping effect
	return (
		<div
			className="clipper"
			style={{ width: `${progress * 100}%` }}>
			<div className="progress-bar" />
		</div>
	);
};

const ProgressIndicator = ({ prevProgress, progressMax }) => {
	const [progress, setProgress] = useState(prevProgress);

	useEffect(() => {
		// This will animate the progress bar similar to the TweenAnimationBuilder
		const interval = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= progressMax ? progressMax : prevProgress + 0.01
			);
		}, 30); // Adjust time to control the speed of the animation

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="container">
			<MyCustomClipper progress={progress} />
		</div>
	);
};

export default ProgressIndicator;
