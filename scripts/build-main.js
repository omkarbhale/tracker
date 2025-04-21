// scripts/build-main.js
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const fsp = fs.promises;

const copyDir = async (src, dest) => {
	try {
		await fsp.mkdir(dest, { recursive: true });
		const entries = await fsp.readdir(src, { withFileTypes: true });

		for (const entry of entries) {
			const srcPath = path.join(src, entry.name);
			const destPath = path.join(dest, entry.name);

			if (entry.isDirectory()) {
				await copyDir(srcPath, destPath);
			} else {
				await fsp.copyFile(srcPath, destPath);
			}
		}
	} catch (err) {
		console.error("Failed to copy assets:", err);
		process.exit(1);
	}
};

esbuild
	.build({
		entryPoints: ["src/main/main.ts"],
		bundle: true,
		platform: "node",
		outfile: "dist/main.js",
		external: ["electron", "node-api-dotnet"],
		minify: false,
	})
	.then(() => {
		// Copy assets after the build is complete
		const srcAssetsPath = path.resolve(__dirname, "../src/main/assets");
		const distAssetsPath = path.resolve(__dirname, "../dist/assets");

		return copyDir(srcAssetsPath, distAssetsPath);
	})
	.then(() => {
		// Build preload.ts to preload.js
		return esbuild.build({
			entryPoints: ["src/main/preload.ts"],
			bundle: true,
			platform: "node",
			outfile: "dist/preload.js",
			external: ["electron", "node-api-dotnet"],
			minify: false,
		});
	})
	// For screenshot-desktop, copy the files from node_modules to dist
	// They are not js, and not imported in the code, so esbuild does not copy them
	// This is a workaround for the issue with esbuild not copying non-js files
	.then(async () => {
		const srcPath = path.join(
			__dirname,
			"../node_modules/screenshot-desktop/lib/win32"
		);
		const srcFiles = ["screenCapture_1.3.2.bat", "app.manifest"];
		const destinationPath = path.join(__dirname, "../dist");
		for (const file of srcFiles) {
			const srcFilePath = path.join(srcPath, file);
			const destFilePath = path.join(destinationPath, file);
			console.log(`Copying ${srcFilePath} to ${destFilePath}`);
			await fsp.copyFile(srcFilePath, destFilePath);
		}
	})
	.catch(() => process.exit(1));
