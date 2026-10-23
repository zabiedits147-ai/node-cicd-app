pipeline {
  agent any
  triggers { pollSCM('H/2 * * * *') }
  options {
    skipDefaultCheckout(true)
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 10, unit: 'MINUTES')
  }
  parameters {
    booleanParam(name: 'DEPLOY', defaultValue: true,
      description: 'Publish to the local lab preview')
  }
  environment {
    LAB_DEPLOY_ROOT = 'C:/JenkinsLab/node-cicd'
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { bat 'npm.cmd ci' }
    }
    stage('Test') {
      steps { bat 'npm.cmd test' }
    }
    stage('Build') {
      steps { bat 'npm.cmd run build' }
    }
    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
    stage('Deploy') {
      when { expression { params.DEPLOY } }
      steps { bat 'npm.cmd run deploy -- declarative' }
    }
  }
  post {
    success { echo 'CI passed. Check the Deploy stage for publication.' }
    failure { echo 'Failed. Inspect Console Output before retrying.' }
    always { echo "Finished build ${env.BUILD_NUMBER}" }
  }
}
