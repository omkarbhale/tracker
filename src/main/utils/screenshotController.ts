import screenshot from "screenshot-desktop";
import * as path from "path";
import * as fsp from "fs/promises";
import { ScreenshotSettings } from "./screenshotSettings";
import { Notification } from "electron";

function getFormattedDate(): string {
	const now = new Date();
	return now.toISOString().split("T")[0]; // YYYY-MM-DD
}

function getFormattedTime(): string {
	const now = new Date();
	return now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-mm-ss
}

export class ScreenshotController {
	private timer: NodeJS.Timeout | null = null;

	constructor(private settings: ScreenshotSettings) {}

	private async takeScreenshot(): Promise<void> {
		const folder = path.join(this.settings.directory, getFormattedDate());
		await fsp.mkdir(folder, { recursive: true });

		const filename = `screenshot-${getFormattedTime()}.${
			this.settings.format
		}`;
		const filepath = path.join(folder, filename);

		try {
			await screenshot({ filename: filepath });
			console.log(`Screenshot saved to: ${filepath}`);

			const notification = new Notification({
				title: "Screenshot Captured",
				body: `Screenshot saved to ${filepath}`,
			});
			notification.show();
		} catch (err) {
			console.error("Failed to take screenshot:", err);
		}
	}

	private scheduleNext(): void {
		this.timer = setTimeout(async () => {
			await this.takeScreenshot();
			this.scheduleNext();
		}, this.settings.intervalMs);
	}

	public start(): void {
		if (!this.timer) {
			console.log("Starting screenshot capture...");
			this.scheduleNext();
		}
	}

	public stop(): void {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null;
			console.log("Screenshot capture stopped.");
		}
	}

	public updateSettings(settings: ScreenshotSettings): void {
		this.settings = settings;
		if (this.timer) {
			this.stop();
			this.start();
		}
	}
}
