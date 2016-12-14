(function() {
    function LandingCtrl($scope, $firebaseArray, $timeout) {
        var ref = firebase.database().ref();
        var task = $firebaseArray(ref); 
        
        /*
        * @function removeTask
        * @desc removes task hidden by hide() from database
        * @param {Object} array index
        */
        var removeTask = function(item) {
            task.$remove(item);
        };
        
        // create a function to add a task
        
        var EXPIRATION = 7 * 24 * 60 * 60 * 1000;
        
        // TODO: Remove before production
       // var EXPIRATION = 3000;
        
        function addTask(value) {
            var d = new Date();
            var time = d.getTime();
            var end = time + EXPIRATION;
            
            task.$add({
                creationDate: time,
                expirationDate: end,
                value: value,
                hide: false
            }).then(function(ref) {
                var id = ref.key;

                console.log(time);
                console.log("added record with id " + id);
                console.log(task.$indexFor(id));
                console.log(time, end, value);
            });
        }
        
         
        
        addTask("Feed Nigel");
        
        /*  task.$loaded()
            .then(function() {
            task.$remove(2);
        }) */
        
       /* task.$loaded().then(function() {
            task[0].value = "Brush Nigel";
            task.$save(0);
        }); */
        
            // .createdDate
/*        
         task.$loaded()  // get array from data base then run callbacks
          .then(function() {
            for (var i = 0; i < task.length; i++) {
                task.$remove(i);
            }
          });
          */
    

        function checkExpirations() {
            for (var i = 0; i < task.length; i++) {
                // checks expiration
                // and expires if necessary
                console.log("the expiration date is", task[i].expirationDate);
                
                if (task[i].expirationDate < (new Date()).getTime()) {
                    console.log("A task is expired");
                    task.$remove(task[i]);
                }
            }
        }
        
        task.$loaded().then(function() {
            console.log("Setting interval for expiration");
            setInterval(checkExpirations, 3000);
        });
        
        
      /*  $timeout(removeTask, 2000);
      
      function removeTask() {
            task.$loaded().then(function() {
                for (var i = 0; i < task.length; i++) {
                    task.$remove(i);
                    console.log("it ran");
                }
            });
            
        } */
            
        $scope.task = task;
        
        //$scope.hideAttr = null;
        
        /*
        * @function hide
        * @desc hides task from view and calls removeTask()
        * @param {Object} array index
        */
        $scope.hide = function(item) {
            item.hide = true;
            removeTask(item);
            
            var item = item;
            var index = task.indexOf(item);
         
            console.log(item);
            console.log(index);
        };
    }
    
    
 
 
    angular
        .module('blocitoff')
        .controller('LandingCtrl', LandingCtrl);
    
 })();