/**
 * Finds the distance between two points.
 * Speed: O(1)
 * @name distance
 * @param {Array<number>} p1 An array containing x and y coordinates. Such as: [0, 0]
 * @param {Array<number>} p2 An array containing x and y coordinates. Such as: [2, 3]
 * @returns {number} The distance between the points in map units.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 3];
 * console.log(distance(point1, point2));
 * // output: 3.605551275463989
 */
function distance(p1:Point, p2:Point):f32 {
  return Math.sqrt(((p2[0] - p1[0]) ** 2) + ((p2[1] - p1[1]) ** 2));
}

function length(segment:Segment):f32 {
  return Math.sqrt(((segment[1][0] - segment[0][0]) ** 2) + ((segment[1][1] - segment[0][1]) ** 2));
}

/**
 * Finds the angle between two points.
 * Starting at positiv x axis going counter clockwise. (radians).
 * Speed: O(1)
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
function angle(p1:Point, p2:Point): f32 {
  return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
}

/**
 * Creates a new point from the angle between two points
 * and a provided distance from the first point.
 * Speed: O(1)
 * @name pointFromTwoPoints
 * @param {Array<number>} p1 An array containing x and y coordinates. Such as: [0, 0]
 * @param {Array<number>} p2 An array containing x and y coordinates. Such as: [2, 2]
 * @param {number} [d = 0] The distance to the new point.
 * Can be higher than the distance between the two points.
 * @returns {Array<number>} An array containing the x and y coordinates of the new point.
 * @example
 * const point1 = [0, 0];
 * const point2 = [2, 2];
 * console.log(pointFromTwoPoints(point1, point2, Math.sqrt(3)));
 * // output: [1, 1]
 */
function pointFromTwoPoints(p1:Point, p2:Point, d:f32 = 0):Point {
  if (d === 0) { return p1; }
  if (p1[0] === p2[0] && p1[1] === p2[1]) { return p1; }

  const dx:f32 = p2[0] - p1[0];
  const dy:f32 = p2[1] - p1[1];
  const xy:f32 = (dx ** 2) + (dy ** 2);
  const m:f32 = Math.sqrt(xy);

  return [
    p1[0] + ((dx / m) * d),
    p1[1] + ((dy / m) * d),
  ];
}

/**
 * Finds a point at the ratio between two points.
 * Speed: O(1)
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
function pointFromRatio(p1:Point, p2:Point, r:f32 = 0.5):Point {
  if (r === 0) { return p1; }
  if (r === 1) { return p2; }

  const dx:f32 = p2[0] - p1[0];
  const dy:f32 = p2[1] - p1[1];

  return [
    p1[0] + (dx * r),
    p1[1] + (dy * r),
  ];
}

/**
 * Creates a new point given a point an angle and a distance.
 * 0-360 system increasing clockwise with north being 0.
 * Speed: O(1)
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
function pointFromAngle(p:Point, a:f32, d:f32 = 0):Point {
  return [
    (Math.cos(a) * d) + p[0],
    (Math.sin(a) * d) + p[1],
  ];
}

/**
 * Rotate a point around a custom origin. Rotates Clockwise
 * Speed: O(1)
 * @name pointRotation
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
function pointRotation(p:Point, o:Point, a:f32) {
  const cos:f32 = Math.cos(a);
  const sin:f32 = Math.sin(a);
  const dx:f32 = p[0] - o[0];
  const dy:f32 = p[1] - o[1];
  const nx:f32 = (cos * dx) + (sin * dy) + o[0];
  const ny:f32 = (cos * dy) - (sin * dx) + o[1];

  return [nx, ny];
}

/**
 * Tests if a given point is located on a given line.
 * Speed: O(1)
 * @name isPointOnLine
 * @param {Array<number>} p An array containing x and y coordinates. Such as: [1,1]
 * @param {Array<number>} l A nested array containing x and y coordinates. Such as: [[1,1], [2,2]]
 * @param {Number} [t = Number.EPSILON] The tolerance of the distance between the point
 * and the line. Defaults to Epsilon.
 * @returns {Boolean} True if point is on line within tolerance, false otherwise.
 * @example
 * const point = [1, 1];
 * const line = [[0, 0], [2, 2]];
 * console.log(isPointOnLine(point, line));
 * // output: true
 */
function isPointOnLine(p:Point, l:LineString, t:f32 = Number.EPSILON):boolean {
  const dy:f32 = l[1][1] - l[0][1];
  const dx:f32 = l[1][0] - l[0][0];

  if (dx === 0 || dy === 0) { // vertical line
    if (p[0] === l[0][0]) {
      let ymin:f32;
      let ymax:f32;
      if (l[0][1] >= l[1][1]) {
        ymin = l[1][1];
        ymax = l[0][1];
      } else {
        ymin = l[0][1];
        ymax = l[1][1];
      }
      if (p[1] >= ymin && p[1] <= ymax) {
        return true;
      }
    } else if (p[1] === l[0][1]) { // horisontal line
      let xmin:f32;
      let xmax:f32;
      if (l[0][0] >= l[1][0]) {
        xmin = l[1][0];
        xmax = l[0][0];
      } else {
        xmin = l[0][0];
        xmax = l[1][0];
      }
      if (p[0] >= xmin && p[0] <= xmax) {
        return true;
      }
    }
    return false;
  }

  const slope:f32 = dy / dx;
  const intercept:f32 = l[0][1] - (slope * l[0][0]);
  const on:f32 = Math.abs(p[1] - ((slope * p[0]) + intercept));

  return (on <= t) === true;
}

/**
 * Find the intersection point between two lines located on the lines.
 * Speed: O(1)
 * @name intersect
 * @param {Array<number>} l1 A nested array containing x and y coordinates. [[0, 0], [2, 2]]
 * @param {Array<number>} l2 A nested array containing x and y coordinates. [[1, 2], [3, 1]]
 * @returns {(Array<number>|Boolean)} An array containing the intersection.
 * False if no intersection.
 * @example
 * const lineSegment1 = [[0, 0, 0], [2, 2, 0]];
 * const lineSegment2 = [[1, 2, 0], [3, 1, 0]];
 * console.log(intersect(lineSegment1, lineSegment2));
 * // output: [1.6666666666666667, 1.6666666666666667]
 */
function intersect(l1: LineString, l2: LineString): Point|boolean {
  if ( // Check if the two segments are equal.
    l1[0][0] === l2[0][0] && l1[0][1] === l2[0][1] &&
    l1[1][0] === l2[1][0] && l1[1][1] === l2[1][1]) {
    return [l1[0][0], l1[0][1]]; // return first point
  }

  if ( // Check if they intersect at first end.
    (l1[0][0] === l2[0][0] && l1[0][1] === l2[0][1]) ||
    (l1[0][0] === l2[1][0] && l1[0][1] === l2[1][1])) {
    return [l1[0][0], l1[0][1]]; // return first point
  }

  if ( // Check if they intersect at second end.
    (l1[1][0] === l2[0][0] && l1[1][1] === l2[0][1]) ||
    (l1[1][0] === l2[1][0] && l1[1][1] === l2[1][1])) {
    return [l1[1][0], l1[1][1]]; // return first point
  }

  const dx1:f32 = l1[1][0] - l1[0][0];
  const dy1:f32 = l1[1][1] - l1[0][1];
  const dx2:f32 = l2[1][0] - l2[0][0];
  const dy2:f32 = l2[1][1] - l2[0][1];

  const denom:f32 = (dy2 * dx1) - (dx2 * dy1);
  if (denom === 0) { return false; }

  const dx12:f32 = l1[0][0] - l2[0][0];
  const dy12:f32 = l1[0][1] - l2[0][1];
  const ua:f32 = ((dx2 * dy12) - (dy2 * dx12)) / denom;
  const ub:f32 = ((dx1 * dy12) - (dy1 * dx12)) / denom;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    const ip:Point = [l1[0][0] + (ua * dx1), l1[0][1] + (ua * dy1)];
    return ip;
  }
  return false;
}

/**
 * Finds the nearest point on a lineSegment from a point.
 * Speed: O(1)
 * @name nearestPointOnLine
 * @param {Array<number>} p An array containing x and y coordinates. Such as: [1, 1]
 * @param {Array<number>} l An nested array containing x and y coordinates.
 * Such as: [[0, 0], [2, 2]]
 * @returns {Array<number>} The nearest point on the lineSegment.
 * @example
 * const point = [1, 1];
 * const lineSegment = [[0, 0], [2, 2]];
 * console.log(nearestPointOnLine(point, lineSegment);
 * // output: [2.5, 2, 0.5]
 */
function nearestPointOnLine(p:Point, l:LineString):Point {
  const dlx:f32 = l[1][0] - l[0][0];
  const dly:f32 = l[1][1] - l[0][1];
  const dpx:f32 = p[0] - l[0][0];
  const dpy:f32 = p[1] - l[0][1];

  const c1:f32 = (dlx * dpx) + (dly * dpy);
  if (c1 <= 0) { return l[0]; }

  const c2:f32 = (dlx ** 2) + (dly ** 2);
  if (c2 <= c1) { return l[1]; }

  const b:f32 = c1 / c2;
  const s:Point = [dlx * b, dly * b];

  return [l[0][0] + s[0], l[0][1] + s[1]];
}

/**
 * Creates a perpendicular point to a line segment at a given distance along the segment.
 * Speed: O(1)
 * @name perpendicularPointsSegment
 * @param {Array<number>} ls A nested array containing x and y coordinates.
 * @param {number} [ld = 0] The distance along the segment.
 * @param {number} [d = 0] The distance from the segment to the new point.
 * @param {boolean} [b = true] If true: returns the right hand point,
 * if false: returns left hand point.
 * @returns {Array<number>} A new point at the supplied distance along the linestring.
 */
function perpendicularPointsSegment(l:LineString, ld:f32, d:f32, b:boolean = true):Point {
  const origin:Point = pointFromTwoPoints(l[0], l[1], ld);
  const left:Point = pointFromAngle(origin, d, angle(l[0], l[1]) - (0.5 * Math.PI));

  if (b) { return left; }

  const right:Point = [
    left[0] + ((-1) * (origin[0] - left[0])),
    left[1] + ((-1) * (origin[1] - left[1])),
  ];

  return right;
}

/**
 * Creates a new parralel line at a given distance to the left of the input segment.
 * Speed: O(1)
 * @name shiftLineLeft
 * @param {Array<number>} l A nested array containing x and y coordinates.
 * @param {number} [d = 0] The distance from the segment to the new segment.
 * @returns {Array<number>} A new segment parralel to the old segment at the specified distance.
 */
function shiftLineLeft(l:LineString, d:f32):LineString {
  const ls:Point = pointFromAngle(l[0], d, angle(l[0], l[1]) - (0.5 * Math.PI));
  const tv:Point = [l[0][0] - ls[0], l[0][1] - ls[1]];
  const le:Point = [l[1][0] + tv[0], l[1][1] + tv[1]];

  return [ls, le];
}

/**
 * Creates a perpendicular point to a line segment at a given distance along the segment.
 * Speed: O(1)
 * @name shiftLineRight
 * @param {Array<number>} l A nested array containing x and y coordinates.
 * @param {number} [d = 0] The distance from the segment to the new segment.
 * @returns {Array<number>} A new segment parralel to the old segment at the specified distance.
 */
function shiftLineRight(l:LineString, d:f32):LineString {
  const rs:Point = pointFromAngle(l[0], d, angle(l[0], l[1]) + (0.5 * Math.PI));
  const tv:Point = [l[0][0] - rs[0], l[0][1] - rs[1]];
  const re:Point = [l[1][0] + tv[0], l[1][1] + tv[1]];

  return [rs, re];
}

export {
  distance,
  length,
  angle,
  pointFromTwoPoints,
  pointFromRatio,
  pointFromAngle,
  pointRotation,
  isPointOnLine,
  intersect,
  nearestPointOnLine,
  perpendicularPointsSegment,
  shiftLineLeft,
  shiftLineRight,
};
