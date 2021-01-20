/**
 * @file webpack配置
 * @author wangyingjie
 */
const {spawn} = require('child_process');
const path = require('path');

module.exports = function () {
    process.env.NODE_ENV = 'development';
    const webpackBin = path.resolve(__dirname, '../node_modules/.bin/webpack');
    const webpackConfigFile = path.resolve(__dirname, '../webpack/index.js');
    // webpack5启动dev-server命令：webpack serve --config
    return spawn(webpackBin, ['serve', '--config', webpackConfigFile], {
        stdio: 'inherit'
    });
};
