/* eslint-env node, es6, browser */
import * as base from './core/base';
import * as linestring from './operations/linestring';
import * as circle from './operations/circle';
import * as polygon from './operations/polygon';

// const checks = require('./core/checks');
// const circles = require('./core/circles');
// const lineStrings = require('./linestring/lineStrings');
// const buffer = require('./operations/buffer');
// const selfIntersection = require('./operations/selfIntersection');

const farn = {
  ...base,
  ...linestring,
  ...circle,
  ...polygon,
  // ...buffer,
  // ...selfIntersection,
};

if (window) { window.farn = farn; }

export default farn;

/*
  TODO:
    - Add translations both rigid and non-rigid.
    - Add more comments to the code + references.
    - Add documentation to other files.
    - Finish buffer and dissolve (remember mitter, round ...)
*/
