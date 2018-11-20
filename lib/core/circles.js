/* eslint-env node, es6  */
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
  const ad = Math.min(
    (2 * Math.PI) - Math.abs(b1 - b2), Math.abs(b1 - b2));
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
  createSector,
  createSectorSlice,
  createCircle,
};
