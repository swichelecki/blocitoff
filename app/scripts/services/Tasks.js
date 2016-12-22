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
        //var EXPIRATION = 3000;
       
        /**
        * @function addTask
        * @desc adds task 
        * @param {Object} task, select and select
        */
        var addTask = function(value, select) {
            var d = new Date();
            var time = d.getTime();
            var end = time + EXPIRATION;
            
            task.$add({
                creationDate: time,
                expirationDate: end,
                value: value,
                select: select,
                hide: false
            }).then(function(ref) {
                var id = ref.key;
                console.log("added record with id " + id);
                console.log("the index of the record is " + task.$indexFor(id));
                console.log(time, end, value, "priority is " + select);
            });
            
        };
       
        /**
        * @function checkExpiration
        * @desc checks task expiration date and deletes expired tasks
        * @param {Object} task
        */
        function checkExpirations() {
            for (var i = 0; i < task.length; i++) {
                
                if (task[i].expirationDate < (new Date()).getTime()) {
                    console.log("A task is expired");
                    task.$remove(task[i]);
  
                }
            }
        }
        
        task.$loaded().then(function() {
            setInterval(checkExpirations, 3000);
        });
       
       
        /*
        * @function taskLimit
        * @desc limits the number of completed tasks to eight
        * @param {Object} task
        */
        /*function activeTaskLimit() {
            if (task.length > 7) {
                for (var i = 0; i < task.length; i++) {
                    if (task[i].hide === false) {
                        alert("You must complete one task before adding more!");
                        task.$remove(task[i]);    
                  }
              }
         }
        }
         
        task.$loaded().then(function() {
           setInterval(activeTaskLimit, 3000); 
       }); */
       
        /*
        * @function taskLimit
        * @desc limits the number of completed tasks to eight
        * @param {Object} task
        */
        function taskLimit() {
         if (task.length > 8) {
             for (var i = 0; i < task.length; i--) {
                 if (task[i].hide) {
                     task.$remove(task[i]);    
                  }
              }
         }
        }
       
        task.$loaded().then(function() {
           setInterval(taskLimit, 3000); 
        }); 
    
        
       /** TESTING **/
         
        /** test call */
        //addTask("Feed Nigel");
        
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
        
        /* remove all indexes in array */  
                
        /* task.$loaded()  
          .then(function() {
            for (var i = 0; i < task.length; i++) {
                    task.$remove(task[i]);    
                }
          }); 
       
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
       
       /*
        * @function taskFunc
        * @desc adds new task
        * @param {Object} ngModel value
        */
       Tasks.taskFunc = function(value, select) {
           if (select == null) {
                alert("You must enter a priority!");
           } else {
                addTask(value, select);
           }
       }; 
       
       Tasks.checkbox = function(item) {
           if (item.select == 0) {
               return {'background-color': '#ef3434'};
           } else if (item.select == 1) {
               return {'background-color': '#ef9a34'};
           } else if (item.select == 2) {
               return {'background-color': '#efe934'};
           }
        
       };
       
       
     return Tasks;   
   } 
    
    angular
        .module('blocitoff')
        .factory('Tasks', ['$firebaseArray', '$timeout', Tasks]);
    
})();