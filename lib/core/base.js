/**
 * Find the intersection point between two lines located on the lines.
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
export function intersect(l1, l2) {
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
    const dx1 = l1[1][0] - l1[0][0];
    const dy1 = l1[1][1] - l1[0][1];
    const dx2 = l2[1][0] - l2[0][0];
    const dy2 = l2[1][1] - l2[0][1];
    const denom = (dy2 * dx1) - (dx2 * dy1);
    if (denom === 0) {
        return false;
    }
    const dx12 = l1[0][0] - l2[0][0];
    const dy12 = l1[0][1] - l2[0][1];
    const ua = ((dx2 * dy12) - (dy2 * dx12)) / denom;
    const ub = ((dx1 * dy12) - (dy1 * dx12)) / denom;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
        const ip = [l1[0][0] + (ua * dx1), l1[0][1] + (ua * dy1)];
        return ip;
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
export function distance(p1, p2) {
    return Math.sqrt((Math.pow((p2[0] - p1[0]), 2)) + (Math.pow((p2[1] - p1[1]), 2)));
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
export function angle(p1, p2) {
    // If the two points are identical
    if (p1[0] === p2[0] && p1[1] === p2[1]) {
        return 0;
    }
    let theta = Math.atan2(p1[0] - p2[0], p2[1] - p1[1]);
    if (theta < 0) {
        theta += Math.PI * 2;
    }
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
export function isPointOnLine(p, l, t = Number.EPSILON) {
    const dy = l[1][1] - l[0][1];
    const dx = l[1][0] - l[0][0];
    if (dx === 0 || dy === 0) { // vertical line
        if (p[0] === l[0][0]) {
            let ymin;
            let ymax;
            if (l[0][1] >= l[1][1]) {
                ymin = l[1][1];
                ymax = l[0][1];
            }
            else {
                ymin = l[0][1];
                ymax = l[1][1];
            }
            if (p[1] >= ymin && p[1] <= ymax) {
                return true;
            }
        }
        else if (p[1] === l[0][1]) { // horisontal line
            let xmin;
            let xmax;
            if (l[0][0] >= l[1][0]) {
                xmin = l[1][0];
                xmax = l[0][0];
            }
            else {
                xmin = l[0][0];
                xmax = l[1][0];
            }
            if (p[0] >= xmin && p[0] <= xmax) {
                return true;
            }
        }
        return false;
    }
    const slope = dy / dx;
    const intercept = l[0][1] - (slope * l[0][0]);
    const on = Math.abs(p[1] - ((slope * p[0]) + intercept));
    return (on <= t) === true;
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
export function pointFromTwoPoints(p1, p2, d = 0) {
    if (d === 0) {
        return p1;
    }
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const xy = (Math.pow(dx, 2)) + (Math.pow(dy, 2));
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
export function pointFromRatio(p1, p2, r = 0.5) {
    if (r === 0) {
        return p1;
    }
    if (r === 1) {
        return p2;
    }
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
export function pointFromAngle(p, a, d = 0) {
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
export function pointFromOriginRotation(o, p, a) {
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const nx = ((cos * (p[0] - o[0])) +
        (sin * (p[1] - o[1]))) + o[0];
    const ny = ((cos * (p[1] - p[1])) -
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
export function nearestPointOnLine(p, l) {
    const dlx = l[1][0] - l[0][0];
    const dly = l[1][1] - l[0][1];
    const dpx = p[0] - l[0][0];
    const dpy = p[1] - l[0][1];
    const c1 = (dlx * dpx) + (dly * dpy);
    if (c1 <= 0) {
        return l[0];
    }
    const c2 = (Math.pow(dlx, 2)) + (Math.pow(dly, 2));
    if (c2 <= c1) {
        return l[1];
    }
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
export function area(poly) {
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
 * @param {Array<number>} poly A nested array containing x and y coordinates.
 * @returns {Array<number>} A nested array containing the bounding box. As: [Xmin, Ymin, Xmax, Ymax]
 * @example
 * const polygon = [[0,0], [0,3], [2,2], [1,0], [0,0]];
 * console.log(bbox(polygon));
 * // output: [0, 0, 2, 3]
 */
export function bbox(poly) {
    const b = [Infinity, Infinity, -Infinity, -Infinity];
    for (let i = 0; i < poly.length - 1; i += 1) {
        if (b[0] > poly[i][0]) {
            b[0] = poly[i][0];
        }
        if (b[1] > poly[i][1]) {
            b[1] = poly[i][1];
        }
        if (b[2] < poly[i][0]) {
            b[2] = poly[i][0];
        }
        if (b[3] < poly[i][1]) {
            b[3] = poly[i][1];
        }
    }
    return b;
}
/**
 * Calculates the length of a linestring.
 * @name lineStringLength
 * @param {Array<number>} ls A nested array containing x and y coordinates.
 * @returns {number} The distance in the same units as the input.
 */
export function lineStringLength(ls) {
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
 */
export function pointAlongLineString(ls, d = 0) {
    if (d === 0) {
        return ls[0];
    }
    let a = 0;
    for (let i = 0; i < ls.length - 1; i += 1) {
        a += distance(ls[i], ls[i + 1]);
        if (a === d) {
            return ls[i + 1];
        }
        if (a > d) {
            return pointFromTwoPoints(ls[i + 1], ls[i], a - d);
        }
    }
    return pointFromTwoPoints(ls[ls.length - 2], ls[ls.length - 1]);
}
/**
 * Creates a perpendicular point to a line segment at a given distance along the segment.
 * @name perpendicularPointsSegment
 * @param {Array<number>} ls A nested array containing x and y coordinates.
 * @param {number} [ld = 0] The distance along the segment.
 * @param {number} [d = 0] The distance from the segment to the new point.
 * @param {boolean} [b = true] If true: returns the right hand point, if false: returns left hand point.
 * @returns {Array<number>} A new point at the supplied distance along the linestring.
 */
export function perpendicularPointsSegment(l, ld, d, b = true) {
    const origin = pointFromTwoPoints(l[0], l[1], ld);
    const left = pointFromAngle(origin, d, angle(l[0], l[1]) - (0.5 * Math.PI));
    if (b) {
        return left;
    }
    const right = [
        left[0] + ((-1) * (origin[0] - left[0])),
        left[1] + ((-1) * (origin[1] - left[1])),
    ];
    return right;
}
/**
 * Creates a new parralel line at a given distance to the left of the input segment.
 * @name shiftLineLeft
 * @param {Array<number>} l A nested array containing x and y coordinates.
 * @param {number} [d = 0] The distance from the segment to the new segment.
 * @returns {Array<number>} A new segment parralel to the old segment at the specified distance.
 */
export function shiftLineLeft(l, d) {
    const ls = pointFromAngle(l[0], d, angle(l[0], l[1]) - (0.5 * Math.PI));
    const tv = [l[0][0] - ls[0], l[0][1] - ls[1]];
    const le = [l[1][0] + tv[0], l[1][1] + tv[1]];
    return [ls, le];
}
/**
 * Creates a perpendicular point to a line segment at a given distance along the segment.
 * @name shiftLineRight
 * @param {Array<number>} l A nested array containing x and y coordinates.
 * @param {number} [d = 0] The distance from the segment to the new segment.
 * @returns {Array<number>} A new segment parralel to the old segment at the specified distance.
 */
export function shiftLineRight(l, d) {
    const rs = pointFromAngle(l[0], d, angle(l[0], l[1]) + (0.5 * Math.PI));
    const tv = [l[0][0] - rs[0], l[0][1] - rs[1]];
    const re = [l[1][0] + tv[0], l[1][1] + tv[1]];
    return [rs, re];
}
/**
 * Checks if a point is located within a polygon.
 * @name isPointInsidePolygon
 * @param {Array<number>} p A nested array containing x and y coordinates.
 * @param {Array<number>} poly A nested array containing x and y coordinates.
 * @returns {boolean} returns true if inside, false if not.
 */
export function isPointInsidePolygon(p, poly) {
    const x = p[0];
    const y = p[1];
    for (let i = 0; i < poly.length; i += 1) {
        const j = (i > 0) ? i - 1 : poly.length - 1;
        const xi = poly[i][0];
        const yi = poly[i][1];
        const xj = poly[j][0];
        const yj = poly[j][1];
        if (x === poly[i][0] && y === poly[i][1]) {
            return true;
        }
        const yCheck = (yi > y) !== (yj > y);
        const xyCheck = x < ((xj - xi) * (y - yi)) / ((yj - yi) + xi);
        if (yCheck && xyCheck) {
            return true;
        }
    }
    return false;
}
/**
 * Creates a circle around a point with the given radius and precision (segements).
 * @name createCircle
 * @param {Array<number>} p A nested array containing x and y coordinates.
 * @param {number} r The radius.
 * @param {number} precisoin The precicion or the number of segments.
 * @returns {boolean} returns true if inside, false if not.
 */
export function createCircle(p, r, precision = 24) {
    const coords = Array(precision + 1);
    for (let i = 0; i < precision; i += 1) {
        const angle = (i / (precision / 2)) * Math.PI;
        const x = p[0] - (r * Math.cos(angle));
        const y = p[1] - (r * Math.sin(angle));
        coords[i] = [x, y];
    }
    coords[coords.length - 1] = p;
    return coords;
}
