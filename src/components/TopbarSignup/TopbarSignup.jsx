import "./TopbarSignup.css";
import ProgressIndicator from "../../components/shared/CustomProgress/ProgressIndicator";
import { useNavigate } from "react-router-dom";

const TopbarSignup = ({ prevProgress, progressMax }) => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1); // Use the history object to go back to the previous page
	};

	return (
		<div className="signup-top-bar">
			<img
				src="/icons/back.svg"
				alt="back"
				className="close-icon"
				onClick={goBack}
			/>
			<div className="progress-indicator-wrapper">
				<ProgressIndicator
					prevProgress={prevProgress}
					progressMax={progressMax}
				/>
			</div>
		</div>
	);
};

export default TopbarSignup;
