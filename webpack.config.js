const path = require('path');

module.exports = {
  entry: ['@babel/polyfill','./assets/js/scripts.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, ''),
  }
}