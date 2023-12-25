import "./SaveListOverlay.css";

function SaveListOverlay({ isOpen, onClose, onSave }) {
	if (!isOpen) return null;

	// Function to handle the click event on the overlay background
	const handleBackgroundClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose(); // Calls the onClose prop function
		}
	};

	return (
		<div
			className="overlay"
			onClick={handleBackgroundClick}>
			<div className="save-options">
				<button
					onClick={() => {
						onSave("Favourites");
						onClose();
					}}>
					Save to Favourites 💖
				</button>
				<button
					onClick={() => {
						onSave("Wishlist");
						onClose();
					}}>
					Save to Wishlist 🌠
				</button>
			</div>
		</div>
	);
}

export default SaveListOverlay;
