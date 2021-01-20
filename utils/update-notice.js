/**
 * @file webpack配置
 * @author ji
 * @desc 升级提示
 */
const updateNotice = require('update-notice');

module.exports = function (options) {
    const {pkg} = options;
    const notice = updateNotice({
        pkg,
        options: {
            registry: 'https://registry.npmjs.org/',
            isGlobal: true
        }
    });
    notice.notify(
        // eslint-disable-next-line max-len
        c => `Changelog ${c.magenta.underline('https://registry.npmjs.org/pack-cli')}`,
    );
};
