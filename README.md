# Jenkins Node.js CI/CD Lab

A small, dependency-free Node.js app for learning Freestyle jobs, Declarative Pipeline and Scripted Pipeline on Windows. Use Node.js 22 or newer (the recorded lab uses Node.js 24), npm, Git and Jenkins with the Git and Pipeline plugins.

## Local checks

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run build
```

`src/app.js` renders a page. The test runner checks the greeting and build marker. The build writes `dist/index.html`. The deployment script publishes that file outside the Jenkins workspace, in `C:/JenkinsLab/node-cicd/<target>`.

## Jenkins jobs

Create three separate jobs using branch `*/main`:

- Freestyle: Git SCM, then Execute Windows batch command `call freestyle.cmd`; archive `dist/**` after success.
- Pipeline: Pipeline script from SCM, Git, Script Path `Jenkinsfile`.
- Pipeline: same settings, Script Path `Jenkinsfile.scripted`.

Use a Windows executor that can run `node`, `npm.cmd` and `git`. On a shared or production controller use a separate Windows agent. This classroom app and its scripts are trusted example code; review changed code before running it.

The default Pipeline `agent any` and Scripted `node` assume all eligible executors are Windows. In a mixed environment use an administrator-provided label, e.g. `agent { label 'windows' }` or `node('windows')`.

Start each preview in a separate ordinary PowerShell window from this source folder, outside Jenkins:

```powershell
npm.cmd run preview -- freestyle
npm.cmd run preview -- declarative
npm.cmd run preview -- scripted
```

Use one command per window, then browse ports 3001, 3002 and 3003 respectively. The servers listen only on loopback, read the latest deployed file on each request, and stop with Ctrl+C. Before the first deployment they return HTTP 503. Ensure the Jenkins build identity can write to the deployment folder and the preview identity can read it. If `LAB_DEPLOY_ROOT` is changed, give the same value to jobs and preview terminals.

For local CI automation, enable Poll SCM with `H/2 * * * *`. This polls about every two minutes and builds only on changes. GitHub cannot deliver directly to localhost; webhook setup requires a separately reachable Jenkins endpoint. Disable polling after the lab.

The Pipeline files are designed for **Pipeline script from SCM**, because they use `checkout scm`. For inline **Pipeline script**, replace checkout with a `git branch: 'main', url: 'https://github.com/YOUR-USER/YOUR-REPO.git'` step.

This is a local teaching deployment of a static page generated and served by Node.js. It is not a production Node.js process manager, cloud deployment or high-availability release system.
