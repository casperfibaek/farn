/* eslint-disable */
const test = require('tape').test;
const base = require('../core/base');
const circles = require('../core/circles');

const bob = circles.createSectorSlice([0,0], Math.PI * 0.5, Math.PI, 1, 10);
console.log(bob);
const bob1 = circles.createSector([0,0], Math.PI * 0.5, Math.PI, 1, 10);
console.log(bob1);

/*
test('create sector', function(t) {
  const actual = base.intersect(lineSegment1, lineSegment5);
  const expected = false;
  t.equal(actual, expected);
  t.end();
});
*/
