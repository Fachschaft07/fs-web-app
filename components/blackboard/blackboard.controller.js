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
        //http://fs.cs.hm.edu/rest/api/1/blackboard?search="+search+"&group="+search
        function getBlackBoard() {
            dataFactory.getBlackboard()
                .then(function(result) {
                    vm.blackBoardEntries = result.data;
                    console.log(result.data);
                
                $timeout(function(){
                    $('.collapsible').collapsible({});
                },500);
            })
        }   
    } // end BlackboardController
})();