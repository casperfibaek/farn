/* eslint-env node, es6 */
const base = require('./base');

const bufferLine = (line, distance, precision) => {
  if (distance <= 0) { return false; }

  let left = [];
  let right = [];

  for (let i = 0; i < line.length - 1; i += 1) {
    const currentShiftLines = base.shiftLine([line[i], line[i + 1]], distance);
    const currLeft = currentShiftLines[0];
    const currRight = currentShiftLines[1];

    if (i < line.length - 2) {
      if (i === 0) { left.push(currLeft[0]); }
      const forwardShiftLines = base.shiftLine([line[i + 1], line[i + 2]], distance);
      const forwardLeft = forwardShiftLines[0];
      const forwardRight = forwardShiftLines[1];

      const leftIntersect = base.intersect(currLeft, forwardLeft);
      const rightIntersect = base.intersect(currRight, forwardRight);

      if (leftIntersect) {
        left.push(currLeft[0]);
        left.push(leftIntersect);
      } else {
        const b1 = base.anglePoints(line[i + 1], currLeft[1]);
        const b2 = base.anglePoints(line[i + 1], forwardLeft[0]);
        const slice = base.createSectorSlice(
          line[i + 1], b1, b2, distance, precision);
        left = left.concat(slice);
      }

      if (rightIntersect) {
        right.unshift(currRight[0]);
        right.unshift(rightIntersect);
      } else {
        const b1 = base.anglePoints(line[i + 1], forwardRight[0]);
        const b2 = base.anglePoints(line[i + 1], currRight[1]);
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
  return left.concat(right);
};

module.exports = bufferLine;
