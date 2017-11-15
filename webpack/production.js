const { resolve } = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  target: 'web',
  entry: {
    main: './src/client/index.js',
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
    filename: '[chunkhash].[name].js',
    path: resolve(__dirname, '../public'),
    publicPath: '/public/'
  },
  stats: 'verbose',
  performance: {
    hints: 'warning'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [ 'babel-loader' ],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
      })
    }]
  },
  plugins: [
    new AssetsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }),
    extractSass
  ]
};
