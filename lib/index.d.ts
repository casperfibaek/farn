type Point = [number, number];
type PointObj = { x: number, y: number };
type Linestring = [Point, Point, ...Point[]];
type Segment = [Point, Point];
type Polygon = [Point, Point, ...Point[]];
type BoundingBox = [number, number, number, number];

declare var window: { farn: object };
