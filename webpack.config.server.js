const path = require('path');
const fs = require('fs');

const IS_PRODUCTION = require('./webpack/common').IS_PRODUCTION;
const rules = require('./webpack/common').rules;
const resolve = require('./webpack/common').resolve;
const plugins = require('./webpack/common').plugins;

const config = {
  target: 'node',
  watch: !IS_PRODUCTION,
  devtool: IS_PRODUCTION ? false : 'source-map',
  context: path.resolve(__dirname, './src/server'),
  entry: [
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'server.js'
  },
  module: {
    rules,
  },
  resolve,
  plugins,
  // Fix for node modules
  externals: fs.readdirSync('node_modules').reduce((accumulator, module) => {
    const newAccumulator = accumulator;
    if (module !== '.bin') {
      newAccumulator[module] = `commonjs ${ module }`;
    }

    return newAccumulator;
  }, {}),
}

module.exports = config;
