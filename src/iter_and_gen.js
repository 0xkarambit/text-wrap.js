// generator

function* gen() {
	for (let i = 0; i < Infinity; ++i) {
		yield i;
	}
}
// const new_gen = gen();
// new_gen.next() <- returns yield values.
// can be used with for..of loop
// and can also be used to make readable streams
