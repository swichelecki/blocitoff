(function() {
    function taskComplete(Tasks) {
        
        return {
            //templateUrl: '/templates/directives/checkbox.html',
            restrict: 'E',
            scope: {
              item: '@'
            },
            link: function(scope, element, attributes) {  
                
               var taskComplete = $(element);
               
                attributes.$observe('item', function(newValue) {
                    scope.item = newValue;
                    console.log('here is original state in directive:', scope.item);
                });
                                
                Tasks.hide = function(item) {
                    scope.item = "complete";
                    var state = scope.item;
                    console.log('here is changed state in directive:', state);
                    Tasks.hideFinal(item, state);
               
                };
                
            }
        };  
    }
    
    angular
        .module('blocitoff')
        .directive('taskComplete', ['Tasks', taskComplete]);
    
})();