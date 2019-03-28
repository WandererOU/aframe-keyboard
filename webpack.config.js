const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'aframe-keyboard.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
