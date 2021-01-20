/* eslint-disable */
/**
 * @file 主文件
 * @author wangyingjie
 */
const path = require('path');
const pkg = require('./package.json');
const updateNotice = require('./utils/update-notice');
const { error } = require('./utils/process-code');
const log = require('./utils/log');

module.exports = function (options) {
    options.pkg = pkg;
    log.info(c => c.green('\n    __ ____ _____ \n   / // / //_/ _ )\n  / _  / ,'
        + '< / _  |\n /_//_/_/|_/____/ \n                 '));
    log.info('Hkb version', c => c.magenta(options.pkg.version));
    log.info('Current directory', c => c.magenta(process.cwd()));

    // updateNotice(options);
    [process.env.HKB_ACTION] = options._;
    process.env.HKB_PAGE = options.page;
    const command = require(path.resolve(__dirname, `command/${options._[0]}`));
    command(options).on('close', code => {
        code && error(code);
    });
};
