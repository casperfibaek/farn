/* eslint-env node, es6 */
const base = require('./base');

const createSectorSlice =
(point, b1, b2, distance, precision = 64) => {
  const lp = 360 / precision;
  const p = point;
  const da = base.angleDifference(b1, b2);
  const di = distance;
  const s = Math.ceil(da / lp);
  const a = Array(s + 2);
  const lsp = da / s;

  a[0] = base.pointFromAngle(p, di, b1);

  for (let i = 1; i < s + 1; i += 1) {
    let na = b1 + ((i + 1) * lsp);
    na = (na > 360) ? 360 - na : na;
    a[i] = base.pointFromAngle(p, di, na);
  }

  a[a.length - 1] = base.pointFromAngle(p, di, b2);
  return a;
};

const createSector =
(point, b1, b2, distance, precision = 64) => {
  const lp = 360 / precision;
  const p = point;
  const d = base.differenceToAngle(b1, b2);
  const s = Math.ceil(d / lp);
  const a = Array(s + 4);
  const lsp = d / s;

  a[0] = p;
  a[1] = base.pointFromAngle(p, distance, b1);

  for (let i = 2; i < s + 2; i += 1) {
    let na = b1 + ((i + 1) * lsp);
    na = (na > 360) ? 360 - na : na;
    a[i] = base.pointFromAngle(p, distance, na);
  }

  a[a.length - 2] = base.pointFromAngle(p, distance, b2);
  a[a.length - 1] = p;
  return a;
};

const createCircle = (point, radius, precision = 64) => {
  const s = 360 / precision;
  const a = Array(Math.floor(s));

  for (let i = precision; i > 0; i -= 1) {
    a[i] = base.pointFromAngle(point, radius, (s * i));
  }
  a[a.length - 1] = a[0];

  return a;
};

module.exports = {
  createSector,
  createSectorSlice,
  createCircle,
};
