const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const plugins = require('./webpack.plugins.js');
const webpack = require('webpack');

module.exports = env =>
  merge(plugins(env), common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
      contentBase: './dist',
      historyApiFallback: true
    }
  });
