/**
 * @file webpack配置
 * @author wyj
 */
const path = require('path');

module.exports = function (webpackConf, {
    workingPath,
    action,
    buildConfig,
    moduleName
}) {
    const hashKey = action === 'start' ? 'hash' : 'contenthash';
    const {cdnPath = 'https://sv.bdstatic.com/'} = buildConfig;
    webpackConf.output = {
        path: path.resolve(workingPath, 'output'),
        publicPath: action === 'deploy' ? cdnPath : '/',
        filename: `static/${moduleName}/js/[name].[${hashKey}:6].js`,
        chunkFilename: `static/${moduleName}/js/[name].[${hashKey}:6].chunk.js`
    };
    return webpackConf;
};
