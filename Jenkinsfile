pipeline {
    agent {dockerfile true}
    stages {
        stage('Build') {
            steps {
                echo 'I built a container'
            }
        }
        // stage('Deploy') {
        //     steps{
        //         sh 'docker run -it -p 42000:80 --rm --name weekly-cooking weekly-cooking'
        //     }
        // }
    }
}