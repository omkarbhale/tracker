import { ipcMain } from "electron";
import { Notification } from "electron";

export function notificationIpcHandlers() {
	ipcMain.handle(
		"show-notification",
		(_event, options?: Electron.NotificationConstructorOptions) => {
			const notification = new Notification(options);
			notification.show();
		}
	);
}
