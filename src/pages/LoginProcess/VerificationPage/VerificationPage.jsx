import "./VerificationPage.css";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/Button/Button";
import TopbarSignup from "../../../components/TopbarSignup/TopbarSignup";

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
				<TopbarSignup
					prevProgress={0.2}
					progressMax={0.4}
				/>

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
