'use strict';
(function () {
    angular
        .module('fsApp.timetable', [])
        .controller('TimetableController', ['dataFactory', TimetableController]);
    
    function TimetableController(dataFactory) {
        var timetable = this;
        timetable.items = [];

        init();

        ///////////////////////////////////////

        function init() {
            loadTimetableItems();
        }
        function loadTimetableItems() {
            if (localStorage.timetable) {
                var selectedItems = JSON.parse(localStorage.timetable);
                selectedItems.forEach(function (item) {
                    var group = (item.group.study ? item.group.study : "")
                        + (item.group.semester ? item.group.semester.charAt(1) : "")
                        + (item.group.letter ? item.group.letter : "");
                    var module = item.module.id;
                    var teacher = item.teacher.id;
                    var pk = item.praktikum ? item.praktikum : null;
                    dataFactory.getLesson({group: group, module: module, teacher: teacher, pk: pk})
                        .then(function (result) {
                            console.log(result.data);
                            for (var i = 0; i < result.data.length; i++) {
                                var date = new Date();
                                date.setHours(result.data[i].hour);
                                date.setMinutes(result.data[i].minute);
                                result.data[i].date = date;

                                timetable.items.push(result.data[i]);
                            }
                        });
                });
            } // end if localStorage.timetable
        } // end loadTimetableItems

        // Filter to display the
        timetable.mon = function(item) {
            return (item.day === "MONDAY");
        }
        timetable.tue = function(item) {
            return (item.day === "TUESDAY");
        }
        timetable.wed = function(item) {
            return (item.day === "WEDNESDAY");
        }
        timetable.thurs = function(item) {
            return (item.day === "THURSDAY");
        }
        timetable.fri = function(item) {
            return (item.day === "FRIDAY");
        }
    }
})();