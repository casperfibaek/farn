/* eslint-env node, es6 */
const vector = require('./vector');

// transformation options
// keep z when doing 2d on 3d
// dont upscale 2d to 3d in putput

const deg2rad = degrees => (degrees * Math.PI) / 180;
const rad2deg = radians => (radians * 180) / Math.PI;
const parseDegree = (degree) => {
  if (degree <= 360 && degree >= 0) { return degree; }
  if (degree < 0) { return 360 - Math.abs(degree); }

  return degree - 360;
};

/* eslint-disable */
const _pointIs2D = (p) => {
  if (p.length === 2) { return true; }
  return false;
};

const _lineIs2D = (l) => {
  if (l[0].length === 2 || l[1].length === 2) { return true; }
  return false;
};

const _findPoint = (vector1, vector2, distance) => {

};
/* eslint-enable */

// INTERSECTION POINT OF TWO LINES (2D)
const intersect = (l1, l2, boolean = false) => {
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

// DISTANCE BETWEEN TWO POINTS (3D)
const distancePoints = (p1, p2) => {
  if (_pointIs2D(p1) && _pointIs2D(p2)) {
    return Math.sqrt(
      ((p2[0] - p1[0]) ** 2) +
      ((p2[1] - p1[1]) ** 2));
  }
  return Math.sqrt(
    ((p2[0] - p1[0]) ** 2) +
    ((p2[1] - p1[1]) ** 2) +
    ((p2[2] - p1[2]) ** 2));
};

// ANGLE BETWEEN TWO POINTS TO NORTH
const anglePoints = (p1, p2) => {
  if (p1[0] === p2[0] && p1[1] === p2[1]) { return false; }

  let theta = Math.atan2(p1[0] - p2[0], p2[1] - p1[1]);
  if (theta < 0) { theta += Math.PI * 2; }

  return 360 - rad2deg(theta);
};

// NEW POINT FROM THE ANGLE BETWEEN TWO POINTS AND A DISTANCE (3D)
const pointFromTwoPoints = (point1, point2, distance = 0) => {
  const p1 = vector(point1);
  const p2 = vector(point2);

  const findPoint = (v, w, d) => v.add(w.sub(v).normalise().scale(d)).toArray();

  if (point1[0][2] && point2[0][2]) {
    if (p1.x === p2.x && p1.y === p2.y && p1.z === p2.z) {
      return false;
    }
    findPoint(p1, p2, distance);
  }

  if (p1.x === p2.x && p1.y === p2.y) {
    return false;
  }

  return findPoint(p1, p2, distance);
};

// NEW POINT FROM POINT, DISTANCE AND ANGLE (2D)
const pointFromPointAngle = (point, distance, angle) =>
  [
    (Math.cos(deg2rad(parseDegree(90 - angle))) * distance) + point[0],
    (Math.sin(deg2rad(parseDegree(90 - angle))) * distance) + point[1],
  ];

const differenceBetweenAngles = (b1, b2) => {
  const a1 = (b1 > 180) ? 360 - b1 : b1;
  const a2 = (b2 > 180) ? 360 - b2 : b2;

  const d1 = Math.abs(a2 + a1);
  const d2 = Math.abs(b2 - b1);
  if (d1 < d2) { return d1; }
  return d2;
};

const lineMidPoint = (line) => {
  const p1 = vector(line[0]);
  const p2 = vector(line[1]);
  if (line[0][2] && line[0][2]) {
    return p1.add(p2).scale(0.5).toArray();
  }
  p1.z = 0; p2.z = 0;
  return p1.add(p2).scale(0.5).toArray();
};

// SHORTEST DISTANCE BETWEEN A LINE AND A LINE (3D)
const lineToLine = (line1, line2) => {
  const p1 = vector(line1[0]);
  const p2 = vector(line1[1]);
  const p3 = vector(line2[0]);
  const p4 = vector(line2[1]);
  const p13 = p1.sub(p3);
  const p43 = p4.sub(p3);

  if (p43.length() < Number.EPSILON) {
    return false;
  }
  const p21 = p2.sub(p1);
  if (p21.length() < Number.EPSILON) {
    return false;
  }
  const d1343 = p13.multiply(p43).sum();
  const d4321 = p43.multiply(p21).sum();
  const d1321 = p13.multiply(p21).sum();
  const d4343 = p43.multiply(p43).sum();
  const d2121 = p21.multiply(p21).sum();

  const denom = (d2121 * d4343) - (d4321 * d4321);

  if (Math.abs(denom) < Number.EPSILON) {
    return false;
  }
  const numer = (d1343 * d4321) - (d1321 * d4343);
  const mua = numer / denom;
  const mub = (d1343 + (d4321 * (mua))) / d4343;

  const line1Point = [
    (p1.x + (mua * p21.x)),
    (p1.y + (mua * p21.y)),
    (p1.z + (mua * p21.z))];

  const line2Point = [
    (p3.x + (mub * p43.x)),
    (p3.y + (mub * p43.y)),
    (p3.z + (mub * p43.z))];

  return [line1Point, line2Point];
};

// SHORTEST POINT BETWEEN A POINT AND A LINE, BOOLEAN RETURN DISTANCE
const pointToLine = (point, line, boolean = false) => {
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

// ROTATE A POINT AROUND ORIGIN (2D)
const pointRotation = (origin, point, angle) => {
  const cos = Math.cos(deg2rad(angle));
  const sin = Math.sin(deg2rad(angle));

  const nx =
    ((cos * (point[0] - origin[0])) +
    (sin * (point[1] - origin[1]))) + origin[0];

  const ny =
    ((cos * (point[1] - origin[1])) -
    (sin * (point[0] - origin[0]))) + origin[1];

  return [nx, ny];
};

// does not work for holes.
const area = (arr) => {
  let total = 0;

  for (let i = 0; i < arr.length - 1; i += 1) {
    const addX = arr[i][0];
    const addY = arr[i === arr.length - 1 ? 0 : i + 1][1];
    const subX = arr[i === arr.length - 1 ? 0 : i + 1][0];
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
  deg2rad, //               done
  rad2deg, //               done
  parseDegree, //           done
  differenceBetweenAngles, // done
  intersect, //             done
  distancePoints, //        done
  anglePoints, //           done
  pointFromPointAngle, //   done
  pointFromTwoPoints, //    done
  pointToLine, //           done
  lineToLine, //            done
  lineMidPoint, //          done
  pointRotation, //         done
  area, //                  done
  bbox, //                  done
};
