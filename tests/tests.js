const test = require('tape').test; // eslint-disable-line
const geom = require('./geom');
const farn = require('../lib/farn');

test('2D intersection: Parallel', (t) => {
  const actual = farn.intersect(geom.line1, geom.line5);
  const expected = false;
  t.equal(actual, expected).end(); t.end();
});

test('2D intersection: No intersection on line', (t) => {
  const actual = farn.intersect(geom.line3, geom.line4);
  const expected = false;
  t.equal(actual, expected).end(); t.end();
});

test('2D intersection: Identical lines', (t) => {
  const actual = farn.intersect(geom.line2, geom.line2);
  const expected = false;
  t.equal(actual, expected).end(); t.end();
});

test('2D intersection: At endpoints', (t) => {
  const actual = farn.intersect(geom.line1, geom.line6);
  const expected = [2, 2];
  t.equal(actual, expected).end(); t.end();
});

test('2D intersection: Normal Intersect', (t) => {
  const actual = farn.intersect(geom.line1, geom.line2);
  const expected = [1.6666666666666667, 1.6666666666666667];
  t.equal(actual, expected).end(); t.end();
});
