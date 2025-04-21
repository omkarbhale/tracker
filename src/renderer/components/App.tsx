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
	const [screenshots, setScreenshots] = useState([]); // Store screenshots
	const [isCapturing, setIsCapturing] = useState(false);

	useEffect(() => {
		const fetchSettings = async () => {
			const currentSettings = await window.api.invoke("get-settings");
			setSettings(currentSettings);
		};
		fetchSettings();

		// Fetch existing screenshots
		const fetchScreenshots = async () => {
			const screenshotsList = await window.api.invoke("get-screenshots");
			setScreenshots(screenshotsList);
		};
		fetchScreenshots();
	}, []);

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Sidebar with date and folder navigation */}
			{/* <Sidebar /> */}

			{/* Main content */}
			<div className="flex-1 p-8">
				{/* Settings Panel */}
				<SettingsPanel settings={settings} setSettings={setSettings} />

				{/* Screenshot Countdown */}
				{!isCapturing && <ScreenshotCountdown />}

				{/* Screenshot Gallery */}
				{/* <ScreenshotGallery screenshots={screenshots} /> */}
			</div>
		</div>
	);
}

export default App;
