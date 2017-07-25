/* eslint-env node, es6 */
const base = require('./base');

// IS A POINT INSIDE A POLYGON
const inside = (point, polygon, precision = 1e-6) => {
  const x = point[0];
  const y = point[1];

  for (let i = 0; i < polygon.length; i += 1) {
    const j = (i > 0) ? i - 1 : polygon.length - 1;
    const xi = polygon[i][0];
    const yi = polygon[i][1];
    const xj = polygon[j][0];
    const yj = polygon[j][1];

    if (point[0] === polygon[i][0] && point[1] === polygon[i][1]) {
      return true;
    }

    const isIntersecting =
      ((yi > y) !== (yj > y)) &&
      ((x < (xj - xi) * (y - yi)) / ((yj - yi) + xi));

    if (isIntersecting) { return true; }

    if (
      polygon[i + 1] &&
      base.pointToLine(point, [polygon[i], polygon[i + 1]], true) < precision
    ) {
      return true;
    }
  }

  return false;
};

module.exports = {
  inside,
};
