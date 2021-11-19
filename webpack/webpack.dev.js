const { merge } = require('webpack-merge');
const COMMON = require('./webpack.common.js');

const devConfig = merge(COMMON, {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    usedExports: true,
  },
  devServer: {
    static: {
      directory: './dist',
    },
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});

module.exports = devConfig;
