/* eslint-env node, es6, browser */
import * as base from './core/base';

// const checks = require('./core/checks');
// const circles = require('./core/circles');
// const lineStrings = require('./linestring/lineStrings');
// const buffer = require('./operations/buffer');
// const selfIntersection = require('./operations/selfIntersection');

const farn = {
  ...base,
  // ...checks,
  // ...circles,
  // ...lineStrings,
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
