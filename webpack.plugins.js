const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = env => {
  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.CONSUL': JSON.stringify(process.env.CONSUL)
      }),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disable',
        generateStatsFile: true,
        statsOptions: { source: false }
      })
    ]
  };
};
