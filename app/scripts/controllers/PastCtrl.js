(function() {
    function PastCtrl(Tasks) {
        
        this.taskObj = Tasks;
            
    }
    
    
    angular
        .module('blocitoff')
        .controller('PastCtrl', ['Tasks', PastCtrl]);
    
})();