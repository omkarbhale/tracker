import screenshot from "screenshot-desktop";
import * as path from "path";
import * as fs from "fs";
import * as fsp from "fs/promises";

function getFormattedDate(): string {
	const now = new Date();
	return now.toISOString().split("T")[0]; // YYYY-MM-DD
}

function getFormattedTime(): string {
	const now = new Date();
	return now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-mm-ss
}

export class ScreenshotController {
	private intervalMs: number;
	private directory: string;
	private timer: NodeJS.Timeout | null = null;

	constructor(directory: string, intervalMs: number = 5000) {
		this.directory = directory;
		this.intervalMs = intervalMs;
	}

	private async takeScreenshot(): Promise<void> {
		const dateFolder = path.join(this.directory, getFormattedDate());
		await fsp.mkdir(dateFolder, { recursive: true });

		const filename = `screenshot-${getFormattedTime()}.png`;
		const filepath = path.join(dateFolder, filename);

		try {
			await screenshot({ filename: filepath });
			console.log(`Screenshot saved to: ${filepath}`);
		} catch (err) {
			console.error("Failed to take screenshot:", err);
		}
	}

	private scheduleNext(): void {
		this.timer = setTimeout(async () => {
			await this.takeScreenshot();
			this.scheduleNext();
		}, this.intervalMs);
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

	public updateInterval(newIntervalMs: number): void {
		this.intervalMs = newIntervalMs;
		console.log(`Screenshot interval updated to ${newIntervalMs}ms.`);
	}
}
