var path = require('path');
var webpack = require('webpack');

module.exports = {
  // Detect file changes and compile on the fly
  watch: true,
  colors: true,
  progress: true,
  cache: true,
  module: {
    loaders: [
        {
          loader: "babel-loader",

          // Bundle only files in the src directory
          include: [
            path.resolve(__dirname, "src")
          ],

          // Give only .js and .jsx files to Babel
          test: /\.jsx?$/,

          // Configuration options for Babel
          query: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'react'],
          }
        }
    ]
  },
  // Location of the bundled file
  output: {
    filename: "bundle.js"
  },

  // Entry file from which to start the bundling process
  entry: [
    "./src/index.js"
  ]
};
