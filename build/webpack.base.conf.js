'use strict';

const path = require('path');
const webpack = require('webpack');

const config = require('../config');
const utils = require('./utils');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log('process.env.NODE_ENV : ', process.env.NODE_ENV)

const isProd = !['LOCAL', 'DEV'].includes(process.env.NODE_ENV);
const buildConfig = isProd ? config.build : config.dev;

module.exports = {
  entry: './src/index.js',
  // entry: {
  //   app: ['@babel/polyfill',
  //     'core-js/modules/es6.promise',
  //     'core-js/modules/es6.array.iterator',
  //     './src/index.js']
  // },
  output: {
    filename: '[name].[contenthash].js',
    path: config.build.assetsRoot,
    // publicPath: buildConfig.assetsPublicPath,
    clean: true,
    chunkLoadingGlobal: 'chocolleto-react'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, '..', 'src')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        type: 'asset/resource',
        options: {
          limit: 5000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        // loader: 'url-loader',
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ],
  },
  optimization: {
    chunkIds: 'named'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      APP_ENV: utils.getAppEnv(),
      BUILD_NUMBER: process.env.BUILD_NUMBER || ''
    }),
    new HtmlWebpackPlugin({
      title: `[${process.env.NODE_ENV}] react-webpack5-template`,
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name][contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css')
    })
  ]
};