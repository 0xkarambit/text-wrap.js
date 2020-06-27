// process.stdin.resume();
// process.stdin.setEncoding("utf8");

// let File = "";

// process.stdin.on("data", function (data) {
// 	// process.stdout.write(data);
// 	File += data;
// 	// console.log(`\n\x1b[94m${data}\x1b[0m\n`);
// });

// process.stdin.on("end", function (data) {
// 	// process.stdout.write("end");
// 	process.stdout.write(File);
// });

process.on("SIGINT", function () {
	console.log("Got a SIGINT. Goodbye cruel world");
	process.exit(0);
});

function getStandardInputStream() {
	// process.stdin.resume();
	process.stdin.setEncoding("utf8");

	let BUFFER = "";

	process.stdin.on("data", function (data) {
		BUFFER += data;
	});

	return new Promise((resolve) => {
		process.stdin.on("end", () => {
			resolve(BUFFER);
		});
	});
}

module.exports = {
	getStandardInputStream,
};
