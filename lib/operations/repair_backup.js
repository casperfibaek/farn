/* eslint-disable no-console */
const selfIntersection = require('./selfIntersection');
const base = require('../core/base');

const arr = [
  [1, 1], [1, 4], [6, 4], [6, 1],
  [3, 1], [3, 6], [4, 6], [4, 2],
  [5, 2], [5, 3], [2, 3], [2, 1], [1, 1]];

// [[3, 3], [3, 4], [4, 3], [4, 4]]

const ints = selfIntersection(arr);
const intsmax = ints[ints.length - 1][0];
const intsmin = ints[0][0];
const fragments = [[]];
let lastIntersect = false;

for (let i = 0; i < arr.length - 1; i += 1) {
  const line = [arr[i], arr[i + 1]];
  const p1 = { x: arr[i][0], y: arr[i][1] };
  const p2 = { x: arr[i + 1][0], y: arr[i + 1][1] };
  let xmax; let xmin;
  if (p1.x >= p2.x) {
    xmax = p1.x; xmin = p2.x;
  } else {
    xmax = p2.x; xmin = p1.x;
  }

  if (xmax >= intsmin && xmin <= intsmax) {
    let found = 0;
    for (let j = 0; j < ints.length - 1; j += 1) {
      let ymin; let ymax;
      if (p1.y >= p2.y) {
        ymin = p2.y; ymax = p1.y;
      } else {
        ymin = p1.y; ymax = p2.y;
      }
      if (ints[j][1] >= ymin && ints[j][1] <= ymax) {
        if (base.onLine(line, ints[j])) {
          if (lastIntersect) {
            fragments[fragments.length - 1].push(ints[j]);
            console.log(`INTERSECT (1): ${ints[j]}`);
          } else {
            fragments[fragments.length - 1].push(arr[i], ints[j]);
            console.log(`INTERSECT (2): ${arr[i]}, ${ints[j]}`);
          }
          console.log(`NEW: ${ints[j]}`);
          fragments.push([ints[j]]);
          lastIntersect = true;
          found += 1;
        }
      }
    }
    console.log(found);
    if (found === 0) {
      fragments[fragments.length - 1].push(arr[i]);
      lastIntersect = false;
      console.log(`SPECIAL: ${arr[i]}`);
    }
  } else {
    console.log(arr[i], arr[i + 1]);
    fragments[fragments.length - 1].push(arr[i]);
    lastIntersect = false;
    console.log(`NORMAL: ${arr[i]}`);
    // If were are at the end, add the first vertex to complete the ring.
    if (i === arr.length - 2) { fragments[fragments.length - 1].push(arr[0]); }
  }
}
console.log(fragments);
