const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'aframe-keyboard.js',
        path: path.resolve(__dirname, 'dist')
    }
};