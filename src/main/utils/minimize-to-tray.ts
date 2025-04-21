import { app, BrowserWindow, Menu, Notification, Tray } from "electron";
import path from "path";
import { createOrShowWindow } from "./window";

const iconPath = path.join(__dirname, "assets", "icon.png");

export function minimizeToTray(window: BrowserWindow) {
	const tray = new Tray(iconPath);

	// @ts-ignore
	window.on("minimize", (e: Electron.Event, isAlwaysOnTop: boolean) => {
		e.preventDefault(); // Prevent the default minimize behavior
		window.hide(); // Hide the window instead of minimizing it

		new Notification({
			title: "Screenshot App",
			body: "App minimized to tray",
		}).show(); // Show a notification when minimized to tray
	});

	tray.setContextMenu(
		Menu.buildFromTemplate([
			{
				label: "Show App",
				click: function () {
					createOrShowWindow(); // Makes it visible again
				},
			},
			{
				label: "Quit",
				click: function () {
					app.quit();
				},
			},
		])
	);

	tray.addListener("click", (e, bounds, position) => {
		createOrShowWindow(); // Makes it visible again
	});

	tray.setToolTip("Screenshot App"); // Tooltip when hovering over the tray icon
}
