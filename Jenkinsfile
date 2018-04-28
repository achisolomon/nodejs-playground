// sample jenkins file  to start from
node {
   //def mvnHome
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      git 'https://github.com/achisolomon/nodejs-playground.git'
     
   }
   stage('deploy') {
       ansiblePlaybook 'moonactive.yaml'
   }
}
