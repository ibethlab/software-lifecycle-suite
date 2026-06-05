pipeline {
    agent any

    tools {
        // Jenkins "Node20" recien configurado para usar Node.js
        nodejs 'Node20'
    }

    stages {
        stage('Instalar y Probar') {
            steps {
                dir('testing') {
                    // Instalar dependencias y ejecutar pruebas Cypress
                    sh 'npm install'
                    sh 'npx cypress run'
                }
            }
        }
    }
}