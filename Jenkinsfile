pipeline {
    agent any
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        GITHUB_TOKEN = credentials('gh-token3')
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    credentialsId: 'gh-token3',
                    url: 'https://github.com/seomasha/abh-internship-cinemaapp.git'
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }
    post {
        always {
            script {
                sh 'docker-compose logs'
            }
        }
    }
}
