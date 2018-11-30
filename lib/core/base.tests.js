const { test } = require('tape'); // eslint-disable-line
const {
  distance,
  angle,
  pointFromTwoPoints,
  pointFromRatio,
  pointFromAngle,
  pointRotation,
} = require('../core/base');
const geom = require('../../tests/geom');
const floatTolerance = Number.EPSILON * 2;

test('distance (simple)', (t) => {
  const actual = distance(geom.point5, geom.point2);
  const expected = 1;
  t.equal(actual, expected);
  t.end();
});

test('distance (cross)', (t) => {
  const actual = distance(geom.point5, geom.point1);
  const expected = Math.sqrt(2);
  t.equal(actual, expected);
  t.end();
});

test('distance (longCross)', (t) => {
  const actual = distance(geom.point9, geom.point1);
  const expected = 2 * Math.sqrt(2);
  t.equal(actual, expected);
  t.end();
});

test('distance (longCross reverse)', (t) => {
  const actual = distance(geom.point1, geom.point9);
  const expected = 2 * Math.sqrt(2);
  t.equal(actual, expected);
  t.end();
});

test('distance (all negative)', (t) => {
  const actual = distance(geom.point7, geom.point9);
  const expected = 2;
  t.equal(actual, expected);
  t.end();
});

test('angle (identical)', (t) => {
  const actual = angle(geom.point5, geom.point5);
  const expected = 0;
  t.equal(actual, expected);
  t.end();
});

test('angle (east)', (t) => {
  const actual = angle(geom.point5, geom.point2);
  const expected = 0;
  t.equal(actual, expected);
  t.end();
});

test('angle (north)', (t) => {
  const actual = angle(geom.point5, geom.point4);
  const expected = Math.PI / 2;
  t.equal(actual, expected);
  t.end();
});

test('angle (west)', (t) => {
  const actual = angle(geom.point5, geom.point8);
  const expected = Math.PI;
  t.equal(actual, expected);
  t.end();
});

test('angle (south)', (t) => {
  const actual = angle(geom.point5, geom.point6);
  const expected = -1 * (Math.PI / 2);
  t.equal(actual, expected);
  t.end();
});

test('pointFromTwoPoints (same, 0 distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point5, 0);
  const expected = geom.point5;
  t.equal(actual, expected);
  t.end();
});

test('pointFromTwoPoints (same, 1 distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point5, 1);
  const expected = geom.point5;
  t.equal(actual, expected);
  t.end();
});

test('pointFromTwoPoints (east, 1 distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point2, 1);
  const expected = geom.point2;
  t.same(actual, expected);
  t.end();
});

test('pointFromTwoPoints (east, 2 distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point2, 2);
  const expected = [2, 0];
  t.same(actual, expected);
  t.end();
});

test('pointFromTwoPoints (north, 2 distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point4, 2);
  const expected = [0, 2];
  t.same(actual, expected);
  t.end();
});

test('pointFromTwoPoints (west, 2 distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point8, 2);
  const expected = [-2, 0];
  t.same(actual, expected);
  t.end();
});

test('pointFromTwoPoints (west, 2 negative distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point8, -2);
  const expected = [2, 0];
  t.same(actual, expected);
  t.end();
});

test('pointFromTwoPoints (south, 2 distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point6, 2);
  const expected = [0, -2];
  t.same(actual, expected);
  t.end();
});

test('pointFromTwoPoints (south, 2 negative distance)', (t) => {
  const actual = pointFromTwoPoints(geom.point5, geom.point6, -2);
  const expected = [0, 2];
  t.same(actual, expected);
  t.end();
});

test('pointFromRatio (same, ratio 0)', (t) => {
  const actual = pointFromRatio(geom.point5, geom.point5, 0);
  const expected = geom.point5;
  t.same(actual, expected);
  t.end();
});

test('pointFromRatio (same, ratio 0.5)', (t) => {
  const actual = pointFromRatio(geom.point5, geom.point5, 0.5);
  const expected = geom.point5;
  t.same(actual, expected);
  t.end();
});

test('pointFromRatio (same, ratio 1)', (t) => {
  const actual = pointFromRatio(geom.point5, geom.point5, 1);
  const expected = geom.point5;
  t.same(actual, expected);
  t.end();
});

test('pointFromRatio (east, ratio 1)', (t) => {
  const actual = pointFromRatio(geom.point5, geom.point2, 1);
  const expected = geom.point2;
  t.same(actual, expected);
  t.end();
});

test('pointFromRatio (east, ratio 2)', (t) => {
  const actual = pointFromRatio(geom.point5, geom.point2, 2);
  const expected = [2, 0];
  t.same(actual, expected);
  t.end();
});

test('pointFromRatio (east, ratio -1)', (t) => {
  const actual = pointFromRatio(geom.point5, geom.point2, -1);
  const expected = [-1, 0];
  t.same(actual, expected);
  t.end();
});

test('pointFromRatio (southwest, ratio -1)', (t) => {
  const actual = pointFromRatio(geom.point5, geom.point9, -1);
  const expected = geom.point1;
  t.same(actual, expected);
  t.end();
});

test('pointFromAngle (Center, Math.PI, 1)', (t) => {
  const actual = pointFromAngle(geom.point5, Math.PI, 1);
  const expected = geom.point8; // West
  const xd = (Math.abs(expected[0] - actual[0]) < Number.EPSILON * 2);
  const yd = (Math.abs(expected[1] - actual[1]) < Number.EPSILON * 2);

  t.equal((xd && yd), true);
  t.end();
});

test('pointFromAngle (Center, 2 * Math.PI, 1)', (t) => {
  const actual = pointFromAngle(geom.point5, 2 * Math.PI, 1);
  const expected = geom.point2; // East
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointFromAngle (Center, 2 * Math.PI, -1)', (t) => {
  const actual = pointFromAngle(geom.point5, 2 * Math.PI, -1);
  const expected = geom.point8; // West

  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointFromAngle (Center, (3 * Math.PI) / 2, 1)', (t) => {
  const actual = pointFromAngle(geom.point5, (3 * Math.PI) / 2, 1);
  const expected = geom.point6; // South
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointRotation([1, 0], [0, 0], 0)', (t) => {
  const actual = pointRotation(geom.point2, geom.point5, 0);
  const expected = geom.point2;
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointRotation([1, 0], [0, 0], Math.PI / 2)', (t) => {
  const actual = pointRotation(geom.point2, geom.point5, Math.PI / 2);
  const expected = geom.point6;
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointRotation([1, 0], [0, 0], Math.PI)', (t) => {
  const actual = pointRotation(geom.point2, geom.point5, Math.PI);
  const expected = geom.point8;
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointRotation([1, 0], [0, 0], 1.5 * Math.PI)', (t) => {
  const actual = pointRotation(geom.point2, geom.point5, 1.5 * Math.PI);
  const expected = geom.point4;
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointRotation([1, 0], [0, 0], 2 * Math.PI)', (t) => {
  const actual = pointRotation(geom.point2, geom.point5, 2 * Math.PI);
  const expected = geom.point2;
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});

test('pointRotation([1, 1], [1, 1], Math.PI)', (t) => {
  const actual = pointRotation(geom.point1, geom.point1, Math.PI);
  const expected = geom.point1;
  const xd = (Math.abs(expected[0] - actual[0]) < floatTolerance);
  const yd = (Math.abs(expected[1] - actual[1]) < floatTolerance);

  t.equal((xd && yd), true);
  t.end();
});