
/* eslint-env node, es6 */
const farn = {};

const compose = (o, t) => {
  const keys = Object.keys(o);
  keys.forEach((key) => {
    t[key] = o[key]; // eslint-disable-line
  });
};

compose(require('./base'), farn);
compose(require('./checks'), farn);
compose(require('./buffer'), farn);
compose(require('./circles'), farn);
compose(require('./lineStrings'), farn);

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
