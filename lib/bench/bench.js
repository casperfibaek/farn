const Benchmark = require('benchmark'); // eslint-disable-line
const geom = require('../tests/geom');
const farn = require('../farn');

const suite = new Benchmark.Suite();

// add tests
suite
  .add('No intersections', () => {
    farn.intersect(geom.line3, geom.line4);
  })
  .add('Normal Intersect', () => {
    farn.intersect(geom.line1, geom.line2);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run({ async: true });
