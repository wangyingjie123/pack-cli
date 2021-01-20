/**
 * @file webpack配置
 * @author wyj
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 全局配置
const HKB_OPTIONS = {
    page: process.env.HKB_PAGE,
    action: process.env.HKB_ACTION
};
HKB_OPTIONS.prodMode = process.env.NODE_ENV === 'production';
HKB_OPTIONS.workingPath = process.cwd();
HKB_OPTIONS.buildConfig = require(path.resolve(HKB_OPTIONS.workingPath, './.buildrc.js'));
HKB_OPTIONS.hkbPath = __dirname;
HKB_OPTIONS.moduleName = require(path.resolve(HKB_OPTIONS.workingPath, './package.json')).name;

const {
    prodMode,
    moduleName,
    workingPath,
    hkbPath
} = HKB_OPTIONS;

const pageArr = [];
if (HKB_OPTIONS.page !== 'all') {
    // TODO: 文件路径是否存在
    pageArr.push(...HKB_OPTIONS.page.split(','));
} else {
    const viewPath = path.join(workingPath, './src/page');
    const readdirSync = fs.readdirSync(viewPath);
    readdirSync.forEach(item => {
        const currentPath = `${viewPath}/${item}`;
        if (fs.statSync(currentPath).isDirectory() && item !== 'component') {
            pageArr.push(item);
        }
    });
}
HKB_OPTIONS.pageArr = pageArr;

let webpackConf = {
    mode: prodMode ? 'production' : 'development',
    watch: !prodMode,
    bail: prodMode,
    stats: 'minimal',
    devtool: prodMode ? false : 'cheap-module-source-map',
    target: ['web', 'es5'],
    context: workingPath,
    resolveLoader: {
        modules: [path.resolve(hkbPath, '../node_modules')]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `static/${moduleName}/style/[name].[contenthash:6].css`,
            chunkFilename: `static/${moduleName}/style/[name].[contenthash:6].css`
        }),
        // new HardSourceWebpackPlugin()
    ],
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    }
};

const dirs = fs.readdirSync(path.resolve(hkbPath, 'config'));
dirs.forEach(item => {
    webpackConf = require(path.resolve(hkbPath, 'config', item))(webpackConf, HKB_OPTIONS);
});
module.exports = webpackConf;
