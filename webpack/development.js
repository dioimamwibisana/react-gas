const { resolve } = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const hmr = [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?noInfo=false&path=http://localhost:3000/__webpack_hmr'
];

module.exports = {
  target: 'web',
  context: resolve(__dirname, '../'),
  entry: {
    main: hmr.concat(['./src/client/index.js']),
    // TODO consider externals here
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux'
    ]
  },
  output: {
    filename: '[name].js', // don't use chunkhash in dev
    path: resolve(__dirname, '../public'),
    pathinfo: true,
    publicPath: '/public/'
  },
  devtool: 'inline-source-map',
  performance: {
    hints: false
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      use: [{
        loader: 'react-hot'
      }],
      include: resolve(__dirname, 'src')
    }, {
      test: /\.scss$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new AssetsPlugin(),
    // XXX manifest?
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    })
  ]
};
