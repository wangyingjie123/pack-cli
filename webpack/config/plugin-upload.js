/**
 * @file webpack配置
 * @author wyj
 */
const fs = require('fs');
const path = require('path');
// const WebpackUploadPlugin = require('webpack-upload-plugin');
const webpackUpload = require('../diy-plugin/upload');
const { errCode } = require('../../utils/process-code');
// upload插件暂不支持webpack5
module.exports = function (webpackConf, {
    action,
    workingPath
}) {
    return webpackConf;
    if (action === 'watch' || action === 'predeploy') {
        let uploadConfig;
        try {
            uploadConfig = require(path.resolve(workingPath, './config.json'));
        } catch (err) {
            const data = {
                receiver: 'http://xxx.rmb.rmb.otp.baidu.com/receiver.php',
                to: '/home/work/orp'
            };
            fs.writeFileSync('./config.json', JSON.stringify(data, null, 4));
            process.exit(errCode.UPLOAD_CONFIG_ERR);
        }
        webpackConf.plugins.push(new webpackUpload({
            ...uploadConfig
        }));
    }

    return webpackConf;
};
