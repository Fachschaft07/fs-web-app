'use strict';
(function () {
  angular
      .module('fsApp.blackboard', [])
      .controller('BlackboardController', ['dataFactory', '$scope', '$timeout', BlackboardController]);

  function BlackboardController(dataFactory, $scope, $timeout) {
    var blackboard = this;
    blackboard.blackBoardEntries = [];
    blackboard.getBlackBoard = getBlackBoard;

    getBlackBoard();

    ///////////////////////////////////
    function getBlackBoard() {
      dataFactory.getBlackboard({group: blackboard.group})
          .then(function (result) {
            blackboard.blackBoardEntries = result.data;
          })
    }
  } // end BlackboardController
})();