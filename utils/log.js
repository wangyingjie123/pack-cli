/**
 * @file webpack配置
 * @author ji
 */
const chalk = require('chalk');
const dayjs = require('dayjs');

const resolveChalk = (arr, fn) => {
    arr.forEach((item, index) => {
        if (typeof item === 'function') {
            arr[index] = item(chalk);
            return;
        }

        if (fn && typeof fn === 'function') {
            arr[index] = fn(item);
        }
    });
    return arr;
};

const info = (...args) => {
    args = resolveChalk(args);
    args.unshift(`${chalk.blue('ℹ')} ${chalk.gray(`｢HKB ${dayjs().format('HH:mm:ss')}｣`)}:`);
    console.log(...args);
};

const success = (...args) => {
    args = resolveChalk(args, item => chalk.green(item));
    args.unshift(`${chalk.green('✔')} ${chalk.gray(`｢HKB ${dayjs().format('HH:mm:ss')}｣`)}:`);
    console.log(...args);
};

const warning = (...args) => {
    args = resolveChalk(args, item => chalk.yellowBright(` ${item}`));
    args.unshift(`\n${chalk.yellowBright('WARNING:')}\n`);
    args.push('\n');
    console.log(...args);
};

const error = (...args) => {
    args = resolveChalk(args, item => chalk.red(item));
    args.unshift(`${chalk.red('✘')} ${chalk.gray(`｢HKB ${dayjs().format('HH:mm:ss')}｣`)}:`);
    console.log(...args);
};

module.exports = {
    info,
    success,
    warning,
    error
};
