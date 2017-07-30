/* eslint-disable no-console */
const selfIntersection = require('./selfIntersection');
const base = require('../core/base');

const arr = [
  [1, 1], [1, 4], [6, 4], [6, 1],
  [3, 1], [3, 6], [4, 6], [4, 2],
  [5, 2], [5, 3], [2, 3], [2, 1], [1, 1]];

// [[3, 3], [3, 4], [4, 3], [4, 4]]

/* TODO: Merge the lineStrings back together in proper order.. */

const ints = selfIntersection(arr);
const intsmax = ints[ints.length - 1][0];
const intsmin = ints[0][0];
const fragments = [[]];

for (let i = 0; i < arr.length - 1; i += 1) {
  const x1 = arr[i][0]; const x2 = arr[i + 1][0];
  let xmax; let xmin;
  if (x1 >= x2) { xmax = x1; xmin = x2; } else { xmax = x2; xmin = x1; }
  if (xmax >= intsmin && xmin <= intsmax) {
    const found = [];
    for (let j = 0; j < ints.length; j += 1) {
      if (ints[j][0] > xmax) { break; }
      if (base.onLine([arr[i], arr[i + 1]], ints[j])) {
        found.push(ints[j]);
      }
    }
    if (found.length === 0) {
      fragments[fragments.length - 1].push(arr[i]);
    } else if (found.length === 1) {
      fragments[fragments.length - 1].push(arr[i], found[0]);
      fragments.push(found);
    } else {
      found.sort((p1, p2) => {
        const d1 = ((arr[i][0] - p1[0]) ** 2) + ((arr[i][1] - p1[1]) ** 2);
        const d2 = ((arr[i][0] - p2[0]) ** 2) + ((arr[i][1] - p2[1]) ** 2);

        if (d1 > d2) { return 1; }
        if (d1 < d2) { return -1; }
        return 0;
      });
      fragments[fragments.length - 1].push(arr[i], found[0]);
      fragments.push([found[0]]);
      for (let q = 1; q < found.length; q += 1) {
        fragments[fragments.length - 1].push(found[q]);
      }
      fragments.push([found[found.length - 1]]);
    }
  } else {
    fragments[fragments.length - 1].push(arr[i]);
    if (i === arr.length - 2) { fragments[fragments.length - 1].push(arr[0]); }
  }
}
console.log(fragments);
