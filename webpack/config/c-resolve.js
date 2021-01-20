/**
 * @file webpack配置
 * @author wangyingjie
 */
const path = require('path');
module.exports = function (webpackConf, {
    workingPath,
    hkbPath
}) {
    webpackConf.resolve = {
        modules: [
            path.resolve(hkbPath, '../node_modules'),
            path.resolve(workingPath, 'node_modules'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],
        alias: {
            '@': path.join(workingPath, './', 'src'),
            '@components': path.join(workingPath, './', 'src/components')
        }
    };
    return webpackConf;
};
