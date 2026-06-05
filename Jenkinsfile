pipeline {
    agent any

    stages {
        stage('Instalar y Probar') {
            agent {
                // Usamos una imagen de Node.js para ejecutar las pruebas de Cypress
                docker { 
                    image 'node:20-bookworm' 
                    // Permite que el contenedor corra con los permisos correctos en Jenkins
                    args '-u root'
                }
            }
            steps {
                dir('testing') {
                    // Instalamos las dependencias
                    sh 'npm install'
                    // Corremos Cypress usando npx
                    sh 'npx cypress run'
                }
            }
        }
    }
}