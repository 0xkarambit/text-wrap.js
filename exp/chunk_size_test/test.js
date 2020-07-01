process.stdin.pipe(process.stdout).on("finish", () => {
	console.log("done!");
});

// but this is able to handle susequent inputs. hmmm

// on ('finish') doesnt work on stdout ? maybe its because of srdout
// echo -n "some restricted input " | node ./exp/chunk_size_test/test.js DIDNT WORK EITHER

// ref
// streamFmt.js

// 7/1/2020 10:43 pm
// oh 128 is the capacity of 1 chunk and our file size is also exactly 128kb
// so it can fit in a single chunk.

// double the file size.
// now size is 262144
// RUn it again.
