(function() {
    function taskComplete(Tasks) {
        
           
        return {
            templateUrl: '/templates/directives/checkbox.html',
            restrict: 'E',
            scope: {
              item: '@item'
            },
            link: function(scope, element, attributes) {  
                
               var taskComplete = $(element);
               
                console.log(scope.item);
                
                
                
                
                
                /* conversion */
                if (typeof scope.item !== 'object') {
                    scope.item = JSON.parse(scope.item);
                    console.log(scope.item);
                }
                
                // set row value
                scope.rowValue = scope.item.value;
                
//                scope.rowValue = scope.item.value;
                
                console.log(scope.rowValue);
                
                
//                console.log(scope.item);
                
//                console.log(scope.item.value);
//               scope.item = JSON.parse(scope.item);
//               console.log(scope.item , ' the item');
//               console.log(scope.item.hide , ' hidden');
//               console.log(scope.item.state , ' state');
                
//                 attributes.$observe( 'item', function(newValue) {
//                    console.log(newValue , ' is the item');
//                    console.log("newValue is: "+ newValue);
//                    scope.item = JSON.parse(newValue); 
//                   //scope.item = newValue;
//                   // var item = scope.item;
////                    console.log("scope.item after JSON.parse() is: " + scope.item);
//                }); 
                     
//                console.log(element, ' element');
                
//                console.log(scope, ' scope');
                
//                console.log(scope.item, ' scope item');
                
                
                /*
                * @function hide
                * @desc hides task from view and calls saveTask()
                * @param {Object} array index
                */
                scope.hideTem = function() {
                    /* conversion */
                    if (typeof scope.item !== 'object') {
                        scope.item = JSON.parse(scope.item);    
                    }                    
                                
                    console.log(scope.item);
                    console.log(scope.item.hide , ' is hidden?');
                    scope.item.hide = true;
                    scope.item.state = "complete";
                    
                    console.log(scope.item.hide, ' hidden');
                                        
                    Tasks.hide(scope.item);
                
            
                }; 
                
               /* var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        console.log("This is FINAL newValue " + newValue);
                        scope.onChange({item: newValue});
                    }
                }; */
               
            }
        };  
    }
    
    angular
        .module('blocitoff')
        .directive('taskComplete', ['Tasks', taskComplete]);
    
})();