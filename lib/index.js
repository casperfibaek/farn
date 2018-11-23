"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/* eslint-env node, es6, browser */
var base = require("./core/base");
// const checks = require('./core/checks');
// const circles = require('./core/circles');
// const lineStrings = require('./linestring/lineStrings');
// const buffer = require('./operations/buffer');
// const selfIntersection = require('./operations/selfIntersection');
var farn = __assign({}, base);
if (window) {
    window.farn = farn;
}
exports["default"] = farn;
/*
  TODO:
    - Add translations both rigid and non-rigid.
    - Add more comments to the code + references.
    - Add documentation to other files.
    - Finish buffer and dissolve (remember mitter, round ...)
*/
