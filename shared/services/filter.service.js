'use strict';
(function () {
  angular
      .module('fsApp.filter.service', [])
      .filter('daysLeft', function () {
        return function (input) {
          var startDate = new Date(input);
          var today = new Date();
          var diff = startDate.getTime() - today.getTime();
          return Math.round(diff / 1000 / 60 / 60 / 24);
        };
      })
      .filter('minutesLeft', function () {
        return function (input) {
          var departureDate = new Date(input);
          var today = new Date();
          var diff = departureDate.getTime() - today.getTime();
          return Math.round(diff / 60000)
        }
      })
      .filter('today', function () {
        return function (items) {
          var meals = [];
          var today = new Date();
          items.forEach(function (item) {
            var date = new Date(item.date);
            if (today.getDate() == date.getDate()
                && today.getMonth() == date.getMonth()
                && today.getYear() == date.getYear()) {
              meals.push(item);
            }
          })
          return meals;
        }
      })
      .filter('translateWeekday', function () {
        return function (item) {
          switch (item) {
            case "MONDAY":
              return "Montag";
            case "TUESDAY":
              return "Dienstag";
            case "WEDNESDAY":
              return "Mittwoch";
            case "THURSDAY":
              return "Donnerstag";
            case "FRIDAY":
              return "Freitag";
            default:
              return "Wrong input";
          }
        }
      })
      .filter('capitalize', function () {
        return function (input) {
          if (input != null)
            input = input.toLowerCase();
          return input.substring(0, 1).toUpperCase() + input.substring(1);
        }
      });
  ;
})();