/**
 * @file webpack配置
 * @author ji
 */
const log = require('./log');

const errCode = {
    UPLOAD_CONFIG_ERR: 20 // config.json文件不存在
};

const codeLog = {
    1: ['error', 'webpack内部错误'],
    20: ['error', '请修改config.json配置项为自己的机器名']
};

const error = code => {
    log[codeLog[code][0]](codeLog[code][1]);
};

module.exports = {
    errCode,
    error
};
