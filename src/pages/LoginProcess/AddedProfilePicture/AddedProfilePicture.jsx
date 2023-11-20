import "./AddedProfilePicture.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/shared/Button/Button";

const AddedProfilePicture = () => {
	const navigate = useNavigate();
	const { username } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add logic to handle account creation
		navigate("/home");
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
					Welcome {username}, your account is all set up!
				</h1>
				<div className="profile-img-default">
					<img
						src="/icons/addProfile.svg"
						height={200}
						alt="profile-img-default"></img>
				</div>
			</div>
			<Button
				text="Let's start"
				onClick={handleSubmit}
			/>
		</div>
	);
};

export default AddedProfilePicture;
