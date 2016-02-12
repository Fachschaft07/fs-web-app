'use strict';
(function () {
    angular
        .module('fsApp.blackboard', [])
        .controller('BlackboardController', ['dataFactory', '$scope', '$timeout', BlackboardController]);
    
    function BlackboardController(dataFactory, $scope, $timeout) {
        console.log('BlackboardController');
        var vm = this;
        vm.blackBoardEntries = [];
        
        getBlackBoard();
        
        ///////////////////////////////////
        function getBlackBoard() {
            dataFactory.getBlackboard()
                .then(function(result) {
                    vm.blackBoardEntries = result.data;
                
                
            })
        }   
    } // end BlackboardController
})();