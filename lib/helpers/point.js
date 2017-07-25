/* eslint-env node, es6 */
function Point(x, y, z) {
  if (this instanceof Point) {
    if (typeof x === 'number' && typeof y === 'number') {
      this.x = x;
      this.y = y;
      if (z) { this.z = z; }
    } else if (x instanceof Array) {
      this.x = x[0];
      this.y = x[1];
      if (x[2]) { this.z = x[2]; }
    } else {
      throw new Error('Incorrect point input');
    }
  } else {
    return new Point(x, y, z);
  }
}

const msg = 'Object is not an instanceof Point';

Point.prototype = {
  add(p) {
    let v = p;
    if (!(v instanceof Point)) { v = new Point(p); }
    if (this.z && p.z) {
      return new Point(
        this.x + p.x,
        this.y + p.y,
        this.z + p.z,
      );
    }
    return new Point(
      this.x + p.x,
      this.y + p.y,
    );
  },
  _add(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      this.x += p.x;
      this.y += p.y;
      this.z += p.z;
    } else {
      this.x += p.x;
      this.y += p.y;
      delete this.z;
    }
  },
  sub(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      return new Point(
        this.x - p.x,
        this.y - p.y,
        this.z - p.z,
      );
    }
    return new Point(
      this.x - p.x,
      this.y - p.y,
    );
  },
  _sub(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      this.x -= p.x;
      this.y -= p.y;
      this.z -= p.z;
    } else {
      this.x -= p.x;
      this.y -= p.y;
      delete this.z;
    }
  },
  multiply(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      return new Point(
        this.x * p.x,
        this.y * p.y,
        this.z * p.z,
      );
    }
    return new Point(
      this.x * p.x,
      this.y * p.y,
    );
  },
  _multiply(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      this.x *= p.x;
      this.y *= p.y;
      this.z *= p.z;
    } else {
      this.x *= p.x;
      this.y *= p.y;
      delete this.z;
    }
  },
  divide(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      return new Point(
        this.x / p.x,
        this.y / p.y,
        this.z / p.z,
      );
    }
    return new Point(
      this.x / p.x,
      this.y / p.y,
    );
  },
  _divide(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      this.x /= p.x;
      this.y /= p.y;
      this.z /= p.z;
    } else {
      this.x /= p.x;
      this.y /= p.y;
      delete this.z;
    }
  },
  equals(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      return this.x === p.x && this.y === p.y && this.z === p.z;
    }
    return this.x === p.x && this.y === p.y;
  },
  dot(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      return (this.x * p.x) + (this.y * p.y) + (this.z * p.z);
    }
    return (this.x * p.x) + (this.y * p.y);
  },
  cross(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    if (this.z && p.z) {
      return new Point(
        (this.y * p.z) - (this.z * p.y),
        (this.z * p.x) - (this.x * p.z),
        (this.x * p.y) - (this.y * p.x),
      );
    }
    return new Point(
      (this.y * p.z) - (this.z * p.y),
      (this.z * p.x) - (this.x * p.z),
    );
  },
  magnitude() {
    if (this.z) {
      return Math.sqrt(
        (this.x ** 2) +
        (this.y ** 2) +
        (this.z ** 2));
    }
    return Math.sqrt(
      (this.x ** 2) +
      (this.y ** 2));
  },
  normalise() {
    const m = this.magnitude();
    if (this.z) {
      return new Point(
        this.x / m,
        this.y / m,
        this.z / m,
      );
    }
    return new Point(
      this.x / m,
      this.y / m,
    );
  },
  length() {
    return Math.sqrt(this.dot(this));
  },
  distance(p) {
    if (!(p instanceof Point)) { throw new Error(msg); }
    return this.sub(p).magnitude();
  },
  scale(f) {
    return this.multiply(new Point(f, f, f));
  },
  sum() {
    if (this.z) { return this.x + this.y + this.z; }
    return this.x + this.y;
  },
  toArray() {
    if (this.z) { return [this.x, this.y, this.z]; }
    return [this.x, this.y];
  },
};
