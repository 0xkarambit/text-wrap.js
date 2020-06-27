#!/usr/bin/env node
const { program } = require("commander");
const { write: copy } = require("clipboardy");
const stream = require("stream");

const fmt = require("./format");
const { getText } = require("./input.js");
const { getStandardInputStream } = require("./input-output.js");

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
	.parse(process.argv);

(async function main() {
	const limit = +program.limit || 80; // default value.
	let delimiter = processDelimiter(program.delimiter) || "\n";
	const method = program.force ? "newfmt" : "prettyPasteV2";
	const text = program.text || (await getStandardInputStream());

	const result = fmt[method](text, limit, delimiter);

	const readStream = stream.Readable.from(result);
	readStream.on("end", () => {
		process.exit(0);
	});
	readStream.pipe(process.stdout);
	// process.stdout.write("\n" + result);

	program.copy ? await copy(result) : null;
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
