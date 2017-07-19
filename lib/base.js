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
const intersect = (lineSegment1, lineSegment2) => {
  const l1 = lineSegment1;
  const l2 = lineSegment2;
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
};

/**
 * Finds the distance between two points.
 * @name distance
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {Array} point2 An Array containing x, y and optionally z coordinates.
 * @returns {number} The distance between the points in map units.
 * @example
 * const point1 = [0, 0, 0];
 * const point2 = [2, 3, 1];
 * console.log(distance(point1, point2));
 * // output: 3.7416573867739413
 */
const distance = (point1, point2) => {
  const p1 = point1;
  const p2 = point2;

  if (p1.length === 2 || p2.length === 2) {
    return Math.sqrt(
      ((p2[0] - p1[0]) ** 2) +
      ((p2[1] - p1[1]) ** 2));
  }
  return Math.sqrt(
    ((p2[0] - p1[0]) ** 2) +
    ((p2[1] - p1[1]) ** 2) +
    ((p2[2] - p1[2]) ** 2));
};

/**
 * Finds the angle between two points. 0-360 system increasing clockwise with north being 0.
 * The z-coordinate is ignored.
 * @name angle
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {Array} point2 An Array containing x, y and optionally z coordinates.
 * @returns {number} Angle between points.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 2];
 * console.log(angle(point1, point2));
 * // output: 45
 */
const angle = (point1, point2) => {
  const p1 = point1;
  const p2 = point2;

  if (p1[0] === p2[0] && p1[1] === p2[1]) { return false; }
  let theta = Math.atan2(p1[0] - p2[0], p2[1] - p1[1]);
  if (theta < 0) { theta += Math.PI * 2; }

  return 360 - ((theta * 180) / Math.PI);
};

/**
 * Creates a new point from the angle between two points and a provided distance.
 * @name pointFromTwoPoints
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {Array} point2 An Array containing x, y and optionally z coordinates.
 * @param {number} [_distance = 0] _distance The distance to the new point.
 * Can be higher than distance between the two points.
 * @returns {Array} An Array containing x, y and potentially z coordinates.
 * @example
 * const point1 = [0, 0, 0];
 * const point2 = [2, 2, 2];
 * console.log(pointFromTwoPoints(point1, point2, Math.sqrt(3)));
 * // output: [1, 1, 1]
 */
const pointFromTwoPoints = (point1, point2, _distance = 0) => {
  if (_distance === 0) { return point1; }

  const p1 = point1;
  const p2 = point2;
  const dx = (p2[0] - p1[0]);
  const dy = (p2[1] - p1[1]);
  const xy = (dx ** 2) + (dy ** 2);
  let m;

  if (p1.length === 2 || p2.length === 2) {
    m = Math.sqrt(xy);
    return [
      p1[0] + ((dx / m) * _distance),
      p1[1] + ((dy / m) * _distance),
    ];
  }

  m = Math.sqrt(xy + ((point2[2] - point1[2]) ** 2));
  return [
    p1[0] + ((dx / m) * _distance),
    p1[1] + ((dy / m) * _distance),
    p1[2] + (((p2[2] - p1[2]) / m) * _distance),
  ];
};

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
const pointFromRatio = (point1, point2, ratio) => {
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
};

/**
 * Creates a new point given a point an angle and a distance.
 * 0-360 system increasing clockwise with north being 0.
 * @name pointFromAngle
 * @param {Array} point1 An Array containing x, y and optionally z coordinates.
 * @param {number} _distance The distance to the new point.
 * @param {number} _angle A number representing an angle between 0-360.
  North is 0 and it increases clockwise.
 * @returns {Array} An Array containing x, y and potentially z coordinates.
 * @example
 * const point = [0, 0, 0];
 * const angle = 45;
 * const distance = Math.sqrt(2);
 * console.log(pointFromAngle(point, angle, Math.sqrt(2)));
 * // output: [1, 1, 0]
 */
const pointFromAngle = (point, _angle, _distance) => {
  const p = point;
  const a = (Math.PI * 0.5) - ((_angle * Math.PI) / 180);
  if (p.length === 3) {
    return [
      (Math.cos(a) * _distance) + p[0],
      (Math.sin(a) * _distance) + p[1],
      p[2],
    ];
  }
  return [
    (Math.cos(a) * _distance) + point[0],
    (Math.sin(a) * _distance) + point[1],
  ];
};

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
const angleDifference = (angle1, angle2) => {
  const a1 = (angle1 > 180) ? 360 - angle1 : angle1;
  const a2 = (angle2 > 180) ? 360 - angle2 : angle2;

  const d1 = a2 + a1;
  const d2 = Math.abs(angle2 - angle1);
  if (d1 < d2) { return d1; }
  return d2;
};

/**
 * Rotate a point around the z-axis and a custom origin
 * @name pointRotation
 * @param {Array} origin An Array containing x, y and optionally z coordinates.
 * @param {Array} point An Array containing x, y and optionally z coordinates.
 * @param {number} _angle A number representing an angle between 0-360;
 * @returns {Array} A new point rotate according to the provided angle around origin.
 * @example
 * const origin = [0, 0];
 * const point = [0, 2, 1];
 * const angle = 90;
 * console.log(pointRotation(origin, point, angle));
 * // output: [2, 0, 1]
 */
const pointRotation = (origin, point, _angle) => {
  const o = origin;
  const p = point;
  const rad = (_angle * Math.PI) / 180;
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
};

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
const nearestPoint = (point, lineSegment) => {
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
};

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
const area = (polygon) => {
  const a = polygon;
  let total = 0;

  for (let i = 0; i < a.length - 1; i += 1) {
    const j = (i === a.length - 1) ? 0 : i + 1;
    total += (a[i][0] * a[j][1]) - (a[j][0] * a[i][1]);
  }

  return Math.abs(total) / 2;
};

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
const bbox = (polygon) => {
  const a = polygon;
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (let i = 0; i < a.length - 1; i += 1) {
    if (b[0] > a[i][0]) b[0] = a[i][0];
    if (b[1] > a[i][1]) b[1] = a[i][1];
    if (b[2] < a[i][0]) b[2] = a[i][0];
    if (b[3] < a[i][1]) b[3] = a[i][1];
  }
  return b;
};

module.exports = {
  intersect, //             done
  distance, //              done
  angle, //                 done
  angleDifference, //       done
  pointFromAngle, //        done
  pointFromTwoPoints, //    done
  pointFromRatio, //        done
  pointRotation, //         done
  nearestPoint, //          done
  area, //                  done
  bbox, //                  done
};
