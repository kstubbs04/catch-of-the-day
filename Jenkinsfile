pipeline {
  agent any
  stages {
    stage('Clear Packages') {
      steps {
        sh 'rm -rf node_modules'
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
}