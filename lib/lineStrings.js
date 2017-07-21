/* eslint-env node, es6 */
const base = require('./base');

// LENGTH OF LINE (3D)
const lineStringLength = (lineString) => {
  const ls = lineString;
  let length = 0;
  for (let i = 0; i < ls.length - 1; i += 1) {
    length += base.distance(ls[i], ls[i + 1]);
  }
  return length;
};

const pointAlongLineString = (lineString, distance = 0) => {
  if (distance === 0) { return lineString[0]; }

  const ls = lineString;
  const d = distance;

  let a = 0;
  for (let i = 0; i < ls.length - 1; i += 1) {
    a += base.distance(ls[i], ls[i + 1]);
    if (a === d) { return ls[i + 1]; }
    if (a > d) {
      return base.pointFromTwoPoints(ls[i + 1], ls[i], a - d);
    }
  }

  throw new Error('Distance outside of line.');
};

const perpendicularPoints = (line, lineDistance, radius) => {
  const origin = base.pointFromTwoPoints(
    line[0], line[1], lineDistance);
  let angle = base.angle(line[0], line[1]) - 90;
  angle = (angle < 0) ? 360 + angle : angle;
  const left = base.pointFromAngle(origin, radius, angle);
  const right = [
    left[0] + ((-1) * (origin[0] - left[0])),
    left[1] + ((-1) * (origin[1] - left[1])),
  ];

  return [left, right];
};

const shiftLines = (line, radius) => {
  let angle = base.angle(line[0], line[1]) - 90;
  angle = (angle < 0) ? 360 + angle : angle;
  const ls = base.pointFromAngle(line[0], radius, angle);
  const tv = [line[0][0] - ls[0], line[0][1] - ls[1]];
  const tvi = [tv[0] * -1, tv[1] * -1];

  const le = [line[1][0] + tv[0], line[1][1] + tv[1]];
  const rs = [ls[0] + tvi[0], ls[1] + tvi[1]];
  const re = [le[0] + tvi[0], le[1] + tvi[1]];

  return [[ls, le], [rs, re]];
};


module.exports = {
  lineStringLength,
  pointAlongLineString,
  perpendicularPoints,
  shiftLines,
};
