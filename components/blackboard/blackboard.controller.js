'use strict';
(function () {
  angular
      .module('fsApp.blackboard', [])
      .controller('BlackboardController', ['dataFactory', 'markdownFactory', '$scope', '$timeout', BlackboardController]);

  function BlackboardController(dataFactory, markdownFactory, $scope, $timeout) {
    var blackboard = this;
    blackboard.blackBoardEntries = [];
    blackboard.getBlackBoard = getBlackBoard;

    getBlackBoard();

    ///////////////////////////////////
    function getBlackBoard() {
      dataFactory.getBlackboard({group: blackboard.group})
          .each(function (item) {
            item.text = markdownFactory.toMarkdown(item.text);
          })
          .then(function (result) {
            blackboard.blackBoardEntries = result.data;
          })
    }
  } // end BlackboardController
})();