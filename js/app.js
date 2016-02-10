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
        'fsApp.blackboard',
        
        // Directives
        
        // Services
        'fsApp.services',
        'fsApp.filter'
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
            })
            .state('blackboard', {
                url: "/blackboard",
                views: {
                    "navigation": { 
                        templateUrl: "components/navigation/navigation.html",
                        controller: "NavController as nav" },
                    "content": { 
                        templateUrl: "components/blackboard/blackboard.html",
                        controller: "BlackboardController as blackboard"},
                    "footer": { 
                        templateUrl: "components/footer/footer.html",
                        controller: "FooterController as footer"}
                }
            });
    }
})();