/* eslint-disable */
const test = require('tape').test;
const buffer = require('../operations/buffer');

const bob = [[0,0], [2,0], [2,2], [4,4]];
const buf = buffer(bob, 1, 10);

console.log(buf);
