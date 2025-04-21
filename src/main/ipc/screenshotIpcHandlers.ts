import { ipcMain } from "electron";
import screenshotDesktop from "screenshot-desktop";
import {
	getSettings,
	startScreenshotting,
	stopScreenshotting,
	updateSettings,
} from "../utils/screenshotManager";

export function screenshotIpcHandlers() {
	ipcMain.handle("start-screenshotting", () => startScreenshotting());

	ipcMain.handle("stop-screenshotting", () => stopScreenshotting());

	ipcMain.handle("update-settings", (_, newSettings) => {
		return updateSettings(newSettings);
	});

	ipcMain.handle("get-settings", () => getSettings());

	ipcMain.handle("screenshot-now", async (_event, screenshotPath: string) => {
		return screenshotDesktop({ filename: screenshotPath });
	});
}
