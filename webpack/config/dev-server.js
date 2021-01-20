/**
 * @file webpack配置
 * @author wyj
 */
const os = require('os');

module.exports = function (webpackConf, {
    action,
    page,
    buildConfig
}) {
    if (action === 'start') {
        let host;

        try {
            host = os.networkInterfaces().en0.find(elm => elm.family === 'IPv4').address;
        } catch (e) {
            host = 'localhost';
        }

        const devServer = {
            host: buildConfig.host || host,
            openPage: `${page.split(',')[0]}`,
            hot: true,
            port: buildConfig.devPort,
            open: true,
            overlay: {
                warnings: true,
                errors: true
            },
            disableHostCheck: true,
            allowedHosts: buildConfig.allowedHosts,
            proxy: buildConfig.proxy
        };
        webpackConf.devServer = devServer;
    }
    return webpackConf;
};
