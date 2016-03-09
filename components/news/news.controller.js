'use strict';
(function () {
  angular
      .module('fsApp.news', [])
      .controller('NewsController', ['dataFactory', NewsController]);

  function NewsController(dataFactory) {
    var vm = this;
    vm.news = [];

    getNews();

    ///////////////////////////////////////////
    function getNews() {
      dataFactory.getNews()
          .then(function (result) {
            vm.news = result.data;
          });
    }

  }
})();