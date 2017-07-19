/* eslint-disable */
const base = require('./lib/base');
const bufferLine = require('./lib/buffer');

// const testLine = [[2, 2], [2, 4], [4, 4]];
// console.log(bufferLine(testLine, 1, 64));

const ls = [[0,0], [2,0], [2,2], [4,4]];
const length = base.lineStringLength(ls);
console.log(length);
const test = base.pointAlongLineString(ls, length)
console.log(test);
