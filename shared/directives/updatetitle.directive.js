'use strict';
(function () {
  angular
    .module('fsApp.updatetitle.directive', [])
    .directive('title', ['$rootScope', '$timeout',
      function($rootScope, $timeout) {
        return {
          restrict: 'A',
          link: function() {

            var listener = function(event, toState) {

              $timeout(function() {
                $rootScope.title = (toState.data && toState.data.pageTitle)
                    ? toState.data.pageTitle
                    : 'HM - Fachschaft 07';
              });
            };

            $rootScope.$on('$stateChangeSuccess', listener);
          }
        };
      }
    ]);
})();