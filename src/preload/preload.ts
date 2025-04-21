// WARNING: Directly exposing ipcRenderer is not recommended in production apps.
// In a real-world project, you'd whitelist specific channels or wrap them in secure functions.
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
	invoke: ipcRenderer.invoke,
	send: ipcRenderer.send,
});
