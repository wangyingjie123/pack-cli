/**
 * @file webpack配置
 * @author wyj
 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (webpackConf) {
    const optimization = {
        moduleIds: 'deterministic', // 告知 webpack 当选择模块 id 时需要使用哪种算法
        splitChunks: {
            chunks: 'all',
            name: false,
            hidePathInfo: true,
            automaticNameDelimiter: '.', // 文件名之间连接符
            cacheGroups: {
                vendorReact: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendorReact'
                },
                vendorMobx: {
                    test: /[\\/]node_modules[\\/](mobx|mobx-react)[\\/]/,
                    name: 'vendorMobx'
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true  // eslint-disable-line
                    }
                },
                parallel: true, // 多进程并发
                // cache: true, // 已默认
                // sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({
                // assetNameRegExp: /\.css\.*(?!.*map)/g,
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    discardComments: {
                        removeAll: true
                    }
                }
            })
        ]
    };
    webpackConf.optimization = optimization;
    return webpackConf;
};
