const { Transform, finished } = require("stream");
const { stdin, stdout } = require("process");
//<debug>
const chunksList = [];
//</debug>

function returnstream() {
	return new Transform({
		transform(chunk, encoding, callback) {
			chunksList.push(chunk);
			this.push(chunk.toString().toUpperCase());
			callback(); // wtf the tutorial didnt say this line was important. was this the cause of all the event handlers not working. maybe.
			// maybe we should read https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/ again lol.
		},
	});
}

if (require.main == module) {
	const trans = returnstream();
	// WORKING
	// trans.on("finish", () => {
	// 	console.log(chunksList.length);
	// 	for (let i in chunksList) {
	// 		console.log(i, chunksList[i].length);
	// 	}
	// });

	// finished(stdout, () => {
	// 	console.log(chunksList.length);
	// 	for (let i in chunksList) {
	// 		console.log(i, chunksList[i].length);
	// 	}
	// });

	// WORKING
	// stdin.on("end", () => {
	// 	stdout.write("\n");
	// 	console.log("\x1b[94m" + chunksList.length);
	// 	for (let i in chunksList) {
	// 		console.log(i, chunksList[i].length);
	// 	}
	// }); // now this is working. (after adding callback)

	// stdin.pipe(trans).pipe(stdout);
	stdin
		.pipe(trans)
		.on("end", () => {
			console.log("wowo");
		})
		.pipe(stdout);

	// NOT WORKING
	// stdout.on("finish", () => {
	// 	console.log(chunksList.length);
	// 	for (let i in chunksList) {
	// 		console.log(i, chunksList[i].length);
	// 	}
	// }); // nah still doesnt work (after adding callback) [maybe because stdout is never closed as new strings must be outputted to the terminal]
	// I WAS RIGHT
	//
	// process.stdout is never closed it is a permanent stream.
	// https://github.com/nodejs/node/issues/7606*/

	// WORKING
	// process.on("beforeExit", () => {
	// 	// console.log("done");
	// 	console.log(chunksList.length);
	// 	for (let i in chunksList) {
	// 		console.log(i, chunksList[i].length);
	// 	}
	// 	// output
	// 	// 1
	// 	// 0 131072
	// 	// did it only process 1 chunk ? why
	// });
} else {
	module.exports = {
		returnstream,
	};
}

// stops after processing the first chunk.
// but still
// cat ./exp/chunk_size_test/chunks.txt | node ./src/streamFmt.js > out.txt
// WOW that was fast.
