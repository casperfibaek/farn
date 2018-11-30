/**
 * Calculates the bounding box of a polygon.
 * Speed: O(n)
 * @name bbox
 * @param {Array<number>} poly A nested array containing x and y coordinates.
 * @returns {Array<number>} A nested array containing the bounding box. As: [Xmin, Ymin, Xmax, Ymax]
 * @example
 * const polygon = [[0,0], [0,3], [2,2], [1,0], [0,0]];
 * console.log(bbox(polygon));
 * // output: [0, 0, 2, 3]
 */
export function bbox(poly:Polygon):BoundingBox {
  const b:BoundingBox = [Infinity, Infinity, -Infinity, -Infinity];
  for (let i:i32 = 0; i < poly.length - 1; i += 1) {
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
 * Checks if a point is located within a polygon.
 * Speed: O(n)
 * @name isPointInsidePolygon
 * @param {Array<number>} p A nested array containing x and y coordinates.
 * @param {Array<number>} poly A nested array containing x and y coordinates.
 * @returns {boolean} returns true if inside, false if not.
 */
export function isPointInsidePolygon(p:Point, poly:Polygon):boolean {
  const x:f32 = p[0];
  const y:f32 = p[1];

  for (let i = 0; i < poly.length; i += 1) {
    const j:i32 = (i > 0) ? i - 1 : poly.length - 1;
    const xi:f32 = poly[i][0];
    const yi:f32 = poly[i][1];
    const xj:f32 = poly[j][0];
    const yj:f32 = poly[j][1];

    if (x === poly[i][0] && y === poly[i][1]) { return true; }

    const yCheck:boolean = (yi > y) !== (yj > y);
    const xyCheck:boolean = x < ((xj - xi) * (y - yi)) / ((yj - yi) + xi);

    if (yCheck && xyCheck) { return true; }
  }

  return false;
}

/**
 * Calculates the area of a simple polygon.
 * Speed: O(n)
 * @name area
 * @param {Array<number>} poly A nested array containing x and y coordinates.
 * @returns {number} The area of the polygon.
 * @example
 * const polygon = [[0,0], [0,2], [2,2], [2,0], [0,0]];
 * console.log(area(polygon));
 * // output: 4
 */
export function area(poly:Polygon):f32 {
  let total:f32 = 0;

  for (let i:i32 = 0; i < poly.length - 1; i += 1) {
    const j:i32 = (i === poly.length - 1) ? 0 : i + 1;

    total += (poly[i][0] * poly[j][1]) - (poly[j][0] * poly[i][1]);
  }

  return Math.abs(total) / 2;
}