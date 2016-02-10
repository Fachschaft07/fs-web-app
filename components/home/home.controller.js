'use strict';
(function() {    
    angular
        .module('fsApp.home', [])
        .controller('HomeController', ['dataFactory', HomeController]);
    
    function HomeController(dataFactory) {
        var vm = this;
        
        vm.blackboard = [];
        vm.mensaMenu = [];
        vm.trafficLothstr = [];
        vm.trafficPasing = [];
        vm.holidays = [];
        
        vm.mensaTest = [
    {
        "date": 1443650400000,
        "type": "VEGAN",
        "name": "Buntes Pfannengemüse   ",
        "additives": []
    },
    {
        "date": 1443650400000,
        "type": "MEAT",
        "name": "Münchner Krustenbraten mit Biersauce    ",
        "additives": [
            "PIG",
            "ALCOHOL"
        ]
    },
    {
        "date": 1443650400000,
        "type": "MEAT",
        "name": "Bio-Chili con carne   ",
        "additives": [
            "BEEF",
            "PIG"
        ]
    },
    {
        "date": 1443736800000,
        "type": "VEGAN",
        "name": "Indisches Linsencurry   ",
        "additives": []
    },
    {
        "date": 1443736800000,
        "type": "MEATLESS",
        "name": "Dampfnudel mit Vanillesauce   ",
        "additives": []
    },
    {
        "date": 1443736800000,
        "type": "MEAT",
        "name": "Seelachsfilet (MSC) Müllerin, Zitronensauce   ",
        "additives": [
            "DYE"
        ]
    }
];
        
        init();
        
        //////////////////////////////////////////////////////////////
        
        // Initial Server requests to fill data
        function init() {
            blackboard();
            mensaMeal();
            transportTimetableLothstr();
            transportTimetablePasing();
            getHolidays();
        }
    
        // Get Blackboard entries
        function blackboard() {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            // Get all new entries since 24h
            dataFactory.getBlackboard({ since: yesterday.getTime() })
                .then(function(result) {
                    vm.blackboard = result.data;
            })
        }
        
        // Get Mensa Deals
        function mensaMeal() {
            dataFactory.getMensaMeal({ location: 'MENSA_LOTHSTRASSE' })
                .then(function(result) {
                    vm.mensaMenu = result.data;
            })
        } 
        
        // Get MVV for Lothstrasse
        function transportTimetableLothstr() {
            dataFactory.getTraffic({ location: 'LOTHSTR' })
                .then(function(result){
                    vm.trafficLothstr = result.data;
            })
        }
        
        // Get MVV for Pasing
        function transportTimetablePasing() {
            dataFactory.getTraffic({ location: 'PASING' })
                .then(function(result){
                    vm.trafficPasing = result.data;
            })
        }
        
        function getHolidays() {
            dataFactory.getHolidays()
                .then(function(result) {
                    //var holidayStart = new Date(item.start);
                    vm.holidays = result.data;
                    nextHoliday(result.data);
            })
        }
        
        function nextHoliday(data) {
            var today = new Date();
            for (var i = 0; i < data.length; i++) {
                var holidayStart = new Date(data[i].start);
                if (holidayStart.getTime() >= today.getTime()) {
                    console.log('in if');
                    console.log(data[i]);
                    vm.nextHoliday = data[i];
                    break;
                }
            }
        }
    }
        
})();