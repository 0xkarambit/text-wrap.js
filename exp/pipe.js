#!/usr/bin/env node

// process.stdin.resume();
// process.stdin.setEncoding("utf8");

// let File = "";
// let chunk;
// let arr = [];

// process.stdin.on("readable", () => {
// 	if ((chunk = process.stdin.read()) !== null) {
// 		File += chunk;
// 		arr.push({ chunk, size: chunk.length });
// 	}
// 	// process.stdout.write(`[${process.stdin.read()}]`);
// });

// process.stdin.on("end", function (data) {
// 	// process.stdout.write("end");
// 	// process.stdout.write(File);
// 	console.log("\n\n");
// 	process.stdout.write(arr.length.toString() + "\n");
// 	for (let i in arr) {
// 		console.log(arr[i].size);
// 	}
// });

process.on("SIGINT", function () {
	console.log("Got a SIGINT. Goodbye cruel world");
	process.exit(0);
});

// $ node -p "Boolean(process.stdin.isTTY)"
// true
// $ echo "foo" | node -p "Boolean(process.stdin.isTTY)"
// false
// $ node -p "Boolean(process.stdout.isTTY)"
// true
// $ node -p "Boolean(process.stdout.isTTY)" | cat
// false

function getStandardInputStream() {
	return new Promise((resolve, reject) => {
		// process.stdin.resume();
		// process.stdin.setEncoding("utf8");

		let data = "";
		let chunk;
		process.stdin.on("data", function (chunk) {
			data += chunk;
		});
		// process.stdin.on("readable", function () {
		// 	if ((chunk = process.stdin.read()) !== null) data += chunk;
		// });
		process.stdin.on("end", function () {
			resolve(data);
		});
		process.stdin.on("error", function (err) {
			reject(err);
		});
	});
}

(async () => {
	const input = await getStandardInputStream();
	process.stdout.write(input);
})();
