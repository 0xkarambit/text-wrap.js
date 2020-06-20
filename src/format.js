function prettyPaste(string, limit = 80, delimiter = "\n") {
	// limit : character limit per line
	// replaces the whitespace nearest to the limit (before limit) Index with a newline.
	let template;
	if (string.length > limit) {
		let breakIndex = string.substring(0, limit).lastIndexOf(" ");
		template =
			string.substring(0, breakIndex) +
			delimiter +
			prettyPaste(string.substring(breakIndex + 1), limit, delimiter);
	}
	return (template = template || string);
}
// it keeps on re-processing the same line if given an input without whitespace in 80 chars

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

function newfmt(str, limit = 80, del = "\n") {
	let temp = "";
	let start = 0;
	const len = str.length;
	for (let i = 0; i < len; i += limit) {
		// code
		temp += str.slice(start, i) + del;
		start = i;
	}
	return temp + str.slice(start);
}

// TESTS
// this if statement implies that this file has been called on its own and my imported by anyother file
if (require.main == module) {
	const { log, time, timeEnd } = console;
	let str =
		process.argv[2] ||
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci voluptates quia accusantium corporis a, omnis eveniet non neque numquam? Et ad doloremque id minus corrupti unde sapiente, repudiandae molestias minima ab aspernatur qui ex officia voluptas accusamus amet pariatur animi laudantium alias mollitia, in maxime quam! Culpa deserunt necessitatibus quod?;" ||
		"hello wordl hello wordl hello wordl hello wordl hello hello wordl hello wordl hello wordl hello wordl hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhe he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he he";
	time("newfmt");
	log(newfmt(str, 20, "\r\n"));
	newfmt(str, 20, "\r\n");
	timeEnd("newfmt");

	time("prettyPaste");
	log(prettyPaste(str, 20, "\r\n"));
	prettyPaste(str, 20, "\r\n");
	timeEnd("prettyPaste");
}
// performace test [old]
// newfmt: 0.162ms
// prettyPaste: 0.753ms

// performace test [new]
// newfmt: 0.225ms
// prettyPaste: 0.141ms

module.exports = {
	prettyPaste,
	newfmt,
	prettyPasteV2,
};

// todo well the given input can also have newlines huh maybe we should reset the checking of whitespaces when we encounter a newline.
