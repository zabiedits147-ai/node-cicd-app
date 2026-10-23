const fs = require('node:fs');
const { renderPage } = require('../src/app');

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', renderPage(process.env.BUILD_NUMBER || 'local'));
console.log('Built dist/index.html');
