'use strict';
(function () {
    angular
        .module('fsApp.mvv', [])
        .controller('MvvController', ['$interval', 'dataFactory', '$scope', MvvController]);
    
    function MvvController($interval, dataFactory, $scope) {
        var vm = this;
        vm.lothstr = [];
        vm.pasing = [];
        
        var promise;
        var getTransportTraffic = getTransportTraffic;
        
        startInterval();       
        
        /////////////////////////////////////////////////////
        function getTransportTraffic() {
            dataFactory.getTraffic({ location: 'LOTHSTR' })
                .then(function(result){
                    vm.lothstr = result.data;
            })
            
            dataFactory.getTraffic({ location: 'PASING' })
                .then(function(result){
                    vm.pasing = result.data;

            })
        }

        function startInterval() {
            promise = $interval(getTransportTraffic, 1000);
        }
        
        // Destroy Interval on state change 
        $scope.$on("$destroy",function(){
            $interval.cancel(promise);
        });
    }
})();