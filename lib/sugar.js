/* eslint-env node, es6 */
const base = require('./base');

// LENGTH OF LINE SEGMENT (3D)
base.segmentLength = lineSegment => base.distance(
  lineSegment[0], lineSegment[1]);

// LENGTH OF LINE (3D)
base.lineStringLength = (lineString) => {
  const ls = lineString;
  let length = 0;
  for (let i = 0; i < ls.length - 1; i += 1) {
    length += base.distance(ls[i], ls[i + 1]);
  }
  return length;
};

base.pointAlongLineString = (lineString, distance = 0) => {
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

base.createCircle = (point, radius, precision = 64) => {
  const s = 360 / precision;
  const a = Array(Math.floor(s));

  for (let i = precision; i > 0; i -= 1) {
    a[i] = base.pointFromAngle(point, radius, (s * i));
  }
  a[a.length - 1] = a[0];

  return a;
};

base.createSectorSlice =
(point, b1, b2, distance, precision = 64) => {
  const lp = 360 / precision;
  const p = point;
  const da = base.angleDifference(b1, b2);
  const di = distance;
  const s = Math.ceil(da / lp);
  const a = Array(s + 2);
  const lsp = da / s;

  a[0] = base.pointFromAngle(p, di, b1);

  for (let i = 1; i < s + 1; i += 1) {
    let na = b1 + ((i + 1) * lsp);
    na = (na > 360) ? 360 - na : na;
    a[i] = base.pointFromAngle(p, di, na);
  }

  a[a.length - 1] = base.pointFromAngle(p, di, b2);
  return a;
};

base.createSector =
(point, b1, b2, distance, precision = 64) => {
  const lp = 360 / precision;
  const p = point;
  const d = base.differenceToAngle(b1, b2);
  const s = Math.ceil(d / lp);
  const a = Array(s + 4);
  const lsp = d / s;

  a[0] = p;
  a[1] = base.pointFromAngle(p, distance, b1);

  for (let i = 2; i < s + 2; i += 1) {
    let na = b1 + ((i + 1) * lsp);
    na = (na > 360) ? 360 - na : na;
    a[i] = base.pointFromAngle(p, distance, na);
  }

  a[a.length - 2] = base.pointFromAngle(p, distance, b2);
  a[a.length - 1] = p;
  return a;
};

base.perpendicularPoints = (line, lineDistance, radius) => {
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

base.shiftLines = (line, radius) => {
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

/* eslint-disable */
// IS A POINT INSIDE A POLYGON
base.inside = (point, polygon, precision = 1e-6) => {
  const x = point[0];
  const y = point[1];

  for (let i = 0; i < polygon.length; i += 1) {
    let j;
    if (i > 0) { j = i - 1; } else { j = polygon.length - 1; }
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];

    if (point[0] === polygon[i][0] && point[1] === polygon[i][1]) {
      return true;
    }

    if (
      polygon[i + 1] &&
      base.pointToLine(point, [polygon[i], polygon[i + 1]], true) < precision
    ) {
      return true;
    }

    const isIntersecting =
      ((yi > y) !== (yj > y)) &&
      ((x < (xj - xi) * (y - yi)) / ((yj - yi) + xi));
    if (isIntersecting) { return true; }
  }

  return false;
};

module.exports = base;
