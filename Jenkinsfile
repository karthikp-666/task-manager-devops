pipeline {

    agent any

    stages {

        stage('Checkout') {

            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {

            steps {
                bat 'cd backend && npm install'
            }
        }

        stage('Build Docker Image') {

            steps {
                bat 'docker build -t task-manager:latest .'
            }
        }

        stage('Docker Login') {

            steps {
                bat 'docker login -u YOUR_DOCKER_USERNAME'
            }
        }

        stage('Push Docker Image') {

            steps {
                bat 'docker tag task-manager:latest YOUR_DOCKER_USERNAME/task-manager:latest'

                bat 'docker push YOUR_DOCKER_USERNAME/task-manager:latest'
            }
        }
    }
}