pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    stages {
        stage('Preparar Sistema') {
            steps {
                // Actualizamos los repositorios del Linux de Jenkins e instalamos las dependencias del sistema
                sh '''
                    echo "Instalando dependencias del sistema operativo para Cypress..."
                    sudo apt-get update || apt-get update
                    sudo apt-get install -y xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth dbus-x11 || apt-get install -y xvfb libgtk-3-0 libnotify4 libnss3 libxss1 libasound2t64 libxtst6 xauth dbus-x11
                '''
            }
        }

        stage('Instalar y Probar') {
            steps {
                dir('testing') {
                    //Instalamos las dependencias
                    sh 'npm install'
                    // Ejecutamos Cypress envuelto en la pantalla virtual xvfb-run
                    sh 'xvfb-run --server-args="-screen 0 1280x1024x24" npx cypress run --headless'
                }
            }
            post{
                always {
                    // Capturas en Jenkins de los screenshots y videos generados por Cypress, incluso si las pruebas fallan
                    archiveArtifacts artifacts: 'testing/cypress/screenshots/**/*, testing/cypress/videos/**/*', allowEmptyArchive: true
                }
                success {
                    // Alerta automatizada hacia n8n mediante cURL para indicar que las pruebas en la suite principal se han ejecutado con éxito
                    sh 'curl -X POST -H "Content-Type: application/json" -d \'{"status": "SUCCESS", "project": "Ecosistema CI/CD", "message": "Las pruebas automatizadas en la suite principal se han ejecutado con éxito."}\' http://localhost:5678/webhook-test/jenkins-cypress-alert'
                }
            }
        }
    }
}