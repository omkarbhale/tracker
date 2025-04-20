const fs = require("fs");
const path = require("path");
const basePkg = require("../package.json");

const minimalPkg = {
	name: basePkg.name,
	version: basePkg.version,
	main: "main.js",
	dependencies: basePkg.dependencies, // Runtime dependencies only
};

fs.writeFileSync(
	path.join(__dirname, "../dist/package.json"),
	JSON.stringify(minimalPkg, null, 4)
);

console.log("✅ Minimal package.json copied to dist/");
