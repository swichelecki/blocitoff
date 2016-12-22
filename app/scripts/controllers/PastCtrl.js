(function() {
    function PastCtrl($scope, Tasks) {
        
        $scope.taskObj = Tasks;
            
    }
    
    
    angular
        .module('blocitoff')
        .controller('PastCtrl', ['$scope', 'Tasks', PastCtrl]);
    
})();