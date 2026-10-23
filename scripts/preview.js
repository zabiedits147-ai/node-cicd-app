const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const target = process.argv[2] || 'freestyle';
const ports = { freestyle: 3001, declarative: 3002, scripted: 3003 };
if (!ports[target]) throw new Error('Unknown preview target');
const root = process.env.LAB_DEPLOY_ROOT || 'C:/JenkinsLab/node-cicd';
const file = path.join(root, target, 'index.html');

http.createServer((req, res) => {
  if (req.url !== '/') { res.writeHead(404); return res.end('Not found'); }
  res.setHeader('Cache-Control', 'no-store');
  try {
    const page = fs.readFileSync(file);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page);
  } catch (error) {
    res.writeHead(error.code === 'ENOENT' ? 503 : 500);
    res.end('No deployment yet. Run the Jenkins job successfully first.');
  }
}).listen(ports[target], '127.0.0.1', () => {
  console.log(`Preview: http://localhost:${ports[target]}/`);
  console.log(`Reading: ${file}`);
});
