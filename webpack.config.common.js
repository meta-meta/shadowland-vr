var path = require('path');
var webpack = require('webpack');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'src'), path.join(__dirname, 'aframe-react/src')]
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader?-svgo'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.html$/,
      loader: "html"
    }]
  },
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      aframe: 'aframe/src',
      'aframe-react': 'aframe-react/src',
    }
  }
};
