'use strict';
(function () {
  angular
      .module('fsApp.lostfound', [])
      .controller('LostFoundController', ['dataFactory', LostFoundController]);

  function LostFoundController(dataFactory) {
    var lostfound = this;
    lostfound.list = [];

    getLostFound();

    function getLostFound() {
      dataFactory.getLostFound()
          .then(function (result) {
            lostfound.list = result.data;
          })
    }
  }
})();