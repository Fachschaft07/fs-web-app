'use strict';
(function () {
    angular
        .module('fsApp.mvv', [])
        .controller('MvvController', ['$interval', 'dataFactory', MvvController]);
    
    function MvvController($interval, dataFactory) {
        var vm = this;
        var getTraffic = getTraffic;

        vm.lothstr = [];
        vm.pasing = [];
        
        var getTransportTraffic = function() {
            dataFactory.getTraffic({ location: 'LOTHSTR' })
                .then(function(result){
                    vm.lothstr = result.data;
            })
            
            dataFactory.getTraffic({ location: 'PASING' })
                .then(function(result){
                    vm.pasing = result.data;

            })
        }

        $interval(getTransportTraffic, 1000);
    }
})();