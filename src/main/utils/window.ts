import { BrowserWindow, app } from "electron";
import path from "path";
import { minimizeToTray } from "./minimize-to-tray";

export let window: BrowserWindow | undefined; // Like a singleton

export const createOrShowWindow = () => {
	if (window != null) {
		window.show();
		return;
	}

	console.log(__dirname);
	window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "./preload.js"),
			sandbox: false,
			contextIsolation: true,
		},
		icon: path.join(__dirname, "./assets/icon.png"),
		// maximizable: false,
		// resizable: false,
		minWidth: 800,
		minHeight: 500,
	});
	window.setMenu(null);
	window.maximize();

	if (app.isPackaged) {
		window.loadFile("index.html");
	} else {
		window.loadURL("http://localhost:5173");
	}

	minimizeToTray(window);
};
