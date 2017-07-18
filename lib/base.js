/* eslint-env node, es6 */
const vector = require('./vector');

// transformation options
// keep z when doing 2d on 3d
// dont upscale 2d to 3d in putput

/**
 * Find the intersection point between two lines located on the lines.
 * If the boolean is passed returns true for intersection and false for no intersection.
 * @name intersect
 * @param {Array} line1 A nested array containing x, y and potentially z coordinates.
 * The z-coordinated is ignored. Example: [[2, 2, 0], [0, 0, 0]]
 * @param {Array} line2 A nested array containing x, y and optionally z.
 * The z-coordinated is ignored. Example: [[0, 0, 0], [2, 2, 0]]
 * @param {Boolean} [boolean=false] If true, then only true or
 * false will be returned regarding the intersection.
 * @returns {Array || Boolean} An array containing the intersection or false if no intersection.
 * If the boolean parameter is passed only true or false is returned.
 * @example
 * const line1 = [[0, 0, 0], [2, 2, 0]];
 * const line2 = [[1, 2, 0], [3, 1, 0]];
 * console.log(intersect(line1, line2));
 * // output: [1.6666666666666667, 1.6666666666666667]
 */
const intersect = (line1, line2, boolean = false) => {
  const l1 = line1;
  const l2 = line2;
  const denominator =
    ((l2[1][1] - l2[0][1]) * (l1[1][0] - l1[0][0])) -
    ((l2[1][0] - l2[0][0]) * (l1[1][1] - l1[0][1]));

  if (denominator === 0) { return false; }

  const ua = (
    ((l2[1][0] - l2[0][0]) * (l1[0][1] - l2[0][1])) -
    ((l2[1][1] - l2[0][1]) * (l1[0][0] - l2[0][0]))) / denominator;

  const ub = (
    ((l1[1][0] - l1[0][0]) * (l1[0][1] - l2[0][1])) -
    ((l1[1][1] - l1[0][1]) * (l1[0][0] - l2[0][0]))) / denominator;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    if (boolean === true) { return true; }

    return [
      l1[0][0] + (ua * (l1[1][0] - l1[0][0])),
      l1[0][1] + (ua * (l1[1][1] - l1[0][1])),
    ];
  }
  return false;
};

/**
 * Finds the distance between two points.
 * @name distance
 * @param {Array} point1 An array containing x, y and optionally z coordinates.
 * @param {Array} point2 An array containing x, y and optionally z coordinates.
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
 * @param {Array} point1 An array containing x, y and optionally z coordinates.
 * @param {Array} point2 An array containing x, y and optionally z coordinates.
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
 * @param {Array} point1 An array containing x, y and optionally z coordinates.
 * @param {Array} point2 An array containing x, y and optionally z coordinates.
 * @param {number} [_distance = 0] _distance The distance to the new point.
 * Can be higher than distance between the two points.
 * @returns {Array} An array containing x, y and potentially z coordinates.
 * @example
 * const point1 = [0, 0, 0];
 * const point2 = [2, 2, 2];
 * console.log(pointFromTwoPoints(point1, point2, Math.sqrt(3)));
 * // output: [1, 1, 1]
 */
const pointFromTwoPoints = (point1, point2, _distance = 0) => {
  const p1 = point1;
  const p2 = point2;

  if (p1[0] === p2[0] && p1[1] === p2[1]) { return false; }
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];

  let theta = Math.atan2(dx, dy);
  if (theta < 0) { theta += Math.PI * 2; }

  if (p1.length === 2 || p2.length === 2) {
    return [
      (Math.cos(theta) * _distance) + point1[0],
      (Math.sin(theta) * _distance) + point1[1],
    ];
  }

  const dz = (p2[2] - p1[2]);
  const dxy = (dx ** 2) + (dy ** 2);
  const dxyz = Math.sqrt(dxy + (dz ** 2));
  const zd = Math.sqrt(dxy) / dxyz;

  return [
    (Math.cos(theta) * _distance * zd) + point1[0],
    (Math.sin(theta) * _distance * zd) + point1[1],
    point1[2] + ((dz / dxyz) * _distance),
  ];
};

/**
 * Creates a new point given a point an angle and a distance.
 * 0-360 system increasing clockwise with north being 0.
 * @name pointFromAngle
 * @param {Array} point1 An array containing x, y and optionally z coordinates.
 * @param {number} _distance The distance to the new point.
 * @param {number} _angle A number representing an angle between 0-360.
  North is 0 and it increases clockwise.
 * @returns {Array} An array containing x, y and potentially z coordinates.
 * @example
 * const point = [0, 0, 0];
 * const angle = 45;
 * const distance = Math.sqrt(2);
 * console.log(pointFromAngle(point, angle, Math.sqrt(2)));
 * // output: [1, 1, 0]
 */
const pointFromAngle = (point, _angle, _distance) => {
  const a = (Math.PI * 0.5) - ((_angle * Math.PI) / 180);
  if (point.length === 3) {
    return [
      (Math.cos(a) * _distance) + point[0],
      (Math.sin(a) * _distance) + point[1],
      point[2],
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
 * Finds a point at ratio distance between two points.
 * @name pointFromRatio
 * @param {Array} point1 An array containing x, y and optionally z coordinates.
 * @param {Array} point2 An array containing x, y and optionally z coordinates.
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

  const x = ((point1[0] + point2[0]) * ratio) - point1[0];
  const y = ((point1[1] + point2[1]) * ratio) - point1[1];

  if (point1.length === 3 && point2.length === 3) {
    const z = (point1[2] + point2[2]) * ratio;
    return [x, y, z];
  }
  return [x, y];
};

// ROTATE A POINT AROUND ORIGIN (2D)
const pointRotation = (origin, point, _angle) => {
  const rad = (_angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const nx =
    ((cos * (point[0] - origin[0])) +
    (sin * (point[1] - origin[1]))) + origin[0];

  const ny =
    ((cos * (point[1] - origin[1])) -
    (sin * (point[0] - origin[0]))) + origin[1];

  return [nx, ny];
};

/* eslint-disable */
// SHORTEST POINT BETWEEN A POINT AND A LINE, BOOLEAN RETURN DISTANCE
const pointToLine = (point, line, distance = false) => {
  let l0 = vector(line[0]);
  let l1 = vector(line[1]);
  let p = vector(point);

  if (point.length !== 3 || line[0].length !== 3 || line[1].length !== 3) {
    l0 = vector([line[0][0], line[0][1]]);
    l1 = vector([line[1][0], line[1][1]]);
    p = vector([point[0], point[1]]);
  }

  const v = l1.sub(l0);
  const w = p.sub(l0);

  const c1 = w.dot(v);
  if (c1 <= 0) {
    if (boolean === true) { return p.distance(l0); }
    return l0.toArray();
  }

  const c2 = v.dot(v);
  if (c2 <= c1) {
    if (boolean === true) { return p.distance(l1); }
    return l1.toArray();
  }

  const b = c1 / c2;

  const pb = l0.add(v.scale(b));
  if (boolean === true) { return p.distance(pb); }

  return pb.toArray();
};

// does not work for holes.
const area = (arr) => {
  let total = 0;

  for (let i = 0; i < arr.length - 1; i += 1) {
    const j = (i === arr.length - 1) ? 0 : i + 1;
    const addX = arr[i][0];
    const addY = arr[j][1];
    const subX = arr[j][0];
    const subY = arr[i][1];

    total += (addX * addY * 0.5);
    total -= (subX * subY * 0.5);
  }

  return Math.abs(total);
};

// order: [Xmin, Ymin, Xmax, Ymax]
const bbox = (arr) => {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (let i = 0; i < arr.length - 1; i += 1) {
    if (b[0] > arr[i][0]) b[0] = arr[i][0];
    if (b[1] > arr[i][1]) b[1] = arr[i][1];
    if (b[2] < arr[i][0]) b[2] = arr[i][0];
    if (b[3] < arr[i][1]) b[3] = arr[i][1];
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
  pointToLine, //           done
  area, //                  done
  bbox, //                  done
};
