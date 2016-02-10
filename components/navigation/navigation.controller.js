(function() {
    'use strict';
    
    angular
        .module('fsApp.navigation', [])
        .controller('NavController', [NavController]);
    
    function NavController() {
        $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 240
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });
    };
    
    
})();