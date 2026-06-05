pipeline {
    agent any
    tools { nodejs 'Node20' }
    stages {
        // ETAPA 1: Descarga y verificación del código fuente
        stage('1. Checkout SCM') {
            steps {
                echo 'Verificando repositorio y descargando última versión del código...'
                checkout scm
            }
        }
        
        // ETAPA 2: Preparación del entorno y dependencias del sistema operativo
        stage('2. OS Environment Setup') {
            steps {
                echo 'Instalando librerías del sistema operativo para entorno virtualizado...'
                sh '''
                    sudo apt-get update || apt-get update
                    sudo apt-get install -y xvfb libgtk-3-0 libnotify4 libnss3 libxss1 libasound2t64 libxtst6 xauth dbus-x11
                '''
            }
        }
        
        // ETAPA 3: Auditoría y escaneo de vulnerabilidades (DevSecOps)
        stage('3. DevSecOps Security Scan') {
            steps {
                echo 'Ejecutando auditoría de seguridad sobre dependencias de Node.js...'
                dir('testing') {
                    sh 'npm audit --audit-level=high || true'
                }
            }
        }
        
        // ETAPA 4: Instalación de dependencias del proyecto (Node/Cypress)
        stage('4. Install Project Dependencies') {
            steps {
                echo 'Instalando paquetes de npm y Cypress...'
                dir('testing') {
                    sh 'npm install'
                }
            }
        }
        
        // ETAPA 5: Ejecución de la suite completa de pruebas (UI & API)
        stage('5. Execute Automation Tests') {
            steps {
                echo 'Iniciando servidor de pantalla virtual y ejecutando Cypress...'
                dir('testing') {
                    sh 'xvfb-run --server-args="-screen 0 1280x1024x24" npx cypress run --headless'
                }
            }
            post {
                always {
                    echo 'Archivando evidencias visuales generadas por Cypress...'
                    archiveArtifacts artifacts: 'testing/cypress/screenshots/**/*, testing/cypress/videos/**/*', allowEmptyArchive: true
                }
                success {
                    echo 'Disparando Webhook de éxito hacia el orquestador n8n...'
                    sh 'curl -X POST -H "Content-Type: application/json" -d \'{"status": "SUCCESS", "project": "Ecosistema CI/CD", "message": "Las pruebas automatizadas en la suite principal se han ejecutado con éxito."}\' http://host.docker.internal:5678/webhook/jenkins-cypress-alert'
                }
            }
        }
    }
}