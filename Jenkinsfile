pipeline {
    agent any

    stages {
        stage('Instalar y Probar') {
            steps {
                dir('testing') {
                    sh 'npm install'
                    sh 'npx cypress run'
                }
            }
        }
    }
}