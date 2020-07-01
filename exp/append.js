const fs = require("fs");
const { exec } = require("child_process");
const stream = require("stream");

const fileName = "chunks.txt" || "new.txt";
const data = "lolololololololol" || "lolololololololol\n";

// const rStream = fs.createReadStream("read.txt");
const wStream = fs.createWriteStream(fileName, { flags: "a" });

// rStream.pipe(wStream);

// wStream.write(data, (err) => {
// 	err ? err : console.log("data appended successfully\n");

// 	exec(`cat ${fileName}`, (err, stdout, stderr) => {
// 		console.log(stdout);
// 	});
// });

// making a custom size file.

// lolololololololol\n is 18 bytes // echo "$str" | wc -c
// fileSize required is 32 kb
// i kb = 1024 bytes.
// default HighWaterMark value is 16 * 1024.

// file size = 18 ($ data.length) * 1024 (bytes) * 2 (multiplier) = 36 bytes.

for (let i = 0; i < 1024 * 2; ++i) {
	// wStream.write(data);
	wStream.write("a".repeat(64)); // total should be 128 kb = 1024 * 128
}
wStream.on("close", () => {
	console.log("done");
});

wStream.end();

// result
// cat ./new.txt | wc -c returns -> 36864 ie 18 * 1024 * 2
// but still it is read in a single chunk ..huh suspecious

//  idea double the size lol (which definitely means run it again)
// now the size is 73728 ie 36864 * 2

// didnt work so i just ran it 4 more times lol. (maybe its because of using stdin ?)
// now the size is 221184

// wowow now its finally 2.
// on storing and then logging the size of each chunk we get
// 131072 <- chunk 1 size
// 90112 <- chunk 2 size

// 131072 / 1024 = 128 so i guess the default chunk size is 128 bytes. (readableHighWaterMark)
// maybe its different for stdin ? huh

// foot notes: reading code in pipe.js and writing code in append.js.

/*
CHUNK TEXTING CODE FOR PIPE.JS
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        process.stdout.write('we have a chunk: \n');
        console.log(chunk.length);
        process.stdout.write(chunk);
    }
}); */
