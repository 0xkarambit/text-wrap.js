const { Transform, pipeline } = require("stream");
const { stdin, stdout, stderr } = require("process");
const { prettyPasteV2 } = require(__dirname + "/format.js");
const chunkBasket = [];

const fmt = new Transform({
	transform(chunk /*Buffer*/, encoding, callback) {
		// chunkBasket.push(chunk.toString());
		const out = prettyPasteV2(chunk.toString());
		this.push(out);
		callback();
	},
});

// fmt.on("finish", () => {
// 	// fired when all data has been sent/written to stdout
// 	// console.log("\x1b[91mDONE\x1b[0m");
// 	// console.log("\n\n\n\n");
// 	// TEST(chunkBasket[0]);
// });

if (require.main == module) {
	// stdin.pipe(fmt).pipe(stdout);

	pipeline(stdin, fmt, stdout, (err) => {
		if (err) {
			stderr.write(err);
		} else {
			// should we emit any event to tell that we are done ? maybe
		}
	});
} else {
	module.exports = fmt;
}

// now i just have to test my current function to see if it can handle the load of a 128kb input
// memory usage, etc
// why cant i use async generators in place of streams in pipeline function
function TEST(input) {
	const result = prettyPasteV2(input);

	function prettyPasteV2(string, limit = 80, delimiter = "\n") {
		let template;
		if (string.length > limit) {
			let breakIndex = string.substring(0, limit).lastIndexOf(" ");
			if (breakIndex == -1) {
				breakIndex = limit - 1; // 0 - 79 = 80 chars (limit)
				template =
					string.substring(0, breakIndex) +
					delimiter +
					prettyPasteV2(string.substring(breakIndex), limit, delimiter);
			} else {
				template =
					string.substring(0, breakIndex) +
					delimiter +
					prettyPasteV2(string.substring(breakIndex + 1), limit, delimiter);
			}
		}
		return (template = template || string);
	}

	console.log(result);
}
