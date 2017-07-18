/* eslint-disable */
const base = require('./lib/base');
const bufferLine = require('./lib/buffer');

const testLine = [[2, 2], [2, 4], [4, 4]];
console.log(bufferLine(testLine, 1, 64));
