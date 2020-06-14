#!/usr/bin/env node
const fmt = require('./format')
const readline = require('readline');
const reader = readline.createInterface({
	input:process.stdin,
	output:process.stdout,
})
const { program } = require('commander');

const log = console.log;

program
	.version("v0.0.1")
	.option("-l, --limit <num>", "set max line length to <num>")
	.option("-d, --delimiter", "set the delimiter to use [default] \n")
	.option("-t, --text <text>", "set the line of text to modify")
	.option('-n, --no-copy', 'specifies to not copy the formated text to clipboard by default')
	.parse(process.argv);

(async function main() {
	// main program flow
	const limit = program.limit ? program.limit : 80;
	const delimiter = program.delimiter ? program.delimiter : '\n';
	const text = program.text ? program.text : await getText("enter text> ");

	// log(text);
	const result = fmt.prettyPaste(text, limit, delimiter);
	log(result)
})()


// input stops when it encounters a new line should this be alowed to happen ?



function getText(prompt) {
	return new Promise( resolve => {
		reader.question(prompt, (answer)=>{
			reader.close();
			resolve(answer);
		});
	});
}