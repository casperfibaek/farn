/* eslint-disable */
/* eslint-env node, es6 */
const base = require('./base');

const testLine = [[2, 2], [2, 4], [4, 4]];

const bufferLine = (line, distance, precision) => {
  if (distance <= 0) { return false; }

  let left = [];
  let right = [];

  for (let i = 0; i < line.length - 1; i += 1) {
    const c_shiftLines = base.shiftLine([line[i], line[i + 1]], distance);
    const c_left = c_shiftLines[0];
    const c_right = c_shiftLines[1];

    if (i < line.length - 2) {
      if (i === 0) { left.push(c_left[0]); }
      const f_shiftLines = base.shiftLine([line[i + 1], line[i + 2]], distance);
      const f_left = f_shiftLines[0];
      const f_right = f_shiftLines[1];

      const leftIntersect = base.intersect(c_left, f_left);
      const rightIntersect = base.intersect(c_right, f_right);

      if (leftIntersect) {
        left.push(c_left[0]);
        left.push(leftIntersect);
      } else {
        const b1 = base.anglePoints(line[i + 1], c_left[1]);
        const b2 = base.anglePoints(line[i + 1], f_left[0]);
        const slice = base.createSectorSlice(
          line[i + 1], b1, b2, distance, precision);
        left = left.concat(slice);
      }

      if (rightIntersect) {
        right.unshift(c_right[0]);
        right.unshift(rightIntersect);
      } else {
        const b1 = base.anglePoints(line[i + 1], f_right[0]);
        const b2 = base.anglePoints(line[i + 1], c_right[1]);
        const slice = base.createSectorSlice(
          line[i + 1], b1, b2, distance, precision);
        right = slice.concat(right);
      }
    }
    if (i === line.length - 2) {
      const shiftLines = base.shiftLine([line[i], line[i + 1]], distance);
      left.push(shiftLines[1][1]);
      right.push(shiftLines[0][1]);
    }

  }
  console.log('left: ', left);
  console.log('right: ', right);
  return left.concat(right);
};

bufferLine(testLine, 1, 64)
// console.log();
