// sample jenkins file  to start from
node {
   //def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository - only dev branch
      git branch: 'dev', url: 'https://github.com/achisolomon/nodejs-playground.git'
     
   }
   stage('prepare server') {
        ansiblePlaybook(
            inventory: 'inventory',
            playbook: 'moonactive.yaml',
            disableHostKeyChecking: true,
            credentialsId: '9361ae94-2cd8-4069-8867-fb5c9e33100a'
            //credentialsId: '~/.ssh/ma-home-exercise-achi.pem'
            //,
            //extraVars: [
            //    login: 'mylogin',
            //    secret_key: [value: 'g4dfKWENpeF6pY05', hidden: true]
            //]
        )
   }
}
