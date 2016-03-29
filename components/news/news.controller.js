'use strict';
(function () {
  angular
      .module('fsApp.news', [])
      .controller('NewsController', ['dataFactory', 'markdownFactory', NewsController]);

  function NewsController(dataFactory, markdownFactory) {
    var vm = this;
    vm.news = [];

    getNews();

    ///////////////////////////////////////////
    function getNews() {
      dataFactory.getNews()
          .each(function (item) {
            item.description = markdownFactory.toMarkdown(item.description);
          })
          .then(function (result) {
            vm.news = result.data;
          });
    }

  }
})();