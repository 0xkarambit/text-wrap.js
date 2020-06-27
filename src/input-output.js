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

// process.on("SIGINT", function () {
// 	console.log("Got a SIGINT. Goodbye cruel world");
// 	process.exit(0);
// });

// function getStandardInputStream() {
// 	// process.stdin.resume();
// 	process.stdin.setEncoding("utf8");

// 	let BUFFER = "";

// 	process.stdin.on("data", function (data) {
// 		BUFFER += data;
// 	});

// 	return new Promise((resolve) => {
// 		process.stdin.on("end", () => {
// 			resolve(BUFFER);
// 		});
// 	});
// }

function getStandardInputStream() {
	return new Promise((resolve, reject) => {
		process.stdin.resume();
		process.stdin.setEncoding("utf8");

		let data = "";
		let chunk;
		// process.stdin.on("data", function (chunk) {
		// 	data += chunk;
		// });
		process.stdin.on("readable", function () {
			if ((chunk = process.stdin.read()) !== null) data += chunk;
		});
		process.stdin.on("end", function () {
			resolve(data);
		});
		process.stdin.on("error", function (err) {
			reject(err);
		});
	});
}

// function getStandardInputStream() {
// 	return new Promise((resolve, reject) => {
// 		process.stdin.resume();
// 		process.stdin.setEncoding("utf8");

// 		let data = "";
// 		let chunk;
// 		// process.stdin.on("data", function (chunk) {
// 		// 	data += chunk;
// 		// });
// 		process.stdin.on("readable", function () {
// 			if ((chunk = process.stdin.read()) !== null) data += chunk;
// 		});
// 		process.stdin.on("end", function () {
// 			resolve(data);
// 		});
// 		process.stdin.on("error", function (err) {
// 			reject(err);
// 		});
// 	});
// }

// make this like this -.

/* https://2ality.com/2019/11/nodejs-streams-async-iteration.html#recap%3A-asynchronous-iteration-and-asynchronous-generators
 import {Readable} from 'stream';

async function readableToString2(readable) {
  let result = '';
  for await (const chunk of readable) {
    result += chunk;
  }
  return result;
}

const readable = Readable.from('Good morning!', {encoding: 'utf8'});
assert.equal(await readableToString2(readable), 'Good morning!');
 */

module.exports = {
	getStandardInputStream,
};
