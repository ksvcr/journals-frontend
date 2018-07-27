const path = require('path');
const stylesPath = '../src/static/styles/base';
const resources = [
  'mixins.scss',
  'vars.scss'
];
module.exports = resources.map(file => path.resolve(__dirname, stylesPath, file));