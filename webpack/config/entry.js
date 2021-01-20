/**
 * @file webpack配置
 * @author wangyingjie
 */

module.exports = function (webpackConf, HKB_OPTIONS) {
    const entry = {};
    HKB_OPTIONS.pageArr.forEach(item => {
        entry[`${item}`] = ['@babel/polyfill', `./src/page/${item}/index.tsx`];
    });
    webpackConf.entry = entry;
    return webpackConf;
};
