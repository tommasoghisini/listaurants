import "./VerificationPage.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/Button/Button";

const VerificationPage = () => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add logic to handle account creation
		navigate("/signup-name");
	};

	return (
		<div className="verification-page">
			<div>
				<div className="signup-top-bar">
					<img
						src="./icons/back.svg"
						alt="back"
						style={{ height: "15px" }}
					/>
				</div>

				<h1 className="title">Verify your account</h1>
				<div>
					A verification link has been sent to your email you@example.com.
					<strong> Resend Link</strong>
				</div>
			</div>
			<Button
				text="Continue"
				onClick={handleSubmit}
			/>
		</div>
	);
};

export default VerificationPage;
