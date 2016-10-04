'use strict';
(function () {
  angular
      .module('fsApp.timetable', [])
      .controller('TimetableController', ['dataFactory', TimetableController]);

  function TimetableController(dataFactory) {
    var timetable = this;

    timetable.items = [];
    timetable.items.mon = [];
    timetable.items.tue = [];
    timetable.items.wed = [];
    timetable.items.thurs = [];
    timetable.items.fri = [];

    timetable.today = new Date().getDay();

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
                timetable.countItems = result.data.length;

                for (var i = 0; i < result.data.length; i++) {
                  var date = new Date();
                  date.setHours(parseInt(result.data[i].hour));
                  date.setMinutes(parseInt(result.data[i].minute));
                  result.data[i].date = date.getTime();

                  // Set timetable array for each day
                  divideDataIntoDays(result.data[i]);
                }
              });
        });
      }

    } // end loadTimetableItems

    function divideDataIntoDays(data) {
      if (data.day === 'MONDAY') {
        timetable.items.mon.push(data);
      }
      else if (data.day === 'TUESDAY') {
        timetable.items.tue.push(data);
      }
      else if (data.day === 'WEDNESDAY') {
        timetable.items.wed.push(data);
      }
      else if (data.day === 'THURSDAY') {
        timetable.items.thurs.push(data);
      }
      else if (data.day === 'FRIDAY') {
        timetable.items.fri.push(data);
      }

      //Disable Tab if array is empty
      //Set active Tab on current day
    }
  }
})();