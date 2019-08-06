'use strict'
const exec = require('child_process').exec;
const co = require('co');
const ora = require('ora');
const prompt = require('co-prompt');
const chalkTip = require('../utils/chalkTip');
const tpls = require('../../templates');
const oraSpinner = ora('init project ...');

// download-git-repo
// prompt 有空可以替换为 Inquirer.js 

const execRm = (err, projectName) => {
  oraSpinner.stop();
  if (err) {
    console.log(err);
    tip.fail('please re-run !');
    process.exit();
  }
  chalkTip.suc('loading finished !');
  chalkTip.info(`cd ${projectName} && npm install`);
  process.exit();
};

const download = (err, projectName) => {
  if (err) {
    console.log(err);
    tip.fail('please re-run !');
    process.exit();
  }
  // 删除 git 文件
  exec('cd ' + projectName + ' && rm -rf .git', (err, out) => {
    execRm(err, projectName);
  });
}

const resolve = (result) => {
  const { tplName, url, branch, projectName, } = result;
  const cmdStr = `git clone ${url} ${projectName} && cd ${projectName} && git checkout ${branch}`;
  oraSpinner.start();
  exec(cmdStr, (err) => {
    download(err, projectName);
  });
};

module.exports = () => {
 co(function *() {
    // 处理用户输入
    const tplName = yield prompt('template name: ');
    const projectName = yield prompt('project name: ');

    if (!tpls[tplName]) {
      chalkTip.fail('template does not exist!');
      process.exit();
    }

    return new Promise((resolve, reject) => {
      resolve({
        tplName,
        projectName,
        ...tpls[tplName],
      });
    });
  }).then(resolve);
}
