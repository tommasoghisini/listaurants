import React from "react";
import "./SignupForm.css";

function Signup() {
	return (
		<div className="signup">
			<p>
				Don't have an account yet?{" "}
				<a
					href="/signup"
					className="signup-link">
					Sign up now
				</a>
			</p>
		</div>
	);
}

export default Signup;
