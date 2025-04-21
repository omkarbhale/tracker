import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SettingsPanel, { Settings } from "./SettingsPanel";
import ScreenshotCountdown from "./ScreenshotCountdown";
import ScreenshotGallery from "./ScreenshotGallery";

function App() {
	const [settings, setSettings] = useState<Settings>({
		directory: "",
		intervalMs: 5000,
		format: "png",
	});
	// const [screenshots, setScreenshots] = useState([]);
	const [isCapturing, setIsCapturing] = useState<boolean | null>(null);

	useEffect(() => {
		const fetchSettings = async () => {
			const currentSettings = await window.api.invoke("get-settings");
			setSettings(currentSettings);
		};
		fetchSettings();

		// Fetch existing screenshots
		// const fetchScreenshots = async () => {
		// 	const screenshotsList = await window.api.invoke("get-screenshots");
		// 	setScreenshots(screenshotsList);
		// };
		// fetchScreenshots();
	}, []);

	useEffect(() => {
		window.api.invoke("update-settings", settings).then(() => {
			console.log(
				"Your settings have been updated successfully.",
				settings
			);
		});
	}, [settings]);

	useEffect(() => {
		if (isCapturing) {
			window.api.invoke("start-screenshotting").then(() => {
				window.api.invoke("show-notification", {
					title: "Screenshotting Started",
					body: "Screenshotting has started successfully.",
				});
			});
		} else if (isCapturing === false) {
			// Stop screenshotting
			window.api.invoke("stop-screenshotting").then(() => {
				window.api.invoke("show-notification", {
					title: "Screenshotting Stopped",
					body: "Screenshotting has stopped successfully.",
				});
			});
		}
	}, [isCapturing]);

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Sidebar with date and folder navigation */}
			{/* <Sidebar /> */}

			{/* Main content */}
			<div className="flex-1 p-8">
				{/* Settings Panel */}
				<SettingsPanel
					disabled={isCapturing ? true : false}
					settings={settings}
					setSettings={setSettings}
					startCapture={() => setIsCapturing(true)}
					stopCapture={() => setIsCapturing(false)}
				/>

				{/* Screenshot Countdown */}
				{isCapturing && <ScreenshotCountdown />}

				{/* Screenshot Gallery */}
				{/* <ScreenshotGallery screenshots={screenshots} /> */}
			</div>
		</div>
	);
}

export default App;
