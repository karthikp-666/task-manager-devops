// pipeline {

//     agent any

//     stages {

//         stage('Checkout') {

//             steps {
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {

//             steps {
//                 bat 'cd backend && npm install'
//             }
//         }

//         stage('Build Docker Image') {

//             steps {
//                 bat 'docker build -t task-manager:latest .'
//             }
//         }

//         stage('Docker Login') {

//             steps {
//                 bat 'docker login -u YOUR_DOCKER_USERNAME'
//             }
//         }

//         stage('Push Docker Image') {

//             steps {
//                 bat 'docker tag task-manager:latest YOUR_DOCKER_USERNAME/task-manager:latest'

//                 bat 'docker push YOUR_DOCKER_USERNAME/task-manager:latest'
//             }
//         }
//     }
// }

pipeline {

    agent any

    environment {

        DOCKER_IMAGE = "karthikp123kar/task-manager"
        IMAGE_TAG = "${BUILD_NUMBER}"

    }

    stages {

        stage('Checkout') {

            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {

            steps {
                bat '''
                    cd backend
                    npm ci
                '''
            }
        }

        stage('Test') {

            steps {
                bat '''
                    cd backend
                    npm test -- --passWithNoTests
                '''
            }
        }

        stage('Build Docker Image') {

            steps {
                bat """
                    docker build -t %DOCKER_IMAGE%:%IMAGE_TAG% .
                """
            }
        }

        stage('Docker Login') {

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat '''
                        docker login -u "%DOCKER_USER%" -p "%DOCKER_PASSWORD%"
                    '''
                }
            }
        }

        stage('Push Docker Image') {

            steps {
                bat """
                    docker push %DOCKER_IMAGE%:%IMAGE_TAG%
                """
            }
        }

        stage('Deploy Kubernetes') {

            steps {

                bat """
                    kubectl set image deployment/task-manager task-manager=%DOCKER_IMAGE%:%IMAGE_TAG% -n task-manager
                """

                bat """
                    kubectl rollout status deployment/task-manager -n task-manager
                """
            }
        }
    }

    post {

        success {
            echo "CI/CD pipeline completed successfully."
        }

        failure {
            echo "CI/CD pipeline failed."
        }
    }
}