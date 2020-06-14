function prettyPaste(string, limit = 80, delimiter) {
		// limit : character limit per line
		let template;
		if (string.length > limit) {
				let breakIndex = string.slice(0, limit).lastIndexOf(" ");
				template = string.slice(0, breakIndex) + delimiter + prettyPaste(string.slice(breakIndex + 1));
		}
		return template = template || string;
}

module.exports = {
	prettyPaste
}