console.log("Hello");

// console.log(document);
// console.log(window);

const double = (n) => n * 2;
const [, , n] = process.argv;
// console.log(double(n));

// console.log(global);

// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv);

const add = (n1, n2) => n1 + n2;

const [, , n1, n2] = process.argv;
console.log(add(+n1, +n2));
