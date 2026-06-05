pipeline {
    agent any

    stages {
        stage('Instalar y Probar') {
            steps {
                dir('testing') {
                    bat 'npm install'
                    bat 'npx cypress run'
                }
            }
        }
    }
}