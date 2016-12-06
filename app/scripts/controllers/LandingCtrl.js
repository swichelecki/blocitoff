(function() {
    function LandingCtrl($scope, $firebaseObject) {
        var ref = firebase.database().ref().child("data");
        // download the data into a local object
        var syncObject = $firebaseObject(ref);
        // synchronize the object with a three-way data binding
        syncObject.$bindTo($scope, "data");
    }
 
 
    angular
        .module('blocitoff')
        .controller('LandingCtrl', LandingCtrl);
    
 })();