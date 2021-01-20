/**
 * @file webpack配置
 * @author wyj
 */
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (webpackConf, {
    action,
    pageArr,
    prodMode,
    moduleName,
    workingPath
}) {
    const htmlPlugins = [];
    pageArr.forEach(page => {
        // 读取页面配置
        let pageConfig = {};
        if (fs.existsSync(`./src/page/${page}/index.json`)) {
            try {
                const fileContent = fs.readFileSync(`./src/page/${page}/index.json`, 'utf-8');
                pageConfig = JSON.parse(fileContent);
            } catch (error) {
                pageConfig = {};
            }
        }

        // eslint-disable-next-line max-len
        const loadingTips = '<style>.empty {width: 100%; height: 100vh;; display: flex; justify-content: center; align-items: center;}.skeleton {width: 76px; height: 23px;}</style>'
              + '<div class="empty"><img class="skeleton" src="https://imgsa.baidu.com/normandy/pic/item/32fa828ba61ea8d3925e74da990a304e241f58eb.jpg" /></div>';
        // 生成页面模板
        let tpl = path.resolve(path.resolve(workingPath), './src/static/tpl/index.ejs');
        if (fs.existsSync(`./src/page/${page}/index.tpl`)) {
            tpl = path.resolve(path.resolve(workingPath), `./src/page/${page}/index.tpl`);
        }
        if (action === 'start') {
            tpl = path.resolve(path.resolve(workingPath), './src/static/tpl/index_dev.ejs');
        }
        const htmlPlugin = new HtmlWebpackPlugin({
            filename: action === 'start' ? `${page}` : `template/${moduleName}/page/${page}.tpl`,
            templateParameters: {
                head: pageConfig.head || '',
                title: pageConfig.title || '好看视频-分享美好看见世界',
                skeletonStyle: pageConfig.skeletonStyle || loadingTips,
                body: pageConfig.body,
                scripts: pageConfig.scripts || [],
                debug: !prodMode
                    ? `
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/eruda/1.5.8/eruda.min.js"></script>
                        <script type="text/javascript">
                            eruda.init();
                        </script>
                    `
                    : '',
                pageId: pageConfig.DP ? pageConfig.DP.pageId : ''
            },
            template: tpl,
            // chunksSortMode: 'manual',
            chunks: ['basedep', page],
            compile: false,
            showErrors: true,
            minify: prodMode ? {
                removeComments: true,
                collapseWhitespace: true,
                preventAttributesEscaping: true,
                minifyJS: true,
                minifyCSS: true
            } : false,
            cache: true
        });
        htmlPlugins.push(htmlPlugin);
    });
    webpackConf.plugins.push(...htmlPlugins);
    return webpackConf;
};
