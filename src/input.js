const readline = require("readline");
const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function getText(prompt) {
	return new Promise((resolve) => {
		reader.question(prompt, (answer) => {
			reader.close(); // what if we want it to run in an interactive mode.
			resolve(answer);
		});
	});
}

// input stops when it encounters a new line should this be alowed to happen ?

module.exports = {
	getText,
};
// make this into a new npm module
