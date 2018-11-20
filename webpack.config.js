const path = require('path');

module.exports = {
  entry: './lib/farn.js',
  output: {
    filename: 'farn.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
