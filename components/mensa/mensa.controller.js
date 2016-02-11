'use strict';
(function () {
    angular
        .module('fsApp.mensa', [])
        .controller('MensaController', ['dataFactory', MensaController]);
    
    function MensaController(dataFactory) {
        var vm = this;
        vm.meals = [];
        
        getMensaMenus();
        
        //////////////////////////////////////////////////
        
        function getMensaMenus() {
            dataFactory.getMensaMeal({ location: 'MENSA_LOTHSTRASSE' })
                .then(function(result) {
                    vm.melas = result.data;
                console.log(result.data);
            })
        }
    }
})();