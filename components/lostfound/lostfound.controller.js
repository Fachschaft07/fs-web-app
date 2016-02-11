'use strict';
(function () {
    angular
        .module('fsApp.lostfound', [])
        .controller('LostFoundController', ['dataFactory', LostFoundController]);
    
    function LostFoundController(dataFactory) {
        var vm = this;
        vm.list = [];
        
        getLostFound();
        
        function getLostFound() {
            dataFactory.getLostFound()
                .then(function(result) {
                    vm.list = result.data;
                console.log(result.data);
            })
        }
    }    
})();