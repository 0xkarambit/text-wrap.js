const fs = require("fs");
const path = require("path");

function write(file, data) {
	if (file == undefined || data == undefined)
		throw new Error("file or data unspecified or bad");

	if (!path.isAbsolute(file)) file = path.join(process.cwd(), file);
	// console.log(file);
	fs.writeFileSync(file, data, { encoding: "utf8" });
}
// add file writing remove input test requiredOption ()extend input.js and add config support
// support adding delimiter and remove color from printing, refactoring, take the arg vars outof
// async function
// should we make a different branch with config functionality
