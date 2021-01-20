/**
 * @file webpack配置
 * @author wangyingjie
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LessPluginFunctions = require('less-plugin-functions');

module.exports = function (webpackConf, {
    workingPath,
    prodMode,
    buildConfig,
    moduleName
}) {
    const px2remExclude = buildConfig.px2remExclude || '';
    const babelIncludeConfig = [
        path.resolve(workingPath, 'src'),
        path.resolve(workingPath, 'node_modules/@baidu/haokan-util'),
        path.resolve(workingPath, 'node_modules/@baidu/haokan-ui')
    ];
    buildConfig.babelInclude && buildConfig.babelInclude.forEach(item => {
        babelIncludeConfig.push(path.resolve(workingPath, item));
    });
    const sideEffectsConfig = [];
    buildConfig.sideEffectsInclude && buildConfig.sideEffectsInclude.forEach(item => {
        sideEffectsConfig.push(path.resolve(workingPath, item));
    });
    const browsers = [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'Opera 12.1',
        'not ie <= 9',
        'Android >= 4.0',
        'iOS >=9'
    ];
    const babelLoader = {
        loader: 'babel-loader',
        options: {
            babelrc: false,
            configFile: false,
            presets: [
                [require('@babel/preset-env'), {
                    modules: false,
                    targets: {
                        browsers
                    }
                }],
                require('@babel/preset-react')],
            plugins: [
                require('@babel/plugin-transform-runtime'),
                require('@babel/plugin-proposal-class-properties'),
                require('@babel/plugin-syntax-dynamic-import')],
            cacheDirectory: true,
            cacheCompression: prodMode,
            compact: prodMode
        }
    };
    const module = {
        strictExportPresence: false,
        rules: [
            {
                include: sideEffectsConfig,
                sideEffects: false
            },
            {
                test: /\.(ts|tsx)$/,
                include: [
                    path.resolve(workingPath, 'src')
                ],
                use: [
                    babelLoader,
                    'ts-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                include: babelIncludeConfig,
                use: [
                    babelLoader
                ]
            },
            {
                test: /\.(css|less)$/,
                use: [
                    prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            // ident: 'postcss',
                            postcssOptions: {
                                plugins: [
                                    require('postcss-flexbugs-fixes'),
                                    require('postcss-preset-env')({
                                        browsers
                                    }),
                                    require('postcss-plugin-px2rem')({
                                        rootValue: {
                                            px: 124.2,
                                            rpx: 248.4
                                        },
                                        unitPrecision: 3,
                                        minPixelValue: 2,
                                        exclude: px2remExclude
                                    })
                                ]
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                plugins: [new LessPluginFunctions()]
                            }
                        }
                    },
                ],
                sideEffects: true
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name(file) {
                                const path = file.substring(file.indexOf(moduleName + '/src') + 17, file.lastIndexOf('/')); // eslint-disable-line
                                return `static/${moduleName}/img${path}[hash:6].[ext]`;
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: `static/${moduleName}/fonts/[name].[hash:8].[ext]`
                }
            }
        ]
    };
    webpackConf.module = module;
    return webpackConf;
};
