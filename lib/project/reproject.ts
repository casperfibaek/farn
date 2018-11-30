const radius = 6378137;
const radiusMinor = 6356752.314245179;
const bounds = [[-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]];

const degrees2Radians = (deg:number):number => {
  return deg * (Math.PI / 180);
};

function project(latlng:number[]) {
  const y:number = degrees2Radians(latlng[0]);
  const tmp:number = radiusMinor / radius;
  const e:number = Math.sqrt(1 - (tmp * tmp));
  const con:number = e * Math.sin(y);

  const ts:number = Math.tan((Math.PI / 4) - (y / 2)) /
    Math.pow((1 - con) / (1 + con), (e / 2));
  const lng:number = -radius * Math.log(Math.max(ts, 1E-10));

  return [degrees2Radians(latlng[1]) * radius, lng];
}

function unproject(point) {
  const d = 180 / Math.PI;
  const r = this.R;
  const tmp:number = radiusMinor / radius;
  const e = Math.sqrt(1 - tmp * tmp);
  const ts = Math.exp(-point.y / r);

  let phi = Math.PI / 2 - 2 * Math.atan(ts);
  for (let i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i += 1) {
    con = e * Math.sin(phi);
    con = Math.pow((1 - con) / (1 + con), e / 2);
    dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
    phi += dphi;
  }

  return [phi * d, point.x * d / r];
}
