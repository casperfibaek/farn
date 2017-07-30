
/* eslint-env node, es6 */
const farn = {};

const compose = (o, t) => {
  const keys = Object.keys(o);
  keys.forEach((key) => {
    t[key] = o[key]; // eslint-disable-line
  });
};

compose(require('./core/base'), farn);
compose(require('./core/checks'), farn);
compose(require('./core/circles'), farn);
compose(require('./core/lineStrings'), farn);
compose(require('./operations/buffer'), farn);
compose(require('./operations/selfIntersections'), farn);

module.exports = farn;

/*
  TODO:
    - Add translations both rigid and non-rigid.
    - Add more comments to the code + references.
    - Add documentation to other files.
    - Finish buffer and dissolve (remember mitter, round ...)
    - Test library: tape
    -
*/
