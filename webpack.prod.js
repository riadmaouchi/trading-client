const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const plugins = require('./webpack.plugins.js');

module.exports = env =>
  merge(plugins(env), common, {
    mode: 'production',
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors'
          }
        }
      }
    }
  });
