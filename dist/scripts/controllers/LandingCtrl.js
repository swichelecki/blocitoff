(function() {
    function LandingCtrl($scope, $firebaseArray) {
        var ref = firebase.database().ref();
        var task = $firebaseArray(ref); 
        
        task.$add({ value: "Pet Nigel" }).then(function(ref) {
            var id = ref.key;
            console.log("added record with id " + id);
            console.log(task.$indexFor(id));
        });
        
        //task.$destroy(33);
        
        for (var i = 0; i < task.length; i++) {
             task.$remove(i);
    
        }
        
        //task.$remove();
        //task[3].value = "good";
        //task.$save(3);
        //task[3].value = "good";
        //task.$save(3);
        
        $scope.task = task;
    }
 
 
    angular
        .module('blocitoff')
        .controller('LandingCtrl', LandingCtrl);
    
 })();