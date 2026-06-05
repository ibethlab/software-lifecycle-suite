# Software Lifecycle Suite 🚀

Ecosistema integrado de automatización de pruebas E2E y API, integración continua (CI/CD) y gestión de eventos con enfoque en DevSecOps.

## Stack Tecnológico
![Cypress](https://img.shields.io/badge/-Cypress-17202C?style=flat&logo=cypress)
![Jenkins](https://img.shields.io/badge/-Jenkins-D24939?style=flat&logo=jenkins)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=docker)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript)
![n8n](https://img.shields.io/badge/-n8n-FF6F61?style=flat&logo=n8n)

## Arquitectura del Pipeline (CI/CD/DevSecOps)

```mermaid
graph LR
    A[GitHub Push] --> B[Jenkins Pipeline]
    B --> C[Security Scan - npm audit]
    C --> D[Cypress E2E & API]
    D --> E[Artifacts Archiving]
    E --> F[Webhook - n8n]
    F --> G[Gmail Notification]