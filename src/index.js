#!/usr/bin/env node
const fmt = require("./format");
const { program } = require("commander");
const { write: copy } = require("clipboardy");
const { getText } = require("./input.js");
const log = console.log;
const red = "\x1b[96m"; // 2 green. 4 blue. 3 yellow 5.purple
const clear = "\x1b[0m";

program
	.version("v0.0.1")
	.requiredOption("-t, --text <text>", "set the line of text to modify")
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

const limit = program.limit ? +program.limit : 80; // default value.
let delimiter = processDelimiter(program.delimiter ? program.delimiter : "\n");
const text = program.text;
const method = program.force ? "newfmt" : "prettyPasteV2";
// const file =

(async function main() {
	// const result = fmt.prettyPasteV2(text, limit, delimiter);
	const result = fmt[method](text, limit, delimiter);
	log("\n" + result);
	program.copy ? await copy(result) : null;
	process.exit(0);
})();

function processDelimiter(str) {
	// str is a char
	let string = "";
	return str.replace("\\n", "\n");
}

// todo add ability to specify to // break at whitespaces or force break
// ! the program is not exiting on its own ! why ?
// should i add config support to save the preferences ?
// add ifs flag
