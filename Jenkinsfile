pipeline {
    agent any
    stages {
        stage('Build image') {
            steps {
                sh 'docker build -t weekly-cooking .'
            }
        }
        stage('Stop container') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'docker container stop weekly-cooking'
                }
            }
        }
        stage('Run container') {
            steps{
                sh 'docker run -p 42000:80 -d --rm --name weekly-cooking weekly-cooking'
            }
        }
    }
}