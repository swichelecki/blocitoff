(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        
        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            .state('past', {
                url: '/past',
                controller: 'PastCtrl as past',
                templateUrl: '/templates/past.html'
            
        });
        
        }
    
    angular
        .module('blocitoff', ['ui.router', 'firebase'])
        .config(config);
    
})();