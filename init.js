/* eslint-disable */
const base = require('./lib/base');
const bufferLine = require('./lib/buffer');

const testLine = [[2, 2], [2, 4], [4, 4]];
console.log(bufferLine(testLine, 1, 64));


var b = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,45,46,19,5,10,0,88,100];

function dA(a) {
  var r = Array(a.length);
  for (var i = 0; i < (r.length / 2); i += 1) {
    var j = r.length - (1 + i);
    r[i] = a[i] ** 2;
    r[j] = a[j] ** 2;
  }
  return r
}

dA(b);

function dB(a) {
  var r = Array(a.length);
  for (var i = 0; i < a.length; i += 1) {
    r[i] = a[i] ** 2;
  }
  return r;
}

dB(b);
