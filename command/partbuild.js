/* eslint-disable */
/**
 * @file 增量构建 更新build.sh文件
 * @author zhangjing76
 */
const child = require('child_process');
const fs = require('fs');
const log = require('../utils/log');

function getDeployPage() {
    let gitCommand = 'git diff remotes/origin/master..head --stat --name-only';
    let ret = child.execSync(gitCommand).toString().split('\n');
    ret.pop();
    let pages = {};
    if (!ret.length) {
        return '';
    }
    for(let i = 0; i < ret.length; i++) {
        let file = ret[i];
        if (file.indexOf('src/page') > -1) {
            let page = /^src\/page\/([^\/]*)\//.exec(file)[1];
            pages[page] = true;
        } else {
            return '';
        }
    }
    return Object.keys(pages).join(',')
}
function updateBuildFile(pages) {
    fs.readFile('./scripts/build.sh', 'utf8', (err, files) => {
        err && console.log('err', err);
        if (!pages && /\nhaokan-build \$1\n/.test(files)) {
            return
        }
        if (pages && files.indexOf('\nhaokan-build $1 ' + pages) > -1) {
            return;
        }
        let message = 'update the build.sh to build ';
        if(!pages) {
            message += '"all the pages"';
        } else {
            message += `"${pages}"`;
        }
        log.info(c => c.green(`

            ${message}
        `));
        let reg = /\nhaokan-build \$1(.*)?\n/;
        let replacedStr = pages ? `\nhaokan-build $$1 ${pages}\n` : `\nhaokan-build $$1\n`
        // 在replace方法中 $1获取的是第一个分组的内容, $$表示字符$
        var result = files.replace(reg, replacedStr);
        fs.writeFile('./scripts/build.sh', result, 'utf8', err => {
            if(err) {
                console.log('err', err);
                return;
            }
            child.execSync(`git commit -a -v --amend --no-edit`);
        })
    })
}
module.exports = function() {
    console.log('11111');
    
    const pages = getDeployPage();
    // 更新build.sh文件
    updateBuildFile(pages);
}