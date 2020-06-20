#!/usr/bin/env node
const fmt = require("./format");
const readline = require("readline");
const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const { program } = require("commander");
const { write: copy } = require("clipboardy");

const log = console.log;
const red = "\x1b[96m"; // 2 green. 4 blue. 3 yellow 5.purple
const clear = "\x1b[0m";

program
	.version("v0.0.1")
	.option("-l, --limit <num>", "set max line length to <num>")
	.option("-d, --delimiter <char>", "set the delimiter to use [default] \\n") // this is currently char at end of line
	.option("-t, --text <text>", "set the line of text to modify")
	.option("-f, --force", "uses force format method to wrap text")
	.option("-c, --copy", "specifies to copy the formated text to clipboard")
	.parse(process.argv);

(async function main() {
	const limit = program.limit ? +program.limit : 80;
	let delimiter = processDelimiter(
		program.delimiter ? program.delimiter : "\n"
	);
	const text = program.text ? program.text : await getText("enter text> ");
	const method = program.force ? "newfmt" : "prettyPasteV2";

	// const result = fmt.prettyPasteV2(text, limit, delimiter);
	const result = fmt[method](text, limit, delimiter);

	// process.stdin.write("\n" + result); // gives error -> write EPIPE
	writeResult(result);
	program.copy ? await copy(result) : null;
	process.exit(0);
})();

// input stops when it encounters a new line should this be alowed to happen ?

function getText(prompt) {
	return new Promise((resolve) => {
		reader.question(prompt, (answer) => {
			reader.close(); // what if we want it to run in an interactive mode.
			resolve(answer);
		});
	});
}

function writeResult(str) {
	log("\n" + red + str + clear);
}

function processDelimiter(str) {
	// str is a char
	let string = "";
	return str.replace("\\n", "\n");
}

// todo add ability to specify to // break at whitespaces or force break
// ! the program is not exiting on its own ! why ?
// should i add config support to save the preferences ?
// add ifs flag
