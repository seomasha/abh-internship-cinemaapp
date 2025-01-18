pipeline {
    agent any
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        GITHUB_TOKEN = credentials('gh-token3')
        TEAM1_OMDB_API_KEY = credentials('TEAM1_OMDB_API_KEY')
        TEAM1_STRIPE_PK = credentials('TEAM1_STRIPE_PK')
        TEAM1_EXCHANGE_RATE_API_KEY = credentials('TEAM1_EXCHANGE_RATE_API_KEY')
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'dev',
                    credentialsId: 'gh-token3',
                    url: 'https://github.com/seomasha/abh-internship-cinemaapp.git'
            }
        }
        stage('Prepare .env File') {
            steps {
                script {
                    sh '''
                    cd cinemaapp_frontend
                    echo "VITE_BACKEND_URL=http://63.176.2.136:8083" > .env
                    echo "VITE_API_PATH=/api/v1" >> .env
                    echo "VITE_OMDB_API_KEY=${TEAM1_OMDB_API_KEY}" >> .env
                    echo "VITE_STRIPE_PK=${TEAM1_STRIPE_PK}" >> .env
                    echo "VITE_EXCHANGE_RATE_URL=https://v6.exchangerate-api.com/v6/" >> .env
                    echo "VITE_EXCHANGE_RATE_API_KEY=${TEAM1_EXCHANGE_RATE_API_KEY}" >> .env
                    '''
                }
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    sh 'docker-compose down --remove-orphans || true'
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
