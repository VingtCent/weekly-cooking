pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t weekly-cooking .'
            }
        }
        stage('Deploy') {
            steps{
                sh 'docker run -it -p 42000:80 --rm --name weekly-cooking weekly-cooking'
            }
        }
    }
}