const message = 'Hello from Jenkins CI/CD version 2';

function renderPage(build = 'local') {
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Node.js Jenkins Lab</title>
<style>
body{font-family:Segoe UI,sans-serif;background:#edf3f8;color:#152b40;
margin:0;padding:80px 10%}main{max-width:850px;background:white;
padding:48px;border-radius:16px}h1{font-size:36px}p{font-size:20px}
.label{color:#476579;font-size:15px;letter-spacing:2px}
</style>
<main><p class="label">CSC418 DEVOPS LAB</p>
<h1>${message}</h1><p>A Node.js app delivered by Jenkins.</p>
<p>Build: <strong>${build}</strong></p></main></html>`;
}

module.exports = { message, renderPage };
