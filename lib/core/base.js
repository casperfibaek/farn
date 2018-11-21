/**
 * Find the intersection point between two lines located on the lines.
 * @name intersect
 * @param {Array<number>} l1 A nested array containing x and y coordinates. Such as: [[0, 0, 0], [2, 2, 0]]
 * @param {Array<number>} l2 A nested array containing x and y coordinates. Such as: [[1, 2, 0], [3, 1, 0]]
 * @returns {(Array<number>|Boolean)} An array containing the intersection or false if no intersection.
 * @example
 * const lineSegment1 = [[0, 0, 0], [2, 2, 0]];
 * const lineSegment2 = [[1, 2, 0], [3, 1, 0]];
 * console.log(intersect(lineSegment1, lineSegment2));
 * // output: [1.6666666666666667, 1.6666666666666667]
 */
function intersect(l1, l2) {
  if ( // Check if the two segments are equal.
    l1[0][0] === l2[0][0] && l1[0][1] === l2[0][1] &&
    l1[1][0] === l2[1][0] && l1[1][1] === l2[1][1]) {
    return false;
  }

  if ( // Check if they intersect at first end.
    (l1[0][0] === l2[0][0] && l1[0][1] === l2[0][1]) ||
    (l1[0][0] === l2[1][0] && l1[0][1] === l2[1][1])) {
    return [l1[0][0], l1[0][1]];
  }

  if ( // Check if they intersect at second end.
    (l1[1][0] === l2[0][0] && l1[1][1] === l2[0][1]) ||
    (l1[1][0] === l2[1][0] && l1[1][1] === l2[1][1])) {
    return [l1[1][0], l1[1][1]];
  }

  const dx1 = l1[1][0] - l1[0][0];
  const dy1 = l1[1][1] - l1[0][1];
  const dx2 = l2[1][0] - l2[0][0];
  const dy2 = l2[1][1] - l2[0][1];

  const denom = (dy2 * dx1) - (dx2 * dy1);
  if (denom === 0) { return false; }

  const dx12 = l1[0][0] - l2[0][0];
  const dy12 = l1[0][1] - l2[0][1];
  const ua = ((dx2 * dy12) - (dy2 * dx12)) / denom;
  const ub = ((dx1 * dy12) - (dy1 * dx12)) / denom;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return [l1[0][0] + (ua * dx1), l1[0][1] + (ua * dy1)];
  }
  return false;
}

/**
 * Finds the distance between two points.
 * @name distance
 * @param {Array<number>} p1 An array containing x and y coordinates. Such as: [0, 0]
 * @param {Array<number>} p2 An array containing x and y coordinates. Such as: [2, 3]
 * @returns {number} The distance between the points in map units.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 3];
 * console.log(distanceTo(point1, point2));
 * // output: 3.7416573867739413
 */
function distance(p1, p2) {
  return Math.sqrt(((p2[0] - p1[0]) ** 2) + ((p2[1] - p1[1]) ** 2));
}

/**
 * Finds the angle between two points. 0-360 system increasing clockwise with north being 0.
 * Returns zero in the case of identical points.
 * @name angle
 * @param {Array<number>} p1 An array containing x and y coordinates. Such as: [0, 0]
 * @param {Array<number>} p2 An array containing x and y coordinates. Such as: [2, 2]
 * @returns {number} Angle between points in radians.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 2];
 * console.log(angle(point1, point2));
 * // output: 45 // now radians
 */
function angle(p1, p2) {
  // If the two points are identical
  if (p1[0] === p2[0] && p1[1] === p2[1]) { return false; }

  let theta = Math.atan2(p1[0] - p2[0], p2[1] - p1[1]);
  if (theta < 0) { theta += Math.PI * 2; }

  return theta;
}

/**
 * Tests if a given point is located on a given line. Only works in 2D.
 * @name isPointOnLine
 * @param {Array<number>} p An array containing x and y coordinates. Such as: [1,1]
 * @param {Array<number>} l A nested array containing x and y coordinates. Such as: [[1,1], [2,2]]
 * @param {Number} [t = Number.EPSILON] The tolerance of the distance between the point and the line. Defaults to Epsilon.
 * @returns {Boolean} True if point is on line within tolerance, false otherwise.
 * @example
 * const point = [1, 1];
 * const line = [[0, 0], [2, 2]];
 * console.log(isPointOnLine(point, line));
 * // output: true
 */
function isPointOnLine(p, l, t = Number.EPSILON) {
  const dy = l[1][1] - l[0][1];
  const dx = l[1][0] - l[0][0];

  if (dx === 0 || dy === 0) { // vertical line
    if (p[0] === l[0][0]) {
      let ymin; let ymax;
      if (l[0][1] >= l[1][1]) {
        ymin = l[1][1];
        ymax = l[0][1];
      } else {
        ymin = l[0][1];
        ymax = l[1][1];
      }
      if (p[1] >= ymin && p[1] <= ymax) { return true; }
    } else if (p[1] === l[0][1]) { // horisontal line
      let xmin; let xmax;
      if (l[0][0] >= l[1][0]) {
        xmin = l[1][0];
        xmax = l[0][0];
      } else {
        xmin = l[0][0];
        xmax = l[1][0];
      }
      if (p[0] >= xmin && p[0] <= xmax) { return true; }
    }
    return false;
  }

  const slope = dy / dx;
  const intercept = l[0][1] - (slope * l[0][0]);
  const on = Math.abs(p[1] - ((slope * p[0]) + intercept));

  return (on <= t) === 1;
}

/**
 * Creates a new point from the angle between two points and a provided distance from the first point.
 * @name pointFromTwoPoints
 * @param {Array<number>} p1 An array containing x and y coordinates. Such as: [0, 0]
 * @param {Array<number>} p2 An array containing x and y coordinates. Such as: [2, 2]
 * @param {number} [d = 0] The distance to the new point. Can be higher than the distance between the two points.
 * @returns {Array<number>} An array containing the x and y coordinates of the new point.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 2];
 * console.log(pointFromTwoPoints(point1, point2, Math.sqrt(3)));
 * // output: [1, 1]
 */
function pointFromTwoPoints(p1, p2, d = 0) {
  if (d === 0) { return p1; }

  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const xy = (dx ** 2) + (dy ** 2);
  const m = Math.sqrt(xy);

  return [
    p1[0] + ((dx / m) * d),
    p1[1] + ((dy / m) * d),
  ];
}

/**
 * Finds a point at the ratio between two points.
 * @name pointFromRatio
 * @param {Array<number>} p1 An array containing x and y coordinates. Such as: [0, 0]
 * @param {Array<number>} p2 An array containing x and y coordinates. Such as: [2, 2]
 * @param {number} r A number between 0 - 1;
 * @returns {Array} A point located at the given ratio between the two points.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 2];
 * console.log(pointFromRatio(point1, point2, 0.5));
 * // output: [1, 1]
 */
function pointFromRatio(p1, p2, r = 0.5) {
  if (r === 0) { return p1; }
  if (r === 1) { return p2; }

  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];

  return [
    p1[0] + (dx * r),
    p1[1] + (dy * r),
  ];
}

/**
 * Creates a new point given a point an angle and a distance.
 * 0-360 system increasing clockwise with north being 0.
 * @name pointFromAngle
 * @param {Array<number>} p An array containing x and y coordinates.
 * @param {number} a A number representing an angle in radians.
 * @param {number} [d = 0] The distance to the new point.
 * @returns {Array} An Array containing x, y and potentially z coordinates.
 * @example
 * const point = [0, 0];
 * const angle = Math.PI / 4;
 * const distance = Math.sqrt(2);
 * console.log(pointFromAngle(point, angle, distance));
 * // output: [1, 1]
 */
function pointFromAngle(p, a, d = 0) {
  return [
    (Math.cos(a) * d) + p[0],
    (Math.sin(a) * d) + p[1],
  ];
}

/**
 * Rotate a point around a custom origin.
 * @name pointFromOriginRotation
 * @param {Array<number>} o An array containing x and y coordinates. Such as: [0, 0]
 * @param {Array<number>} p An array containing x and y coordinates. Such as: [0, 2]
 * @param {number} a A number representing an angle in radians.
 * @returns {Array<number>} A new point rotate according to the provided angle around origin.
 * @example
 * const origin = [0, 0];
 * const point = [0, 2];
 * const angle = Math.PI / 2;
 * console.log(pointRotation(origin, point, angle));
 * // output: [2, 0]
 */
function pointFromOriginRotation(o, p, a) {
  const cos = Math.cos(a);
  const sin = Math.sin(a);

  const nx =
    ((cos * (p[0] - o[0])) +
    (sin * (p[1] - o[1]))) + o[0];

  const ny =
    ((cos * (p[1] - p[1])) -
    (sin * (p[0] - p[0]))) + o[1];

  return [nx, ny];
}

/**
 * Finds the nearest point on a lineSegment from a point.
 * @name nearestPointOnLine
 * @param {Array<number>} p An array containing x and y coordinates. Such as: [1, 1]
 * @param {Array<number>} l An nested array containing x and y coordinates. Such as: [[0, 0], [2, 2]]
 * @returns {Array<number>} The nearest point on the lineSegment.
 * @example
 * const point = [1, 1];
 * const lineSegment = [[0, 0], [2, 2]];
 * console.log(nearestPointOnLine(point, lineSegment);
 * // output: [2.5, 2, 0.5]
 */
function nearestPointOnLine(p, l) {
  const dlx = l[1][0] - l[0][0];
  const dly = l[1][1] - l[0][1];
  const dpx = p[0] - l[0][0];
  const dpy = p[1] - l[0][1];

  const c1 = (dlx * dpx) + (dly * dpy);
  if (c1 <= 0) { return l[0]; }

  const c2 = (dlx ** 2) + (dly ** 2);
  if (c2 <= c1) { return l[1]; }

  const b = c1 / c2;
  const s = [dlx * b, dly * b];

  return [l[0][0] + s[0], l[0][1] + s[1]];
}

/**
 * Calculates the area of a simple polygon.
 * @name area
 * @param {Array<number>} poly A nested array containing x and y coordinates.
 * @returns {number} The area of the polygon.
 * @example
 * const polygon = [[0,0], [0,2], [2,2], [2,0], [0,0]];
 * console.log(area(polygon));
 * // output: 4
 */
function area(poly) {
  let total = 0;

  for (let i = 0; i < poly.length - 1; i += 1) {
    const j = (i === poly.length - 1) ? 0 : i + 1;

    total += (poly[i][0] * poly[j][1]) - (poly[j][0] * poly[i][1]);
  }

  return Math.abs(total) / 2;
}

/**
 * Calculates the bounding box of a polygon.
 * @name bbox
 * @param {Array<number>} polygon A nested array containing x and y coordinates.
 * @returns {Array<number>} A nested array containing the bounding box. As: [Xmin, Ymin, Xmax, Ymax]
 * @example
 * const polygon = [[0,0], [0,3], [2,2], [1,0], [0,0]];
 * console.log(bbox(polygon));
 * // output: [0, 0, 2, 3]
 */
function bbox(poly) {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (let i = 0; i < poly.length - 1; i += 1) {
    if (b[0] > poly[i][0]) { b[0] = poly[i][0]; }
    if (b[1] > poly[i][1]) { b[1] = poly[i][1]; }
    if (b[2] < poly[i][0]) { b[2] = poly[i][0]; }
    if (b[3] < poly[i][1]) { b[3] = poly[i][1]; }
  }
  return b;
}

/**
 * Calculates the length of a linestring.
 * @name lineStringLength
 * @param {Array<number>} ls A nested array containing x and y coordinates.
 * @returns {number} The distance in the same units as the input.
 * @example
 * const polygon = [[0,0], [0,3], [2,2], [1,0]];
 * console.log(lineStringLength(polygon));
 * // output: length // TODO
 */
function lineStringLength(ls) {
  let length = 0;
  for (let i = 0; i < ls.length - 1; i += 1) {
    length += distance(ls[i], ls[i + 1]);
  }
  return length;
}

/**
 * Creates a new point at a supplied distance along a linestring.
 * Extrapolates from the last two points if the distance supplied is longer than the length of the linestring.
 * @name pointAlongLineString
 * @param {Array<number>} ls A nested array containing x and y coordinates.
 * @param {number} [d = 0] The distance to the new point.
 * @returns {Array<number>} A new point at the supplied distance along the linestring.
 * @example
 * const polygon = [[0,0], [0,3], [2,2], [1,0]];
 * console.log(lineStringLength(polygon));
 * // output: length // TODO
 */
function pointAlongLineString(ls, d = 0) {
  if (d === 0) { return ls[0]; }

  let a = 0;
  for (let i = 0; i < ls.length - 1; i += 1) {
    a += distance(ls[i], ls[i + 1]);
    if (a === d) { return ls[i + 1]; }
    if (a > d) {
      return pointFromTwoPoints(ls[i + 1], ls[i], a - d);
    }
  }
  return pointFromTwoPoints(ls[ls.length - 2], ls[ls.length - 1]);
}

function perpendicularPoints(line, lineDistance, distance) {
  const origin = pointFromTwoPoints(
    line[0],
    line[1],
    lineDistance,
  );
  const left = pointFromAngle(
    origin,
    distance,
    angle(line[0], line[1]) - (0.5 * Math.PI),
  );
  const right = [
    left[0] + ((-1) * (origin[0] - left[0])),
    left[1] + ((-1) * (origin[1] - left[1])),
  ];

  return [left, right];
}

function shiftLines(line, distance) {
  const ls = pointFromAngle(
    line[0],
    distance,
    angle(line[0], line[1]) - (0.5 * Math.PI),
  );
  const tv = [line[0][0] - ls[0], line[0][1] - ls[1]];
  const tvi = [tv[0] * -1, tv[1] * -1];

  const le = [line[1][0] + tv[0], line[1][1] + tv[1]];
  const rs = [ls[0] + tvi[0], ls[1] + tvi[1]];
  const re = [le[0] + tvi[0], le[1] + tvi[1]];

  return [[ls, le], [rs, re]];
}

function shiftLeft(line, distance) {
  const ls = pointFromAngle(
    line[0],
    distance,
    angle(line[0], line[1]) - (0.5 * Math.PI),
  );
  const tv = [line[0][0] - ls[0], line[0][1] - ls[1]];
  const le = [line[1][0] + tv[0], line[1][1] + tv[1]];

  return [ls, le];
}

function shiftRight(line, distance) {
  const rs = pointFromAngle(
    line[0],
    distance,
    angle(line[0], line[1]) + (0.5 * Math.PI),
  );
  const tv = [line[0][0] - rs[0], line[0][1] - rs[1]];
  const re = [line[1][0] + tv[0], line[1][1] + tv[1]];

  return [rs, re];
}

function isPointInsidePolygon(point, polygon, precision) {
  const x = point[0];
  const y = point[1];

  for (let i = 0; i < polygon.length; i += 1) {
    const j = (i > 0) ? i - 1 : polygon.length - 1;
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];

    if (point[0] === polygon[i][0] && point[1] === polygon[i][1]) {
      return true;
    }

    const isIntersecting =
      ((yi > y) !== (yj > y)) &&
      ((x < (xj - xi) * (y - yi)) / ((yj - yi) + xi));

    if (isIntersecting) { return true; }

    if (
      precision &&
      polygon[i + 1] &&
      isPointOnLine([polygon[i], polygon[i + 1]], point, true) < precision // TODO: CHECK
    ) {
      return true;
    }
  }

  return false;
}

function createSectorSlice(point, b1, b2, distance, precision = 24) {
  const ad = Math.min(
    (2 * Math.PI) - Math.abs(b1 - b2), Math.abs(b1 - b2));
  const nodes = Math.ceil(ad / (Math.PI * 2) / precision);
  const rads = ad / (nodes + 1);

  const cl = nodes + 2;
  const coords = Array(cl);
  coords[0] = [
    (Math.cos(b1) * distance) + point[0],
    (Math.sin(b1) * distance) + point[1],
  ];
  coords[cl - 1] = [
    (Math.cos(b2) * distance) + point[0],
    (Math.sin(b2) * distance) + point[1],
  ];

  for (let i = 1; i + 1 < cl; i += 1) {
    const a = b1 + (rads * i);
    coords[i] = [
      (Math.cos(a) * distance) + point[0],
      (Math.sin(a) * distance) + point[1],
    ];
  }

  return coords;
}

function createSector(point, b1, b2, distance, precision = 24) {
  const bx = Math.abs(b1 - b2);
  const ad = Math.min((2 * Math.PI) - bx, bx);
  const nodes = Math.ceil(ad / (Math.PI * 2) / precision);
  const rads = ad / (nodes + 1);

  const cl = nodes + 4;
  const coords = Array(cl);
  coords[0] = point;
  coords[1] = [
    (Math.cos(b1) * distance) + point[0],
    (Math.sin(b1) * distance) + point[1],
  ];
  coords[cl - 2] = [
    (Math.cos(b2) * distance) + point[0],
    (Math.sin(b2) * distance) + point[1],
  ];
  coords[cl - 1] = point;

  let t = 1;
  for (let i = 2; i + 2 < cl; i += 1) {
    const a = b1 + (rads * t);
    coords[i] = [
      (Math.cos(a) * distance) + point[0],
      (Math.sin(a) * distance) + point[1],
    ];
    t += 1;
  }

  return coords;
}

function createCircle(point, radius, precision = 24) {
  const coords = Array(precision + 1);
  for (let i = 0; i < precision; i += 1) {
    const angle = (i / (precision / 2)) * Math.PI;
    const x = point[0] - (radius * Math.cos(angle));
    const y = point[1] - (radius * Math.sin(angle));
    coords[i] = [x, y];
  }
  coords[coords.length - 1] = point;
  return coords;
}

module.exports = {
  distance,
  angle,
  intersect,
  isPointOnLine,
  isPointInsidePolygon,
  bbox,
  area,
  nearestPointOnLine,
  pointFromAngle,
  pointFromRatio,
  pointFromTwoPoints,
  pointFromOriginRotation,
  lineStringLength,
  pointAlongLineString,
  perpendicularPoints,
  shiftLines,
  shiftLeft,
  shiftRight,
  createSector,
  createSectorSlice,
  createCircle,
};
