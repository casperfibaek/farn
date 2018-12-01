function distance(point1: Point, point2: Point): number {
  const p1: PointObj = { x: point1[0], y: point1[1] };
  const p2: PointObj = { x: point2[0], y: point2[1] };

  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;

  return Math.sqrt((dx ** 2) + (dy ** 2));
}

function length(segment: Segment): number {
  return distance(segment[0], segment[1]);
}

function angle(point1: Point, point2: Point): number {
  const p1: PointObj = { x: point1[0], y: point1[1] };
  const p2: PointObj = { x: point2[0], y: point2[1] };

  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;

  return Math.atan2(dy, dx);
}

function direction(segment: Segment): number {
  return angle(segment[0], segment[1]);
}

function pointFromTwoPoints(point1: Point, point2: Point, dist: number): Point {
  const p1: PointObj = { x: point1[0], y: point1[1] };
  const p2: PointObj = { x: point2[0], y: point2[1] };

  if (dist === 0) { return point1; }
  if (p1.x === p2.x && p1.y === p2.y) { return point1; }

  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;
  const db: number = Math.sqrt((dx ** 2) + (dy ** 2));

  return [
    p1.x + ((dx / db) * dist),
    p1.y + ((dy / db) * dist),
  ];
}

function pointFromSegmentPoints(segment: Segment, dist: number): Point {
  return pointFromTwoPoints(segment[0], segment[1], dist);
}

function pointFromRatio(point1: Point, point2: Point, ratio: number): Point {
  if (ratio === 0) { return point1; }
  if (ratio === 1) { return point2; }

  const p1: PointObj = { x: point1[0], y: point1[1] };
  const p2: PointObj = { x: point2[0], y: point2[1] };

  const dx: number = p2.x - p1.x;
  const dy: number = p2.y - p1.y;

  return [
    p1.x + (dx * ratio),
    p1.y + (dy * ratio),
  ];
}

function pointFromSegmentRatio(segment: Segment, ratio: number): Point {
  return pointFromRatio(segment[0], segment[1], ratio);
}

function pointFromAngle(point: Point, angl: number, dist: number): Point {
  if (dist === 0) { return point; }

  const p: PointObj = { x: point[0], y: point[1] };

  return [
    (Math.cos(angl) * dist) + p.x,
    (Math.sin(angl) * dist) + p.y,
  ];
}

function pointFromRotationAroundOrigin(point: Point, origin: Point, angl: number) {
  const p: PointObj = { x: point[0], y: point[1] };
  const o: PointObj = { x: origin[0], y: origin[1] };

  if (p.x === o.x && p.y === o.y) { return point; }

  const cos: number = Math.cos(angl);
  const sin: number = Math.sin(angl);

  const dx: number = p.x - o.x;
  const dy: number = p.y - o.y;

  const nx: number = (cos * dx) + (sin * dy) + o.x;
  const ny: number = (cos * dy) - (sin * dx) + o.y;

  return [nx, ny];
}

function segmentBounds(segment: Segment): BoundingBox {
  return [
    (segment[0][0] < segment[1][0]) ? segment[0][0] : segment[1][0], // xMin
    (segment[0][0] > segment[1][0]) ? segment[0][0] : segment[1][0], // xMax
    (segment[0][1] < segment[1][1]) ? segment[0][1] : segment[1][1], // yMin
    (segment[0][1] > segment[1][1]) ? segment[0][1] : segment[1][1], // yMax
  ];
}

function checkBoundsOverlap(bounds1: BoundingBox, bounds2: BoundingBox, tolerance: number = Number.EPSILON) : boolean {
  return (
    (bounds1[1] + tolerance >= bounds2[0] && bounds2[1] + tolerance >= bounds1[0]) &&
    (bounds1[3] + tolerance >= bounds2[2] && bounds2[3] + tolerance >= bounds1[2])
  );
}

function checkWithinBounds(point: Point, bounds: BoundingBox, tolerance: number = Number.EPSILON): boolean {
  if ((point[0] + tolerance) < bounds[0]) { return false; }
  if ((point[0] - tolerance) > bounds[1]) { return false; }
  if ((point[1] + tolerance) < bounds[2]) { return false; }
  if ((point[1] - tolerance) > bounds[3]) { return false; }

  return true;
}

function checkPointOnSegment(point: Point, segment: Segment, tolerance: number = Number.EPSILON): boolean {
  if (!checkWithinBounds(point, segmentBounds(segment))) { return false; }

  const p: PointObj = { x: point[0], y: point[1] };
  const s1: PointObj = { x: segment[0][0], y: segment[0][1] };
  const s2: PointObj = { x: segment[1][0], y: segment[1][1] };

  const collinear: number = (s2.x - s1.x) * (p.y - s1.y) - (p.x - s1.x) * (s2.y - s1.y);
  return (collinear < tolerance && collinear > -tolerance)
}

function checkPointBetweenPoints(point: Point, pointA: Point, pointB: Point): boolean {
  return checkPointOnSegment(point, [pointA, pointB]);
}

function segmentIntersection(segment1: Segment, segment2: Segment, tolerance: number = Number.EPSILON, infinity: boolean = false): Point|boolean {
  const bounds1: BoundingBox = segmentBounds(segment1);
  const bounds2: BoundingBox = segmentBounds(segment2);
  if (!checkBoundsOverlap(bounds1, bounds2)) { return false; }

  const s1p1: PointObj = { x: segment1[0][0], y: segment1[0][1] };
  const s1p2: PointObj = { x: segment1[1][0], y: segment1[1][1] };
  const s2p1: PointObj = { x: segment2[0][0], y: segment2[0][1] };
  const s2p2: PointObj = { x: segment2[1][0], y: segment2[1][1] };
  
  const s2dx: number = s2p2.x - s2p1.x;
  const s2dy: number = s2p2.y - s2p1.y;
  const s1dx: number = s1p2.x - s1p1.x;
  const s1dy: number = s1p2.y - s1p1.y;

  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point 
  const denominator: number = (s2dy * s1dx) - (s2dx * s1dy);
  if (denominator === 0) { return false; }

  const dy: number = s1p1.y - s2p1.y;
  const dx: number = s1p1.x - s2p1.x;
  const numerator1: number = (s2dx * dy) - (s2dy * dx);
  const numerator2: number = (s1dx * dy) - (s1dy * dx);
  const a: number = numerator1 / denominator;
  const b: number = numerator2 / denominator;

  // The points intersect here.
  const intersection: Point = [
    s1p1.x + (a * s1dx),
    s1p1.y + (a * s1dy),
  ];

  if (infinity) { return intersection; }

  if ((a > -tolerance && a < 1 + tolerance) && (b > -tolerance && b < 1 + tolerance)) {
    return intersection;
  }
  return false;
};

function nearestPointOnSegment(point:Point, segment:Segment):Point {
  const p: PointObj = { x: point[0], y: point[1] };
  const s1: PointObj = { x: segment[0][0], y: segment[0][1] };
  const s2: PointObj = { x: segment[1][0], y: segment[1][1] };

  const dlx: number = s2.x - s1.x
  const dly: number = s2.y - s1.y;
  const dpx: number = p.x - s1.x;
  const dpy: number = p.y - s1.y;

  const c1: number = (dlx * dpx) + (dly * dpy);
  if (c1 <= 0) { return segment[0]; }

  const c2: number = (dlx ** 2) + (dly ** 2);
  if (c2 <= c1) { return segment[1]; }

  const b: number = c1 / c2;
  const sx: number = dlx * b;
  const sy: number = dly * b;

  return [s1.x + sx, s1.y + sy];
}

function pointPerpindicularToSegmentLeft(segment:Segment, distAlong: number, dist: number):Point {
  const origin:Point = pointFromTwoPoints(segment[0], segment[1], distAlong);
  return pointFromAngle(origin, dist, angle(segment[0], segment[1]) - (0.5 * Math.PI));
}

function pointPerpindicularToSegmentRight(segment:Segment, distAlong: number, dist: number):Point {
  const origin:Point = pointFromTwoPoints(segment[0], segment[1], distAlong);
  return pointFromAngle(origin, dist, angle(segment[0], segment[1]) + (0.5 * Math.PI));
}

function shiftLineLeft(segment: Segment, dist: number): Segment {
  const start:Point = pointFromAngle(segment[0], dist, angle(segment[0], segment[1]) - (0.5 * Math.PI));
  const end:Point = [segment[1][0] + start[0], segment[1][1] + start[1]];

  return [start, end];
}

function shiftLineRight(segment: Segment, dist: number): Segment {
  const start:Point = pointFromAngle(segment[0], dist, angle(segment[0], segment[1]) + (0.5 * Math.PI));
  const end:Point = [segment[1][0] + start[0], segment[1][1] + start[1]];

  return [start, end];
}

export {
  distance,
  length,
  angle,
  direction,
  pointFromTwoPoints,
  pointFromSegmentPoints,
  pointFromRatio,
  pointFromSegmentRatio,
  pointFromAngle,
  pointFromRotationAroundOrigin,
  segmentBounds,
  checkBoundsOverlap,
  checkWithinBounds,
  checkPointOnSegment,
  checkPointBetweenPoints,
  segmentIntersection,
  nearestPointOnSegment,
  pointPerpindicularToSegmentLeft,
  pointPerpindicularToSegmentRight,
  shiftLineLeft,
  shiftLineRight,
};
