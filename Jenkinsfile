pipeline {
    agent any

    stages {
        stage('Instalar y Probar') {
            steps {
                dir('testing') {
                    // Instalar dependencias
                    sh 'npm install'
                    // Ejecutar pruebas
                    sh 'npx cypress run'
                }
            }
        }
    }
}