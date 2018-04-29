node {
   
   stage('Preparation - scm , and server setup') { 
      // Get some code from a GitHub repository - only dev branch
      git branch: 'dev', url: 'https://github.com/achisolomon/nodejs-playground.git'
      ansiblePlaybook(
            inventory: 'inventory',
            playbook: 'jenkins-build-server.yaml',
            disableHostKeyChecking: true,
            credentialsId: '314ffc1b-df03-456c-b0d2-20a3706415ec'
        ) 
   }

   stage('build') {
        sh "npm-cli-login -u achisolomon -p ${params.NpmRepoPass} -e achisolomon@gmail.com "
        sh 'npm whoami'
        sh "npm version 1.0.${env.BUILD_NUMBER}"     
   }
    stage('test'){
       echo 'add tests here'
   }
   stage('publish npm pakage'){
       sh 'npm publish --access=public'
   }
   stage('deploy npm package on moonactive server') {
        ansiblePlaybook(
            inventory: 'inventory',
            playbook: 'moonactive.yaml',
            disableHostKeyChecking: true,
            credentialsId: '1677294b-9f24-4f4d-af2f-51b040380acb'
        )
   }
}
