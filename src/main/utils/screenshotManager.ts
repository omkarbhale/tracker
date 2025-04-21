// screenshotManager.ts
import { ScreenshotSettings } from "./screenshotSettings";
import { ScreenshotController } from "./screenshotController";
import * as path from "path";
import * as os from "os";

const defaultPath = path.join(os.homedir(), "Desktop", "screenshots"); // Cross-platform Desktop path
const settings = new ScreenshotSettings(defaultPath, 5000, "png");
const controller = new ScreenshotController(settings);

export function getSettings() {
	return settings;
}

export function updateSettings(newSettings: Partial<ScreenshotSettings>) {
	Object.assign(settings, newSettings);
	controller.updateSettings(settings);
}

export function startScreenshotting() {
	controller.start();
}

export function stopScreenshotting() {
	controller.stop();
}

export function getTimeUntilNextScreenshot() {
	return controller.getTimeUntilNextScreenshot();
}
