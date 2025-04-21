import { contextBridge, ContextBridge } from "electron";

import {
	getScreenshotSettings,
	updateScreenshotController,
	startScreenshotCapture,
	stopScreenshotCapture,
	screenshotNow,
} from "./api/screenshotsettings";

// Expose the api methods
contextBridge.exposeInMainWorld("api", {
	getScreenshotSettings, // Expose the getScreenshotSettings function
	updateScreenshotController, // Expose the updateScreenshotController function
	startScreenshotCapture, // Expose the startScreenshotCapture function
	stopScreenshotCapture, // Expose the stopScreenshotCapture function
	screenshotNow, // Expose the screenshotNow function
});
