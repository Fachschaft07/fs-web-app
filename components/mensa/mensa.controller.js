'use strict';
(function () {
  angular
      .module('fsApp.mensa', [])
      .controller('MensaController', ['dataFactory', MensaController]);

  function MensaController(dataFactory) {
    var mensa = this;
    mensa.meals = [];

    mensa.setModalItem = setModalItem;

    getMensaMenus();

    //////////////////////////////////////////////////

    function getMensaMenus() {
      dataFactory.getMensaMeal({location: 'MENSA_LOTHSTRASSE'})
          .then(function (result) {
            mensa.meals = result.data;
          })
    }

    function setModalItem(item) {
      mensa.modalAdditives = item.additives;
      mensa.modalTitle = item.name;
    }

  }
})();