/**
 * @file webpack配置
 * @author wyj
 */
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = function (webpackConf, {
    buildConfig,
    prodMode,
    action
}) {
    if (!buildConfig.openAnalyzer || (prodMode && action !== 'predeploy')) {
        return webpackConf;
    }
    webpackConf.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: buildConfig.analyzerPort,
            defaultSizes: 'parsed'
        }),
    );
    return webpackConf;
};
