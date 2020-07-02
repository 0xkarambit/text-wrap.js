#!/usr/bin/env node
const { program } = require("commander");
const { pipeline, Transform } = require("stream");
const { prettyPasteV2 } = require(__dirname + "/format.js");
const { stdin, stdout, stderr } = require("process");

program
	.version("v0.0.1")
	.option("-l, --limit <num>", "set max line length to <num>")
	.option("-d, --delimiter <char>", "set the delimiter to use [default] \\n") // this is currently char at end of line shouldnt this be called lineEnding or something.
	// .option(
	// 	"-f, --force",
	// 	"uses force format method to wrap text without whitespaces"
	// ) // ! force option should be there
	.parse(process.argv);

const limit = +program.limit || 80; // default value.
const delimiter = processDelimiter(program.delimiter) || "\n";

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

// todo perform memory check with the ./exp/chunk_size_test folder.
// todo if (!program.nooutput) process.stdout.write("\n" + result);
// ! oh crap newline is copied along with it if the input has newline as ending.
/* IF FLAG TRUE then if result.endsWith('\n') then result.trim() end end*/
