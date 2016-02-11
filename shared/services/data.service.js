'use strict';
(function() {
    angular
        .module('fsApp.services', [])
        .factory('dataFactory', [
            '$http', function($http) {
                var urlBase = 'http://fs.cs.hm.edu/rest/api/1/';
                var dataFactory = {};

                function get(url, params) {
                    var request = $http({
                        method: "get",
                        url: url,
                        params: params,
                    });
                    return request;
                }

                dataFactory.getBlackboard = function (params) {
                    var url = urlBase + "blackboard";
                    return get(url, params);
                }
                
                dataFactory.getMensaMeal = function (params) {
                    var url = urlBase + "meal";
                    return get(url, params);
                }
                
                dataFactory.getTraffic = function (params) {
                    var url = urlBase + 'publicTransport';
                    return get(url, params);
                }
                
                dataFactory.getHolidays = function (params) {
                    var url = urlBase + 'calendar/holiday';
                    return get(url, params);
                }
                
                dataFactory.getJobs = function (params) {
                    var url= urlBase + 'jobs';
                    return get(url, params);
                }
                
                dataFactory.getLostFound = function (params) {
                    var url = urlBase + 'lostandfound';
                    return get(url, params);
                }

                return dataFactory;
            }
        ]);
})();