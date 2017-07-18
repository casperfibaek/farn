/* eslint-env node, es6 */
const base = require('./base');

// LENGTH OF LINE SEGMENT (3D)
base.segmentLength = line => base.distance(line[0], line[1]);

// Line intersection (not on segment)

// LENGTH OF LINE (3D)
base.lineLength = (line) => {
  let length = 0;
  for (let i = 0; i < line.length - 1; i += 1) {
    length += base.distance(line[0], line[0 + 1]);
  }
  return length;
};

// FIND POINT ALONG LINE (2D)
base.pointAlongLine = (line, distance = 0) => {
  const segmentLength = base.segmentLength(line);
  if (distance > segmentLength || distance < 0) {
    return false;
  }
  if (segmentLength === distance) { return line[1]; }
  if (segmentLength === 0) { return line[0]; }
  return base.pointFromTwoPoints(line[0], line[1], distance);
};

base.createCircle = (point, radius, precision = 64) => {
  const arr = [];
  const slice = 360 / precision;
  for (let i = precision; i > 0; i -= 1) {
    arr.push(base.pointFromPointAngle(point, radius, (slice * i)));
  }
  arr.push(arr[0]);
  return arr;
};

base.createSectorSlice =
(point, b1, b2, distance, precision = 64) => {
  const arr = [];
  let lp = 360 / precision;
  const diff = base.differenceToAngle(b1, b2);
  const slices = Math.ceil(diff / lp);
  lp = diff / slices;
  arr.push(base.pointFromPointAngle(point, distance, b1));
  for (let i = 0; i < slices; i += 1) {
    const nd = base.parseDegree(b1 + ((i + 1) * lp));
    arr.push(
      base.pointFromPointAngle(point, distance, nd));
  }
  arr.push(base.pointFromPointAngle(point, distance, b2));
  return arr;
};

base.createSector =
(point, b1, b2, distance, precision = 64) => {
  const arr = [point];
  let lp = 360 / precision;
  const diff = base.differenceToAngle(b1, b2);
  const slices = Math.ceil(diff / lp);
  lp = diff / slices;
  arr.push(base.pointFromPointAngle(point, distance, b1));
  for (let i = 0; i < slices; i += 1) {
    const nd = base.parseDegree(b1 + ((i + 1) * lp));
    arr.push(
      base.pointFromPointAngle(point, distance, nd));
  }
  arr.push(base.pointFromPointAngle(point, distance, b2));
  arr.push(point);
  return arr;
};

base.perpendicularPoint = (line, lineDistance, radius, boolean) => {
  const angle = base.angle(line[0], line[1]);
  const origin = base.pointAlongLine(line, lineDistance);
  const left = base.pointFromPointAngle(origin, radius, base.parseDegree(angle - 90));
  const right = base.pointFromPointAngle(origin, radius, base.parseDegree(angle + 90));
  if (boolean === true) { return left; }
  if (boolean === false) { return right; }
  return [left, right];
};

base.shiftLine = (line, radius, boolean) => {
  const start = base.perpendicularPoint(line, 0, radius);
  const end = base.perpendicularPoint(line, base.segmentLength(line), radius);
  const left = [start[0], end[0]];
  if (boolean === true) { return left; }
  const right = [start[1], end[1]];
  if (boolean === false) { return right; }
  return [[start[0], end[0]], [start[1], end[1]]];
};

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
