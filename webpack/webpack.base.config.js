var path = require('path');
var name = require('../package.json').name;
var plugins = require('./plugins');

module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: name + '.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      component: path.resolve(__dirname, '../src/component'),
      module: path.resolve(__dirname, '../src/store/module'),
      events: path.resolve(__dirname, '../src/store/module/events')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'es2015',
            'stage-2'
          ]
        }
      }
    ]
  },
  plugins
}
