import React, { useState, useEffect } from "react";

function ScreenshotCountdown() {
	const [secondsRemaining, setSecondsRemaining] = useState(10); // Countdown starts at 10 seconds

	useEffect(() => {
		if (secondsRemaining === 0) return; // Stop when countdown reaches 0

		const timer = setInterval(() => {
			setSecondsRemaining((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer); // Clean up the timer when the component unmounts
	}, [secondsRemaining]);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
			<h2 className="text-xl mb-4">Next Screenshot in:</h2>
			<div className="text-3xl font-bold">{secondsRemaining} seconds</div>
		</div>
	);
}

export default ScreenshotCountdown;
