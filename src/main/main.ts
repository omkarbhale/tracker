import { app } from "electron";
import { createOrShowWindow } from "./utils/window";

// Register IPC handlers
import { registerIpcHandlers } from "./ipc/index";
registerIpcHandlers();

app.whenReady().then(() => {
	createOrShowWindow();

	app.on("activate", () => {
		createOrShowWindow();
	});
});

app.on("window-all-closed", () => {
	app.quit(); // Quit on close
});
