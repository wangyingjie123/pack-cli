/**
 * @file webpack配置
 * @author ji
 */
const {spawn} = require('child_process');
const path = require('path');

module.exports = function () {
    process.env.NODE_ENV = 'production';
    const webpackBin = path.resolve(__dirname, '../node_modules/.bin/webpack');
    const webpackConfigFile = path.resolve(__dirname, '../webpack/index.js');
    return spawn(webpackBin, ['--config', webpackConfigFile], {
        stdio: 'inherit'
    });
};
