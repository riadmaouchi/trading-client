const webpack = require('webpack');
const dotenv = require('dotenv');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const fs = require('fs');
const path = require('path');

module.exports = env => {
/*	
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  envKeys['process.env.CONSUL'] = JSON.stringify(process.env.CONSUL);
*/

  return {
    plugins: [
      //new webpack.DefinePlugin(envKeys),
	  new webpack.DefinePlugin(JSON.stringify(process.env.CONSUL)),
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
