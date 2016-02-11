'use strict';
(function() {
    angular
        .module('fsApp.jobs', [])
        .controller('JobsController', ['dataFactory', JobsController]);
    
    function JobsController(dataFactory) {
        var vm = this;
        vm.jobs = [];
        
        
        getJobs();
        
        /////////////////////////////////////////
        function getJobs() {
            dataFactory.getJobs()
                .then(function(result) {
                    vm.jobs = result.data;
                
                    /*$timeout(function(){
                        $('.collapsible').collapsible({});
                    },500);*/
            })
        }
    }    
})();