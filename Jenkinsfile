// sample jenkins file  to start from
node {
   //def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository - only dev branch
      git branch: 'dev', url: 'https://github.com/achisolomon/nodejs-playground.git'
     
   }

   stage('setup build server') {
        ansiblePlaybook(
            inventory: 'inventory',
            playbook: 'jenkins-build-server.yaml',
            disableHostKeyChecking: true,
            credentialsId: '314ffc1b-df03-456c-b0d2-20a3706415ec'
        )
   }

   stage('build publish npm pakage'){
       sh 'npm init --yes'
       sh 'npm install request --save'
       sh 'npm whoami'
       sh 'npm publish'
   }

   stage('ping server') {
        ansiblePlaybook(
            inventory: 'inventory',
            playbook: 'moonactive.yaml',
            disableHostKeyChecking: true,
            credentialsId: '1677294b-9f24-4f4d-af2f-51b040380acb'
        )
   }
}
