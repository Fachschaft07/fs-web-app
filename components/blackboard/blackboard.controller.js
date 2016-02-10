'use strict';
(function () {
    angular
        .module('fsApp.blackboard', [])
        .controller('BlackboardController', ['dataFactory', BlackboardController]);
    
    function BlackboardController(dataFactory) {
        var vm = this;
        vm.blackBoardEntries = [];
        
        
        getBlackBoard();
        
        ///////////////////////////////////
        //http://fs.cs.hm.edu/rest/api/1/blackboard?search="+search+"&group="+search
        function getBlackBoard() {
            dataFactory.getBlackboard()
                .then(function(result) {
                    vm.blackBoardEntries = result.data;
            })
        }        
    }
})();