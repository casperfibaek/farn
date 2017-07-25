/* eslint-env node, es6 */
/**
 * Find the intersection point between two lines located on the lines.
 * If the boolean is passed returns true for intersection and false for no intersection.
 * @name intersect
 * @param {Array} lineSegment1 A nested Array containing x, y and potentially z coordinates.
 * The z-coordinated is ignored. Example: [[2, 2, 0], [0, 0, 0]]
 * @param {Array} lineSegment2 A nested Array containing x, y and optionally z.
 * The z-coordinated is ignored. Example: [[0, 0, 0], [2, 2, 0]]
 * @returns {Array} An Array containing the intersection or false if no intersection.
 * @example
 * const lineSegment1 = [[0, 0, 0], [2, 2, 0]];
 * const lineSegment2 = [[1, 2, 0], [3, 1, 0]];
 * console.log(intersect(lineSegment1, lineSegment2));
 * // output: [1.6666666666666667, 1.6666666666666667]
 */
function intersect(lineSegment1, lineSegment2) {
  const l1 = lineSegment1;
  const l2 = lineSegment2;
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

  const dx2 = l2[1][0] - l2[0][0];
  const dy2 = l2[1][1] - l2[0][1];
  const dx1 = l1[1][0] - l1[0][0];
  const dy1 = l1[1][1] - l1[0][1];

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

// From Paul Bourke: http://paulbourke.net/geometry/pointlineplane/
function intersect3D(lineSegment1, lineSegment2) {
  const p1 = lineSegment1[0];
  const p2 = lineSegment1[1];
  const p3 = lineSegment2[0];
  const p4 = lineSegment2[1];

  if (
    p1.length === 2 || p2.length === 2 ||
    p3.length === 2 || p4.length === 2) {
    return intersect(lineSegment1, lineSegment2);
  }

  if (p1[2] === p2[2] && p1[2] === p3[2] && p1[2] === p4[2]) {
    const dx1 = p2[0] - p1[0];
    const dx2 = p4[0] - p3[0];
    const dy1 = p2[1] - p1[1];
    const dy2 = p4[1] - p3[1];

    const denom = (dy2 * dx1) - (dx2 * dy1);
    if (denom === 0) { return false; }

    const dx12 = p1[0] - p3[0];
    const dy12 = p1[1] - p3[1];
    const ua = ((dx2 * dy12) - (dy2 * dx12)) / denom;

    return [
      p1[0] + (ua * dx1),
      p1[1] + (ua * dy1),
      p1[2],
    ];
  }

  const p13 = [(p1[0] - p3[0]), (p1[1] - p3[1]), (p1[2] - p3[2])];
  const p43 = [(p4[0] - p3[0]), (p4[1] - p3[1]), (p4[2] - p3[2])];
  const p43s = (p43[0] ** 2) + (p43[1] ** 2) + (p43[2] ** 2);

  if (Math.sqrt(p43s) < Number.EPSILON) { return false; }

  const p21 = [(p2[0] - p1[0]), (p2[1] - p1[1]), (p2[2] - p1[2])];
  const p21s = (p21[0] ** 2) + (p21[1] ** 2) + (p21[2] ** 2);

  if (Math.sqrt(p21s) < Number.EPSILON) { return false; }

  const d1343 = (p13[0] * p43[0]) + (p13[1] * p43[1]) + (p13[2] * p43[2]);
  const d4321 = (p43[0] * p21[0]) + (p43[1] * p21[1]) + (p43[2] * p21[2]);
  const d1321 = (p13[0] * p21[0]) + (p13[1] * p21[1]) + (p13[2] * p21[2]);

  const denom = (p21s * p43s) - (d4321 ** 2);

  if (Math.abs(denom) < Number.EPSILON) { return false; }

  const mua = ((d1343 * d4321) - (d1321 * p43s)) / denom;
  const mub = (d1343 + (d4321 * (mua))) / p43s;

  const l1 = [
    (p1[0] + (mua * p21[0])),
    (p1[1] + (mua * p21[1])),
    (p1[2] + (mua * p21[2]))];

  const l2 = [
    (p3[0] + (mub * p43[0])),
    (p3[1] + (mub * p43[1])),
    (p3[2] + (mub * p43[2]))];

  if (l1[0] === l2[0] && l1[1] === l2[1] && l1[2] === l2[2]) {
    return l1;
  }

  return [l1, l2];
}

/**
 * Finds the distance between two points.
 * @name distanceTo
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {Array} point2 An Array containing x, y and optionally z coordinates.
 * @returns {number} The distance between the points in map units.
 * @example
 * const point1 = [0, 0, 0];
 * const point2 = [2, 3, 1];
 * console.log(distanceTo(point1, point2));
 * // output: 3.7416573867739413
 */
function distanceTo(point1, point2) {
  const p1 = point1;
  const p2 = point2;

  if (p1[2] && p2[2]) {
    return Math.sqrt(
      ((p2[0] - p1[0]) ** 2) +
      ((p2[1] - p1[1]) ** 2) +
      ((p2[2] - p1[2]) ** 2));
  }
  return Math.sqrt(
    ((p2[0] - p1[0]) ** 2) +
    ((p2[1] - p1[1]) ** 2));
}

/**
 * Finds the angle between two points. 0-360 system increasing clockwise with north being 0.
 * The z-coordinate is ignored.
 * @name angleTo
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {Array} point2 An Array containing x, y and optionally z coordinates.
 * @returns {number} Angle between points.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 2];
 * console.log(angle(point1, point2));
 * // output: 45 // now radians
 */
function angleTo(point1, point2) {
  const p1 = point1;
  const p2 = point2;

  if (p1[0] === p2[0] && p1[1] === p2[1]) { return false; }
  let theta = Math.atan2(p1[0] - p2[0], p2[1] - p1[1]);
  if (theta < 0) { theta += Math.PI * 2; }

  return theta;
}

/**
 * Creates a new point from the angle between two points and a provided distance.
 * @name pointFromTwoPoints
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {Array} point2 An Array containing x, y and optionally z coordinates.
 * @param {number} [distance = 0] distance The distance to the new point.
 * Can be higher than distance between the two points.
 * @returns {Array} An Array containing x, y and potentially z coordinates.
 * @example
 * const point1 = [0, 0, 0];
 * const point2 = [2, 2, 2];
 * console.log(pointFromTwoPoints(point1, point2, Math.sqrt(3)));
 * // output: [1, 1, 1]
 */
function pointFromTwoPoints(point1, point2, distance = 0) {
  if (distance === 0) { return point1; }

  const p1 = point1;
  const p2 = point2;
  const dx = (p2[0] - p1[0]);
  const dy = (p2[1] - p1[1]);
  const xy = (dx ** 2) + (dy ** 2);
  let m;

  if (p1.length === 2 || p2.length === 2) {
    m = Math.sqrt(xy);
    return [
      p1[0] + ((dx / m) * distance),
      p1[1] + ((dy / m) * distance),
    ];
  }

  m = Math.sqrt(xy + ((point2[2] - point1[2]) ** 2));
  return [
    p1[0] + ((dx / m) * distance),
    p1[1] + ((dy / m) * distance),
    p1[2] + (((p2[2] - p1[2]) / m) * distance),
  ];
}

/**
 * Finds a point at ratio distance between two points.
 * @name pointFromRatio
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {Array} point2 An Array containing x, y and optionally z coordinates.
 * @param {number} ratio A number between 0 - 1;
 * @returns {Array} A point located at the ratio.
 * @example
 * const point1 = [0, 0, 0];
 * const point2 = [2, 2, 2];
 * console.log(pointFromRatio(point1, point2, 0.5));
 * // output: [1, 1, 1]
 */
function pointFromRatio(point1, point2, ratio) {
  if (ratio === 0) { return point1; }
  if (ratio === 1) { return point2; }

  const p1 = point1;
  const p2 = point2;
  const r = ratio;
  const dx = (p2[0] - p1[0]);
  const dy = (p2[1] - p1[1]);

  if (p1.length === 2 || p2.length === 2) {
    return [
      p1[0] + (dx * r),
      p1[1] + (dy * r),
    ];
  }

  return [
    p1[0] + (dx * r),
    p1[1] + (dy * r),
    p1[2] + ((p2[2] - p1[2]) * r),
  ];
}

/**
 * Creates a new point given a point an angle and a distance.
 * 0-360 system increasing clockwise with north being 0.
 * @name pointFromAngle
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {number} distance The distance to the new point.
 * @param {number} angle A number representing an angle in radians.
  North is 0 and it increases clockwise.
 * @returns {Array} An Array containing x, y and potentially z coordinates.
 * @example
 * const point = [0, 0, 0];
 * const angle = 45;
 * const distance = Math.sqrt(2);
 * console.log(pointFromAngle(point, angle, Math.sqrt(2)));
 * // output: [1, 1, 0]
 */
function pointFromAngle(point, angle, distance = 0) {
  const p = point;
  const a = angle;
  if (p.length === 3) {
    return [
      (Math.cos(a) * distance) + p[0],
      (Math.sin(a) * distance) + p[1],
      p[2],
    ];
  }
  return [
    (Math.cos(a) * distance) + point[0],
    (Math.sin(a) * distance) + point[1],
  ];
}

/**
 * Finds the smallest difference between two angles.
 * @name angleDifference
 * @param {number} angle1 A number representing an angle between 0-360;
 * @param {number} angle2 A number representing an angle between 0-360;
 * @returns {number} The smallest difference between the two
 * @example
 * const angle1 = 270
 * const angle2 = 10
 * console.log(angleDifference(angle1, angle2));
 * // output: 100
 */
function angleDifference(angle1, angle2) {
  return Math.min(
    (2 * Math.PI) - Math.abs(angle1 - angle2),
    Math.abs(angle1 - angle2),
  );
}

/**
 * Rotate a point around the z-axis and a custom origin
 * @name pointRotation
 * @param {Array} origin An Array containing x, y and optionally z coordinates.
 * @param {Array} point An Array containing x, y and optionally z coordinates.
 * @param {number} angle A number representing an angle between 0-360;
 * @returns {Array} A new point rotate according to the provided angle around origin.
 * @example
 * const origin = [0, 0];
 * const point = [0, 2, 1];
 * const angle = 90;
 * console.log(pointRotation(origin, point, angle));
 * // output: [2, 0, 1]
 */
function pointRotation(origin, point, angle) {
  const o = origin;
  const p = point;
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const nx =
    ((cos * (p[0] - o[0])) +
    (sin * (p[1] - o[1]))) + o[0];

  const ny =
    ((cos * (p[1] - p[1])) -
    (sin * (p[0] - p[0]))) + o[1];

  if (p.length === 3) { return [nx, ny, p[2]]; }

  return [nx, ny];
}

/**
 * Finds the nearest point on a lineSegment from a point.
 * Will do the calculation in 3D if provided 3D coordinates.
 * @name nearestPoint
 * @param {Array} point An Array containing x, y and optionally z coordinates.
 * @param {Array} lineSegment A nested Array containing x, y and optionally z.
 * Example: [[0, 0, 0], [2, 2, 0]]
 * @returns {Array} The nearest point on the lineSegment.
 * @example
 * const point = [3, 2, 0];
 * const lineSegment = [[2, 2, 1], [4, 2, 2]];
 * console.log(nearestPoint(point, lineSegment);
 * // output: [2.5, 2, 0.5]
 */
function nearestPoint(point, lineSegment) {
  const p = point;
  const l = lineSegment;
  const dlx = l[1][0] - l[0][0];
  const dly = l[1][1] - l[0][1];
  const dpx = p[0] - l[0][0];
  const dpy = p[1] - l[0][1];
  let c1;
  let c2;
  let b;
  let s;

  if (p.length === 2 || l[0].length === 2 || l[1].length === 2) {
    c1 = (dlx * dpx) + (dly * dpy);
    if (c1 <= 0) { return l[0]; }

    c2 = (dlx ** 2) + (dly ** 2);
    if (c2 <= c1) { return l[1]; }

    b = c1 / c2;
    s = [dlx * b, dly * b];

    return [l[0][0] + s[0], l[0][1] + s[1]];
  }

  const dlz = l[1][2] - l[0][2];
  const dpz = p[2] - l[0][2];

  c1 = (dlx * dpx) + (dly * dpy) + (dlz * dpz);
  if (c1 <= 0) { return l[0]; }

  c2 = (dlx ** 2) + (dly ** 2) + (dlz ** 2);
  if (c2 <= c1) { return l[1]; }

  b = c1 / c2;
  s = [dlx * b, dly * b, dlz * b];

  return [l[0][0] + s[0], l[0][1] + s[1], l[0][2] + s[2]];
}

/**
 * Calculates the area of a simple polygon. Does not work for complex polygons.
 * @name area
 * @param {Array} polygon An array containing x, y and optionally z coordinates.
 * @returns {number} The distance between the points in map units.
 * @example
 * const polygon = [[0,0], [0,2], [2,2], [2,0], [0,0]];
 * console.log(area(polygon));
 * // output: 4
 */
function area(polygon) {
  const a = polygon;
  let total = 0;

  for (let i = 0; i < a.length - 1; i += 1) {
    const j = (i === a.length - 1) ? 0 : i + 1;
    total += (a[i][0] * a[j][1]) - (a[j][0] * a[i][1]);
  }

  return Math.abs(total) / 2;
}

/**
 * Calculates the bounding box of a polygon. ([Xmin, Ymin, Xmax, Ymax])
 * @name bbox
 * @param {Array} polygon An array containing x, y and optionally z coordinates.
 * @returns {number} The distance between the points in map units.
 * @example
 * const polygon = [[0,0], [0,3], [2,2], [1,0], [0,0]];
 * console.log(bbox(polygon));
 * // output: [0, 0, 2, 3]
 */
function bbox(polygon) {
  const a = polygon;
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (let i = 0; i < a.length - 1; i += 1) {
    if (b[0] > a[i][0]) b[0] = a[i][0];
    if (b[1] > a[i][1]) b[1] = a[i][1];
    if (b[2] < a[i][0]) b[2] = a[i][0];
    if (b[3] < a[i][1]) b[3] = a[i][1];
  }
  return b;
}

module.exports = {
  intersect,
  intersect3D,
  distanceTo,
  bbox,
  area,
  angleTo,
  nearestPoint,
  pointRotation,
  angleDifference,
  pointFromAngle,
  pointFromRatio,
  pointFromTwoPoints,
};
