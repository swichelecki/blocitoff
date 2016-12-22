(function() {
    function LandingCtrl($scope, Tasks) {
    
        $scope.taskObj = Tasks;
        
    }
    
    
    angular
        .module('blocitoff')
        .controller('LandingCtrl', ['$scope', 'Tasks', LandingCtrl]);
    
})();