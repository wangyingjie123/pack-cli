# usage
## 安装

`npm i -g pack-cli`

## 新增.buildrc.js

默认位于项目根目录下，示例：

```javascript
module.exports = {
    px2remExclude: /videolist/g  //px2rem 忽略哪些文件夹
    // 默认node_module不需要经过babel处理，如果需要，配置在如下选项里
    babelInclude: [
        'node_modules/xxx',
    ],
    // 开启bundle分析，只会在开发环境生效
    openAnalyzer: true,
    // devPort: 8080,
    // analyzerPort: 8888,
    // 本地代理配置，细节见[webpack](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy)
    proxy: {
        '/api': {
            'target': 'http://www.xxx.com'
        }
    }
}
```
## 命令介绍

pack-cli, 简写pack.
基于webpack, 用于前端构建等。可通过`pack --help`来查看。

### watch
命令：`pack watch [page]`

示例：`pack watch index`

说明：

`page`为页面名称，默认值为`all`。

### start
命令：`pack start <page>`

示例：`pack start index`

说明：

`page`为页面名称，必填.
用于无后端数据情况下的纯前端页面开发调试，需要使用`./src/static/tpl/index_dev.ejs`做为默认模板。

### deploy
命令：`pack deploy [page]`

示例：`pack deploy index`

说明：
`page`为页面名称，默认值为`all`,一般不用于单页构建，主要用于生产环境全量构建。

### predeploy
命令：`pack predeploy [page]`

示例：`pack predeploy index`

说明：
`page`为页面名称，默认值为`all`, 功能同watch, 但是环境默认为生产环境, 主要用于排查生产环境错误等。
