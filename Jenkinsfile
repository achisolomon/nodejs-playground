// sample jenkins file  to start from
node {
   //def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      git 'https://github.com/achisolomon/nodejs-playground.git'
     
   }
   stage('Build') {
      //TODO
   }
   stage('Results') {
      //TODO
            
   }
   stage('deploy') {
       ansiblePlaybook 'moonactive.yaml'
   }
}
