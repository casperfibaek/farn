import * as base from '../core/base';

/**
 * Calculates the length of a linestring.
 * Speed: O(n)
 * @name lineStringLength
 * @param {Array<number>} ls A nested array containing x and y coordinates.
 * @returns {number} The distance in the same units as the input.
 */
export function lineStringLength(ls:LineString):f32 {
  let length:f32 = 0;
  for (let i:i32 = 0; i < ls.length - 1; i += 1) {
    length += base.distance(ls[i], ls[i + 1]);
  }
  return length;
}

  /**
   * Creates a new point at a supplied distance along a linestring.
   * Extrapolates from the last two points if the distance supplied is
   * longer than the length of the linestring.
   * Speed: O(n)
   * @name pointAlongLineString
   * @param {Array<number>} ls A nested array containing x and y coordinates.
   * @param {number} [d = 0] The distance to the new point.
   * @returns {Array<number>} A new point at the supplied distance along the linestring.
   */
export function pointAlongLineString(ls:LineString, d:f32 = 0):Point {
  if (d === 0) { return ls[0]; }

  let a:f32 = 0;
  for (let i:i32 = 0; i < ls.length - 1; i += 1) {
    a += base.distance(ls[i], ls[i + 1]);
    if (a === d) { return ls[i + 1]; }
    if (a > d) { return base.pointFromTwoPoints(ls[i + 1], ls[i], a - d); }
  }
  return base.pointFromTwoPoints(ls[ls.length - 2], ls[ls.length - 1]);
}
