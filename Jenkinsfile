pipeline {
    agent any
    stages {
        stage('Build image') {
            steps {
                sh 'docker build -t weekly-cooking .'
            }
        }
        stage('Deploy container') {
            when { branch 'master'}
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    sh 'docker container stop weekly-cooking'
                }
                sh 'docker run -p 42000:443 -v /etc/ssl/private/:/etc/ssl/ -d --rm --name weekly-cooking weekly-cooking'
            }
        }
    }
}