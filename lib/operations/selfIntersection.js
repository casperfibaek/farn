/* eslint-env node, es6 */
function selfIntersection(polygon, shamos = false) {
  let globalIntersections = [];

  const seg = Array(polygon.length - 1);
  for (let i = 0; i < polygon.length - 1; i += 1) {
    const c = { a: polygon[i], x: polygon[i][0], y: polygon[i][1] };
    const f = { a: polygon[i + 1], x: polygon[i + 1][0], y: polygon[i + 1][1] };

    if (c.x < f.x) {
      seg[i] = [c.a, f.a];
    } else if (c.x === f.x) {
      if (c.y <= f.y) { seg[i] = [c.a, f.a]; } else { seg[i] = [f.a, c.a]; }
    } else {
      seg[i] = [f.a, c.a];
    }
  }

  function sortCoords(q, p) { return (q[0][0] > p[0][0]) ? 1 : -1; }
  function sortIntersections(q, p) {
    if (q[0] >= p[0] || (q[0] === p[0] && q[1] >= p[1])) { return 1; }
    return -1;
  }
  seg.sort(sortCoords);

  while (seg.length > 1) {
    const localIntersections = [];
    for (let j = 1; j < seg.length; j += 1) {
      const c = {
        p1: { x: seg[0][0][0], y: seg[0][0][1] },
        p2: { x: seg[0][1][0], y: seg[0][1][1] },
      };

      const f = {
        p1: { x: seg[j][0][0], y: seg[j][0][1] },
        p2: { x: seg[j][1][0], y: seg[j][1][1] },
      };

      if (f.p1.x > c.p2.x) { break; } // outside x
      const eq1 = c.p1.x === f.p1.x && c.p1.y === f.p1.y;
      const eq2 = c.p2.x === f.p2.x && c.p2.y === f.p2.y;
      if (eq1 && eq2) {
        localIntersections.push(seg[0]); // push the equal line string.
      } else if (
        !eq1 && !(c.p1.x === f.p2.x && c.p1.y === f.p2.y) &&
        !eq2 && !(c.p2.x === f.p1.x && c.p2.y === f.p1.y)
      ) {
        const dx1 = c.p2.x - c.p1.x;
        const dy1 = c.p2.y - c.p1.y;
        const dx2 = f.p2.x - f.p1.x;
        const dy2 = f.p2.y - f.p1.y;
        const denom = (dy2 * dx1) - (dx2 * dy1);

        if (denom !== 0) {
          const dx12 = c.p1.x - f.p1.x;
          const dy12 = c.p1.y - f.p1.y;
          const ua = ((dx2 * dy12) - (dy2 * dx12)) / denom;
          const ub = ((dx1 * dy12) - (dy1 * dx12)) / denom;

          if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            if (shamos) { return true; }
            const nx = c.p1.x + (ua * dx1);
            const ny = c.p1.y + (ua * dy1);

            // Check if it is in local intersections before going global.
            const found = localIntersections.findIndex(
              arr => arr[0] === nx && arr[1] === ny);

            if (found === -1) { localIntersections.push([nx, ny]); }
          }
        }
      }
    }
    globalIntersections = globalIntersections.concat(localIntersections);
    seg.shift();
  }

  return (globalIntersections.length > 0) ?
    globalIntersections.sort(sortIntersections) : false;
}

module.exports = selfIntersection;
