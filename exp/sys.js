const util = require("util");
const { exec } = require("child_process");
const dir = __dirname + "\\new.txt";

console.log(dir);

const command = `echo -e "hello \\n world\\n" >> ${dir}`; // we need to escape the \ (backslashes) of meta characters

// exec(command, function (err, out, stderr) {
// 	err || stderr ? console.log(err, stderr) : null;
// 	console.log(arguments);
// });

// exec("pwd", function (err, stdout, stderr) {
// 	console.log(stdout);
// });

exec("ls -la", function (err, stdout, stderr) {
	console.log(stdout);
});

// object.keys(util);
