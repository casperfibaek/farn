export function createSectorSlice(point:Point, b1:f32, b2:f32, distance:f32, precision:i16 = 24) {
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

export function createSector(point:Point, b1:f32, b2:f32, distance:f32, precision:i16 = 24) {
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

/**
 * Creates a circle around a point with the given radius and precision (segements).
 * Speed: O(1)
 * @name createCircle
 * @param {Array<number>} p A nested array containing x and y coordinates.
 * @param {number} r The radius.
 * @param {number} precisoin The precicion or the number of segments.
 * @returns {boolean} returns true if inside, false if not.
 */
export function createCircle(p:Point, r:f32, precision:i16 = 24):number[][] {
  const coords:number[][] = Array(precision + 1);
  for (let i:i16 = 0; i < precision; i += 1) {
    const angle:f32 = (i / (precision / 2)) * Math.PI;
    const x:f32 = p[0] - (r * Math.cos(angle));
    const y:f32 = p[1] - (r * Math.sin(angle));
    coords[i] = [x, y];
  }
  coords[coords.length - 1] = p;
  return coords;
}
