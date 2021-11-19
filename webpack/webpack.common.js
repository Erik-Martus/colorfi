const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          // favicon files
          from: './src/favicon/*',
          to: './[name][ext]',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
  ],
};

module.exports = config;
