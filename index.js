#!/usr/bin/env node
'use strict';

const program = require('commander');
const packageInfo = require('./package.json');

program
  .version(packageInfo.version)

program
  .command('init')
  .description('初始化项目')
  .alias('i')
  .action(() => {
    require('./bin/cmd/init')();
  });

program
  .command('list')
  .description('查看模板列表')
  .alias('l')
  .action(() => {
    require('./bin/cmd/list')();
  });

// 删除模板
program
  .command('delete')
  .description('删除模板')
  .alias('d')
  .action(() => {
    require('./bin/cmd/delete')();
  });
// 暂时用不到
program
  .command('add') // ll-cli-lite add
  .description('添加新模板')
  .alias('a') // 简写
  .action(() => {
    require('./bin/cmd/add')();
  });
// help
program
  .on('--help', function () {
  console.log('\n\n  Examples:')
  console.log('   ')
  console.log('  init project')
  console.log('  $ mkdir new_project')
  console.log('  $ cd new_project');
  console.log('  $ ll-cli-lite init')
  console.log('   ')
  console.log('  install node modules')
  console.log('  $ ll-cli-lite i')
  console.log('   ')
});
/************************* end **********************/

program.parse(process.argv);

if (!program.args.length) {
  program.help()
}
