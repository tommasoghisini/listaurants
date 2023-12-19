import "./ProfilePicture.css";

/**
 *
 * @param {String} imgSrc path to image
 * @param {number} height height of image
 * @returns component ProfilePicture
 */

function ProfilePicture({ imgSrc, height }) {
	return (
		<img
			src={imgSrc}
			alt="/images/pp.jpeg"
			style={{ height: height, width: height }}
			className="profile-image"
		/>
	);
}

export default ProfilePicture;
