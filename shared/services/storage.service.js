(function () {
    'use strict';

    angular
        .module('fsApp.storage.service', [])
        .factory('localStorageService', localStorageService);

    /* @ngInject */
    function localStorageService($window) {
        return {
            set: function (key, value) {
                $window.localStorage.setItem(key, value);
            },
            get: function (key, defaultValue) {
                var value = $window.localStorage.getItem(key);
                if (value === null) {
                    value = defaultValue;
                }
                return value;
            },
            setObject: function (key, value) {
                $window.localStorage.setItem(key, angular.toJson(value));
            },
            getObject: function (key) {
                return angular.fromJson($window.localStorage.getItem(key));
            }
        };
    }
})();