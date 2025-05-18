pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // You need to configure NodeJS in Jenkins Global Tool Configuration
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Get code from GitHub repository
                checkout scm
                echo 'Code checkout complete'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                echo 'Dependencies installed'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
                echo 'Tests completed'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint || true' // Continue even if linting fails
                echo 'Linting completed'
            }
        }
        
        stage('Build') {
            steps {
                // For a real application, you might bundle JS/CSS here
                sh 'mkdir -p dist'
                sh 'cp -R public dist/'
                sh 'cp -R src dist/'
                echo 'Build completed'
            }
        }
        
        stage('Deploy') {
            steps {
                // This is a simulated deployment step
                echo 'Deploying application...'
                sh 'sleep 5' // Simulating deployment time
                echo 'Application deployed successfully'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
        always {
            // Clean workspace after build
            cleanWs()
        }
    }
}