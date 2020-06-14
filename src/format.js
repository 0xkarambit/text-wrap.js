function prettyPaste(string, limit = 80, delimiter) {
	// limit : character limit per line
	let template;
	if (string.length > limit) {
		let breakIndex = string.slice(0, limit).lastIndexOf(" ");
		template = string.slice(0, breakIndex) + delimiter + prettyPaste(string.slice(breakIndex + 1), limit, delimiter);
	}
	return template = template || string;
}


function newfmt(str, limit = 80, del = '\n') {
	console.time('newfmt');
	let temp = '';
	let start = 0;
	const len = str.length;
	for (let i = 0; i < len; i+=limit) {
		// code
		temp += str.slice(start, i) + del;
		start = i;
	}
	console.timeEnd('newfmt')
	return temp;
}

// tests

// this if statement implies that this file has been called on its own and my imported by anyother file
if (require.main == module) {
	let str = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci voluptates quia accusantium corporis a, omnis eveniet non neque numquam? Et ad doloremque id minus corrupti unde sapiente, repudiandae molestias minima ab aspernatur qui ex officia voluptas accusamus amet pariatur animi laudantium alias mollitia, in maxime quam! Culpa deserunt necessitatibus quod?;'
	console.log(newfmt(str, 20, '\r\n'))
	console.time('prettyPaste');
	console.log(prettyPaste(str, 20, '\r\n'))
	console.timeEnd('prettyPaste');
}

// performace test 
// newfmt: 0.162ms
// prettyPaste: 0.753ms


// issues 
//error with 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh']

module.exports = {
	prettyPaste,
	newfmt
}