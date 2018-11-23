import minify from 'rollup-plugin-babel-minify';

export default {
  input: './lib/index.js',
  output: {
    file: './dist/farn.js',
    format: 'cjs',
    sourceMap: true,
  },
  plugins: [minify({ sourceMap: true, comments: false })],
};
