import "./AddProfilePicture.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/shared/Button/Button";

const AddProfilePicture = () => {
	const navigate = useNavigate();
	const { username } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add logic to handle account creation
		navigate(`/added-picture/${username}`);
	};

	return (
		<div className="verification-page">
			<div>
				<div className="signup-top-bar">
					<img
						src="/icons/back.svg"
						alt="back"
						style={{ height: "15px" }}
					/>
				</div>
				<h1 className="title">
					Add a profile picture{" "}
					<span className="optional-text">(Optional)</span>
				</h1>
				<div className="profile-img-default">
					<img
						src="/icons/addProfile.svg"
						height={200}
						alt="profile-img-default"></img>
				</div>
			</div>
			<Button
				text="Add photo"
				onClick={handleSubmit}
			/>
		</div>
	);
};

export default AddProfilePicture;
