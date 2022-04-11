'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/v1': {
        target: '',
        changeOrigin: true
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    host: '0.0.0.0',
    port: 9100,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    /**
     * Source Maps
     */
    devtool: 'inline-source-map',
    cacheBusting: true,
    cssSourceMap: true,
    extractCss: false
  },
  build : {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsSubDirectory: 'static',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: true,
    devtool: 'source-map',
    extractCss: true,

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_confing_report,
  }
}
