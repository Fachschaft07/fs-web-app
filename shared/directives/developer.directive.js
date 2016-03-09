'use strict';
(function () {

  angular
      .module('fsApp.developer.directive', [])
      .directive('developer', function () {
        return {
          restrict: 'E',
          templateUrl: 'shared/directives/developerTemplate.html',
          scope: {
            developers: '=',
            language: '='
          }
        }
      });
})();