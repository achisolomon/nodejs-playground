// sample jenkins file  to start from
node {
   //def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository - only dev branch
      git branch: 'dev', url: 'https://github.com/achisolomon/nodejs-playground.git'
     
   }
   stage('deploy') {
       //ansiblePlaybook inventory: 'inventory', 'moonactive.yaml'
        ansiblePlaybook(
        inventory: 'inventory',
        playbook: 'moonactive.yaml'
        //,
        //extraVars: [
        //    login: 'mylogin',
        //    secret_key: [value: 'g4dfKWENpeF6pY05', hidden: true]
        //]
        )
   }
}
