"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-env node, es6, browser */
const base = require("./core/base");
// const checks = require('./core/checks');
// const circles = require('./core/circles');
// const lineStrings = require('./linestring/lineStrings');
// const buffer = require('./operations/buffer');
// const selfIntersection = require('./operations/selfIntersection');
const farn = Object.assign({}, base);
if (window) {
    window.farn = farn;
}
exports.default = farn;
/*
  TODO:
    - Add translations both rigid and non-rigid.
    - Add more comments to the code + references.
    - Add documentation to other files.
    - Finish buffer and dissolve (remember mitter, round ...)
*/
