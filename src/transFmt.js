const { Transform, pipeline } = require("stream");
// const { stdin, stdout, stderr } = require("process");
const { prettyPasteV2 } = require(__dirname + "/format.js");
// const chunkBasket = [];

const fmtStream = new Transform({
	transform(chunk /*Buffer*/, encoding, callback) {
		const out = prettyPasteV2(chunk.toString());
		this.push(out);
		callback();
	},
});

// fmtStream.on("finish", () => {
// 	// fired when all data has been sent/written to stdout
// 	console.log("\x1b[91mDONE\x1b[0m");
// 	console.log("\n\n\n\n");
// 	console.log(chunkBasket.length);
// 	for (let i in chunkBasket) {
// 		console.log(i, chunkBasket[i].length);
// 	}
// 	// ya we good
// 	// TEST(chunkBasket[0]);
// });

if (require.main == module) {
	// stdin.pipe(fmt).pipe(stdout);

	pipeline(stdin, fmtStream, stdout, (err) => {
		if (err) {
			stderr.write(err);
		} else {
			// should we emit any event to tell that we are done ? maybe
		}
	});
} else {
	module.exports = fmtStream;
}

// now i just have to test my current function to see if it can handle the load of a 128kb input
// memory usage, etc
// why cant i use async generators in place of streams in pipeline function
function TEST(input) {
	console.log(prettyPasteV2(input));
}
