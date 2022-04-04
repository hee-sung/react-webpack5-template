'use strict'

const path = require('path');
const config = require('../config');
const packageConfig = require('../package.json');

const isProd = !['LOCAL', 'DEV'].includes(process.env.NODE_ENV);

exports.assetsPath = function (_path) {
  const assetsSubDirectory = isProd ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier');

  return (severity, errors) => {
    if (severity !== 'error') return;

    const error = errors[0];
    const fileName = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: fileName || '',
      icon: path.join(__dirname, 'logo.png')
    });
  }
}

exports.getAppEnv = () => {
  if (!['REAL_WITH_C'].includes(process.env.NODE_ENV)) return process.env.NODE_ENV;

  return 'REAL';
}