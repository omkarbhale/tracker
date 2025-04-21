import * as fs from "fs";

export class ScreenshotSettings {
	directory: string;
	intervalMs: number;
	format: "png" | "jpeg";

	constructor(
		directory: string,
		intervalMs: number = 5000,
		format: "png" | "jpeg" = "png"
	) {
		this.directory = directory;
		this.intervalMs = intervalMs;
		this.format = format;

		if (fs.existsSync(this.directory)) {
			fs.mkdirSync(this.directory, { recursive: true });
		}
	}
}
