'use strict';

const path = require('path');
const config = require('../config');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const portfinder = require('portfinder');

const CopyPlugin = require('copy-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf');

process.env.APP_ENV = 'DEV';

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: config.dev.devtool,
  devServer: {
    client: {
      logging: 'info',
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
    },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    hot: true,
    compress: true,
    // https: true,
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    headers: config.dev.headers,
    static: './dist',
    // publicPath: config.dev.assetsPublicPath
  },
  optimization: {
    emitOnErrors: false,
    moduleIds: 'named'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          globOptions: {
            ignore: ['.*']
          }
        }
      ]
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      resolve(devWebpackConfig)
    }
  })
})