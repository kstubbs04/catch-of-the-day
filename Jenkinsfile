pipeline {
  agent any
  stages {
    stage('Clear Packages') {
      steps {
        sh 'rm -rf node_modules && npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Update S3') {
      steps {
        sh 'cd build && aws s3 sync build/ s3://catchoftheday.latitude25.ca '
      }
    }
  }
}