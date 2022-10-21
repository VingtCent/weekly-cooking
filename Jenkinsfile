node {
    def app

        stage('Build image') {
            app = docker.build('weekly-cooking')
        }
// stage('Deploy') {
//     steps{
//         sh 'docker run -it -p 42000:80 --rm --name weekly-cooking weekly-cooking'
//     }
// }
}
