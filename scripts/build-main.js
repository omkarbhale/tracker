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
	.catch(() => process.exit(1));
