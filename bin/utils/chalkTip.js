const chalk = require('chalk');

module.exports = {
  suc: (msg) => console.log(chalk.green.bold(`\n 😀   ${msg}\n`)),
  fail: (msg) => console.log(chalk.red.bold(`\n ❌  😱   ${msg}\n`)),
  info: (msg) => console.log(chalk.blue(`\n ❗️   ${msg}\n`)),
};
