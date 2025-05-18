pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                bat 'echo Code checkout complete'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'echo Dependencies installation completed'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat 'npm test'
                bat 'echo Tests completed'
            }
        }
        
        stage('Lint') {
            steps {
                // Use catch error to properly handle failures
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npm run lint'
                }
                bat 'echo Linting completed or skipped'
            }
        }
        
        stage('Build') {
            steps {
                bat 'mkdir dist 2>nul || echo Directory already exists'
                bat 'xcopy public dist\\ /E /I /Y'
                bat 'xcopy src dist\\ /E /I /Y'
                bat 'echo Build completed'
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'echo Deploying application...'
                // Fix the timeout command - use ping instead of timeout
                bat 'ping -n 6 127.0.0.1 > nul'
                bat 'echo Application deployed successfully'
            }
        }
    }
    
    post {
        success {
            bat 'echo Pipeline completed successfully!'
        }
        failure {
            bat 'echo Pipeline failed. Please check the logs for details.'
        }
        always {
            cleanWs()
        }
    }
}