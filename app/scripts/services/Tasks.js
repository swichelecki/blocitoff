(function() {
   function Tasks($firebaseArray, $timeout) {
        var Tasks = {};
       
        /**
        * @desc a call to firebase database
        * @type {Object}
        */
        var ref = firebase.database().ref();
       
        /**
        * @desc service that initiates a call to firebase database
        * @type {Object}
        */
        var task = $firebaseArray(ref); 
        
        /*
        * @function saveTask
        * @desc saves hidden to true in firebase database
        * @param {Object} array index
        */
        var saveTask = function(item) {
            task.$save(item); 
                
        };
        
        /**
        * @desc the miliseconds for one week
        * @type {Object}
        */
        var EXPIRATION = 7 * 24 * 60 * 60 * 1000;
        
        // TODO: Remove before production
        // var EXPIRATION = 3000;
        
        /**
        * @function addTask
        * @desc adds task 
        * @param {Object} task
        */
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

                console.log("added record with id " + id);
                console.log(task.$indexFor(id));
                console.log(time, end, value);
            });
        }
       
        /**
        * @function checkExpiration
        * @desc
        * @param 
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
        
       /** TESTING **/
         
        /** test call */
        // addTask("Feed Nigel");
        
        /** remove selected index */
       
        /*  task.$loaded()
            .then(function() {
            task.$remove(2);
        }) */
        
        /** change value of existing index */
       
        /* task.$loaded().then(function() {
            task[0].value = "Brush Nigel";
            task.$save(0);
        }); */
        
        /** remove all indexes in array */  
                
         /* task.$loaded()  
          .then(function() {
            for (var i = 0; i < task.length; i++) {
                task.$remove(i);
            }
          }); */
       
        /** END TESTING **/
            
        /**
        * @desc the firebase array holding all objects
        * @type {Object}
        */
        Tasks.task = task;
       
        /*
        * @function hide
        * @desc hides task from view and calls saveTask()
        * @param {Object} array index
        */
        Tasks.hide = function(item) {
            item.hide = true;
            saveTask(item);
            
        };
       
     return Tasks;   
   } 
    
    angular
        .module('blocitoff')
        .factory('Tasks', ['$firebaseArray', '$timeout', Tasks]);
    
})();