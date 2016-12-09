(function() {
    function LandingCtrl($scope, $firebaseArray) {
        var ref = firebase.database().ref();
        var task = $firebaseArray(ref); 
        
       /* task.$add({ value: "Feed Nigel" }).then(function(ref) {
            var id = ref.key;
            console.log("added record with id " + id);
            console.log(task.$indexFor(id));
        }); */
        
         /* task.$loaded()
            .then(function() {
            task.$remove(0);
        }) */
        
        task.$loaded().then(function() {
            task[1].value = "Clean Nigel's litter box";
            task.$save(0);
        }); 
        
   
          /*  task.$loaded()  // get array from data base then run callbacks
              .then(function() {
                for (var i = 0; i < task.length; i++) {
                    task.$remove(i);
                }
              })  */
            
        $scope.task = task;
    }
 
 
    angular
        .module('blocitoff')
        .controller('LandingCtrl', LandingCtrl);
    
 })();