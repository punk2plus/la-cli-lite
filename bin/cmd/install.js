const program = require('commander');
const fs = require('fs-extra');
const { exec } = require('child_process');
const path = require('path');
const cwd = process.cwd();

exports.defineCmd = function(cmd, desc) {
  program
    .command('install')
    .alias('i')
    .description('install node modules')
    .option('-c, --client', 'install client node modules')
    .option('-s, --server', 'install server node modules')
    .action(option => {
        const isFullApp = fs.existsSync(path.join(cwd, 'server')) && fs.existsSync(path.join(cwd, 'client'));
        const cmds = [];
        if (isFullApp) {
          const noFlag = !option.client && !option.server;
          if ((option.client && option.server) || noFlag) {
            cmds.push('--names "Client,Server"');
          }
          if (option.client || noFlag) {
            cmds.push(`"cd client && tnpm ii"`);
          }
          if (option.server || noFlag) {
            cmds.push(`"cd server && tnpm ii"`);
          }
        } else {
          cmds.push('"tnpm ii"');
        }

        if (cmds.length === 1) {
          cmds.push('--raw');
        }

        exec(`npx concurrently ${cmds.join(" ")}`, {
            cwd,
        }, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        }).stdout.pipe(process.stdout);
    });
}