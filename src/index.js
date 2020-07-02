#!/usr/bin/env node
const { program } = require("commander");
// const { write: copy } = require("clipboardy");
// const stream = require("stream");
// const { isUndefined } = require("util");

// const fmt = require("./format");
// const { getText } = require("./input.js");
// const { getStandardInputStream } = require("./input-output.js");
// const fmtStream = require("./transFmt");
const { pipeline, Transform } = require("stream");
const { prettyPasteV2 } = require(__dirname + "/format.js");
const { stdin, stdout, stderr } = require("process");

const log = console.log;

program
	.version("v0.0.1")
	// .option("-t, --text <text>", "set the line of text to modify")
	.option("-l, --limit <num>", "set max line length to <num>")
	.option("-d, --delimiter <char>", "set the delimiter to use [default] \\n") // this is currently char at end of line shouldnt this be called lineEnding or something.
	// .option(
	// 	"-f, --force",
	// 	"uses force format method to wrap text without whitespaces"
	// )
	// .option("-c, --copy", "specifies to copy the formated text to clipboard")

	// .option("-w, --write <file>", "write formated text to <file>") // only 1 of these 2
	// .option("-a, --append <file>", "append formated text to <file>") // only 1 of these 2
	// .option("-n, --nooutput", "disables stdout")
	.parse(process.argv);

(async function main() {
	const limit = +program.limit || 80; // default value.
	let delimiter = processDelimiter(program.delimiter) || "\n";
	// const method = program.force ? "newfmt" : "prettyPasteV2";
	// const text = program.text || (await getStandardInputStream());

	// if (isUndefined(text)) return 1;

	const fmtStream = new Transform({
		transform(chunk /*Buffer*/, encoding, callback) {
			const out = prettyPasteV2(chunk.toString(), limit, delimiter);
			this.push(out);
			callback();
		},
	});

	pipeline(stdin, fmtStream, stdout, (err) => {
		if (err) {
			stderr.write(err);
		} else {
			// maybe emit an event to tell the program to copy all the stored chunks or something ?
		}
	});

	// todo perform memory check with the ./exp/chunk_size_test folder.

	// const result = fmt[method](text, limit, delimiter);

	// const readStream = stream.Readable.from(result);
	// readStream.on("end", () => {
	// 	// program.copy ? await copy(result) : null;
	// 	process.exit(0);
	// });
	// readStream.pipe(process.stdout);
	// todo if (!program.nooutput) process.stdout.write("\n" + result);

	// program.copy ? await copy(result) : null;
	// ! oh crap newline is copied along with it if the input has newline as ending.
	/* IF FLAG TRUE then if result.endsWith('\n') then result.trim() end end*/
	// console.log("i run");
	// program.write ? writeFile(program.write) : null;
	// process.exit(0);
})();

// Helper functions.

function processDelimiter(str = "") {
	// str is a char
	let string = "";
	return str.replace("\\n", "\n").replace("\\r", "\r");
}

// todo add ability to specify to // break at whitespaces or force break
// ! the program is not exiting on its own ! why ?
// should i add config support to save the preferences ?
// add ifs flag
// todo still havent made the the adjustment for the encountered \n or \r\n
