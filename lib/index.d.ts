type f32 = number; type f64 = number; type i8 = number; type u8 = number; type i16 = number; type u16 = number; type i32 = number; type u32 = number; type i64 = number; type u64 = number;
type Point = [f32, f32];
type LineString = [Point, Point, ...Point[]];
type Polygon = [Point, Point, ...Point[]];
type BoundingBox = [f32, f32, f32, f32];

declare var window: {
    farn: {},
};