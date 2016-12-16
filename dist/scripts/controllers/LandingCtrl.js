(function() {
    function LandingCtrl(Tasks) {
        
        this.taskObj = Tasks;
        
    }
    
    
    angular
        .module('blocitoff')
        .controller('LandingCtrl', ['Tasks', LandingCtrl]);
    
})();