import React, { useState, useEffect } from "react";

function ScreenshotCountdown() {
	const [secondsRemaining, setSecondsRemaining] = useState(-1);

	useEffect(() => {
		const timer = setInterval(async () => {
			const nextScreenshotTime = await window.api.invoke(
				"get-time-until-next-screenshot"
			);
			console.log(nextScreenshotTime);
			setSecondsRemaining(nextScreenshotTime);
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, [secondsRemaining]);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
			{secondsRemaining > 0 && (
				<>
					<h2 className="text-xl mb-4">Next Screenshot in:</h2>
					<div className="text-3xl font-bold">
						{Math.floor(secondsRemaining / 1000)} seconds
					</div>
				</>
			)}
			{secondsRemaining <= 0 && (
				<h2 className="text-xl mb-4">No active screenshot</h2>
			)}
		</div>
	);
}

export default ScreenshotCountdown;
