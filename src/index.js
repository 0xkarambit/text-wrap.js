#!/usr/bin/env node
const { program } = require("commander");
const { write: copy } = require("clipboardy");
const stream = require("stream");

const fmt = require("./format");
// const { getText } = require("./input.js");
const { getStandardInputStream } = require("./input-output.js");
const { isUndefined } = require("util");

const log = console.log;

program
	.version("v0.0.1")
	.option("-t, --text <text>", "set the line of text to modify")
	.option("-l, --limit <num>", "set max line length to <num>")
	.option("-d, --delimiter <char>", "set the delimiter to use [default] \\n") // this is currently char at end of line
	.option(
		"-f, --force",
		"uses force format method to wrap text without whitespaces"
	)
	.option("-c, --copy", "specifies to copy the formated text to clipboard")

	.option("-w, --write <file>", "write formated text to <file>") // only 1 of these 2
	.option("-a, --append <file>", "append formated text to <file>") // only 1 of these 2
	.option("-n, --nooutput", "disables stdout")
	.parse(process.argv);

(async function main() {
	const limit = +program.limit || 80; // default value.
	let delimiter = processDelimiter(program.delimiter) || "\n";
	const method = program.force ? "newfmt" : "prettyPasteV2";
	const text = program.text || (await getStandardInputStream());

	if (isUndefined(text)) return 1;

	// check if text is a stream if so use the (nonexistant) transform stream and pipe to stdout.
	// else use function ?
	// todo perform memory check with the ./exp/chunk_size_test folder.

	const result = fmt[method](text, limit, delimiter);

	// const readStream = stream.Readable.from(result);
	// readStream.on("end", () => {
	// 	// program.copy ? await copy(result) : null;
	// 	process.exit(0);
	// });
	// readStream.pipe(process.stdout);
	if (!program.nooutput) process.stdout.write("\n" + result);

	program.copy ? await copy(result) : null;
	// ! oh crap newline is copied along with it if the input has newline as ending.
	/* IF FLAG TRUE then if result.endsWith('\n') then result.trim() end end*/
	console.log("i run");
	// program.write ? writeFile(program.write) : null;
	// process.exit(0);
})();

function processDelimiter(str = "") {
	// str is a char
	let string = "";
	return str.replace("\\n", "\n");
}

// todo add ability to specify to // break at whitespaces or force break
// ! the program is not exiting on its own ! why ?
// should i add config support to save the preferences ?
// add ifs flag
