/* eslint-disable */
const test = require('tape').test;
const base = require('../core/base');

const lineSegment1 = [[0, 0, 0], [2, 2, 0]];
const lineSegment2 = [[1, 2, 0], [3, 1, 0]];
const lineSegment3 = [[4, 4, 0], [6, 6, 0]];
const lineSegment4 = [[3, 4, 0], [5, 3, 0]];
const lineSegment5 = [[0, 2, 0], [2, 4, 0]];
const lineSegment6 = [[2, 2, 0], [4, 4, 0]];

const point1 = [[0, 0], [2, 2]];
const point2 = [[1, 2], [3, 1]];
const point3 = [[2, 2, 0], [2, 2, 0]];
const point4 = [[1, 2, 0], [3, 1, 0]];

const poly1 = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]];
const poly2 = [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]];
const poly3 = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 0]];
const poly4 = [[0, 0, 0], [0, 1, 0], [1, 1, 0], [1, 0, 0], [0, 0, 0]];

test('2D intersection: Parallel', function(t) {
  const actual = base.intersect(lineSegment1, lineSegment5);
  const expected = false;
  t.equal(actual, expected);
  t.end();
});

test('2D intersection: No intersection on line', function(t) {
  const actual = base.intersect(lineSegment3, lineSegment4);
  const expected = false;
  t.equal(actual, expected);
  t.end();
});

test('2D intersection: Identical lines', function(t) {
  const actual = base.intersect(lineSegment2, lineSegment2);
  const expected = false;
  t.equal(actual, expected);
  t.end();
});

test('2D intersection: At endpoints', function(t) {
  const actual = base.intersect(lineSegment1, lineSegment6);
  const expected = [2, 2];
  t.deepEqual(actual, expected);
  t.end();
});

test('2D intersection: Normal Intersect', function(t) {
  const actual = base.intersect(lineSegment1, lineSegment2);
  const expected = [1.6666666666666667, 1.6666666666666667];
  t.deepEqual(actual, expected);
  t.end();
});
