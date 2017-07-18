function Vector(a) {
  if (this instanceof Vector) {
    this.x = a[0] || 0;
    this.y = a[1] || 0;
    this.z = a[2] || 0;
  } else {
    return new Vector(a);
  }
}

Vector.prototype = {
  negative() {
    return Vector([-this.x, -this.y, -this.z]);
  },
  add(v) {
    return Vector([this.x + v.x, this.y + v.y, this.z + v.z]);
  },
  sub(v) {
    return Vector([this.x - v.x, this.y - v.y, this.z - v.z]);
  },
  multiply(v) {
    return Vector([this.x * v.x, this.y * v.y, this.z * v.z]);
  },
  divide(v) {
    return Vector([this.x / v.x, this.y / v.y, this.z / v.z]);
  },
  equals(v) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  },
  dot(v) {
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
  },
  cross(v) {
    return Vector([
      (this.y * v.z) - (this.z * v.y),
      (this.z * v.x) - (this.x * v.z),
      (this.x * v.y) - (this.y * v.x)]);
  },
  clamp(m) {
    const r = (this.magnitude() / m);
    return Vector([this.x / r, this.y / r, this.z / r]);
  },
  length() {
    return Math.sqrt(this.dot(this));
  },
  unit() {
    return this.divide(this.length());
  },
  toAngles() {
    return {
      theta: Math.atan2(this.z, this.x),
      phi: Math.asin(this.y / this.length()),
    };
  },
  angleTo(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length()));
  },
  angleToDeg(a) {
    return Math.acos(this.dot(a) / (this.length() * a.length())) * (180 / Math.PI);
  },
  magnitude() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2));
  },
  distance(v) {
    return this.sub(v).magnitude();
  },
  scale(f) {
    return this.multiply(Vector([f, f, f]));
  },
  sum() {
    return this.x + this.y + this.z;
  },
  normalise() {
    return this.clamp(1);
  },
  lerp(v, f) {
    return v.sub(this).multiply(f).add(v);
  },
  limit(m) {
    if (m < this.magnitude()) {
      return this.clamp(m);
    }
    return this;
  },
  toArray() {
    return [this.x, this.y, this.z];
  },
};

module.exports = Vector;
