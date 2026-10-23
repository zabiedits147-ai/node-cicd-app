const fs = require('node:fs');
const path = require('node:path');
const target = process.argv[2];
if (!['freestyle', 'declarative', 'scripted'].includes(target)) {
  throw new Error('Use freestyle, declarative or scripted as the target');
}
const root = process.env.LAB_DEPLOY_ROOT || 'C:/JenkinsLab/node-cicd';
const folder = path.join(root, target);
fs.mkdirSync(folder, { recursive: true });
const temp = path.join(folder, `index-${process.pid}.tmp`);
fs.copyFileSync('dist/index.html', temp);
fs.renameSync(temp, path.join(folder, 'index.html'));
console.log(`Deployed to ${folder}`);
