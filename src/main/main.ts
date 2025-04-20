import { app } from "electron";
import { createOrShowWindow } from "./utils/window";

app.whenReady().then(() => {
	createOrShowWindow();

	app.on("activate", () => {
		createOrShowWindow();
	});
});

app.on("window-all-closed", () => {
	app.quit(); // Quit on close
});
