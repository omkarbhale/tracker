import { screenshotIpcHandlers } from "./screenshotIpcHandlers";
import { notificationIpcHandlers } from "./notificationIpcHandlers";

export function registerIpcHandlers() {
	screenshotIpcHandlers();
	notificationIpcHandlers();
}
