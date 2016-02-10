'use strict';
(function() {    
    angular
        .module('fsApp', [
        
        // Modules
        'ui.router',
        
        // Components
        'fsApp.navigation',
        'fsApp.footer',
        'fsApp.home',
        
        // Directives
        
        // Services
        'fsApp.services'
        ])
        .config(FsAppConfig);
    
    function FsAppConfig($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                views: {
                    "navigation": { 
                        templateUrl: "components/navigation/navigation.html",
                        controller: "NavController as nav" },
                    "content": { 
                        templateUrl: "components/home/home.html",
                        controller: "HomeController as home"},
                    "footer": { 
                        templateUrl: "components/footer/footer.html",
                        controller: "FooterController as footer"}
                }
            });
        
        $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 240
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });

        $(document).ready(function(){
            $('.collapsible').collapsible({
              accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
        });
    }
})();