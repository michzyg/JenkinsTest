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
            post {
                always {
                    // Publish JUnit test results
                    junit 'test-results/junit.xml'
                }
            }
        }
        
        stage('Lint') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    bat 'npm run lint'
                }
                bat 'echo Linting completed or skipped'
            }
        }
        
        stage('SonarQube Analysis') {
            when {
                // Only run this stage if sonar-scanner is available
                expression { 
                    return fileExists('sonar-project.properties') 
                }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    withSonarQubeEnv('SonarQube') {
                        bat 'sonar-scanner'
                    }
                }
                bat 'echo SonarQube analysis completed or skipped'
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
                bat 'ping -n 6 127.0.0.1 > nul'
                bat 'echo Application deployed successfully'
            }
        }
    }
    
    post {
        success {
            bat 'echo Pipeline completed successfully!'
            emailext (
                subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
                to: 'michzyg040@student.polsl.pl',
                attachLog: true
            )
        }
        failure {
            bat 'echo Pipeline failed. Please check the logs for details.'
            emailext (
                subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: """<p>FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                <p>Check console output at <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
                to: 'michzyg040@student.polsl.pl',
                attachLog: true
            )
        }
        always {
            cleanWs()
        }
    }
}