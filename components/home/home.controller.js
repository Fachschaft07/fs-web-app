'use strict';
(function () {
  angular
      .module('fsApp.home', [])
      .controller('HomeController', ['dataFactory', HomeController]);

  function HomeController(dataFactory) {
    var home = this;

    home.blackboard = [];
    home.mensaMenu = [];
    home.trafficLothstr = [];
    home.trafficPasing = [];
    home.holidays = [];

    init();

    //////////////////////////////////////////////////////////////

    // Initial Server requests to fill data
    function init() {
      blackboard();
      mensaMeal();
      transportTimetableLothstr();
      transportTimetablePasing();
      getHolidays();
      getLostFound();
      getFSNews();
    }

    function blackboard() {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      dataFactory.getBlackboard({since: yesterday.getTime()})
          .then(function (result) {
            home.blackboard = result.data;
          })
    }

    function mensaMeal() {
      dataFactory.getMensaMeal({location: 'MENSA_LOTHSTRASSE'})
          .then(function (result) {
            home.mensaMenu = result.data;
          })
    }

    function transportTimetableLothstr() {
      dataFactory.getTraffic({location: 'LOTHSTR'})
          .then(function (result) {
            home.trafficLothstr = result.data;
          })
    }

    function transportTimetablePasing() {
      dataFactory.getTraffic({location: 'PASING'})
          .then(function (result) {
            home.trafficPasing = result.data;
          })
    }

    function getHolidays() {
      dataFactory.getHolidays()
          .then(function (result) {
            home.holidays = result.data;
            nextHoliday(result.data);
          })
    }

    function nextHoliday(data) {
      var today = new Date();
      for (var i = 0; i < data.length; i++) {
        var holidayStart = new Date(data[i].start);
        if (holidayStart.getTime() >= today.getTime()) {
          home.nextHoliday = data[i];
          break;
        }
      }
    }

    function getLostFound() {
      dataFactory.getLostFound()
          .then(function (result) {
            home.lostfound = result.data;
          })
    }

    function getFSNews() {
      dataFactory.getFSNews()
          .then(function (result) {
            home.fsnews = result.data;
            console.log(result.data);
          })
    }

  }

})();