(function() {
    function reverse() {
      return function(items) {
      return items.slice().reverse();
    };
        
    }
    
    angular
        .module("blocitoff")
        .filter("reverse", reverse);
    
})();