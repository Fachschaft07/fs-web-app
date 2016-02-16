'use strict';
(function () {
    angular
        .module('fsApp.editor', [])
        .controller('TimetableEditorController', ['dataFactory', '$scope', TimetableEditorController]);

    function TimetableEditorController(dataFactory, $scope) {
        var editor = this;

        editor.list = [];
        editor.filter = {};
        editor.selectedItems = [];
		editor.checked = [];
		editor.praktikum = [];
		editor.timetableItems = [];

        editor.getModules = getModules;
        editor.toggleModule = toggleModule;
		editor.practicalChanged = practicalChanged;
		editor.saveTimetable = saveTimetable;

		init();

        /////////////////////////////////////////////////////


		function init() {
			loadLocal();
		}

		function loadLocal() {

			if (localStorage.timetable) {
				console.log('Timetable saved');
				console.log(JSON.parse(localStorage.timetable));
				editor.selectedItems = JSON.parse(localStorage.timetable);
			} else {
				console.log('No Timetable saved');
			}
		}

        function getModules() {
			editor.filter = {
                group: editor.searchbar
            }
			editor.checked = [];
			editor.praktikum = [];
            dataFactory.getModules(editor.filter)
                .then(function (result) {
                    editor.list = result.data;
					setCheckboxAndPracticalValue();
				});
        }

		function toggleModule(module, index) {
			var found = false;
				for (var i = 0; i < editor.selectedItems.length; i++) {
					if (module.module.id === editor.selectedItems[i].module.id &&
						module.teacher.id === editor.selectedItems[i].teacher.id) {

						if (!editor.checked[index])
							editor.selectedItems.splice(i, 1);
						found = true;
					}
			}
			if (!found && editor.checked[index]) {
				// No entry found, add module.
				editor.selectedItems.push(module);
			}
		}

		function practicalChanged(module, index) {
			// Checkbox true and add Module if not in selected list.
			editor.checked[index] = true;
			toggleModule(module, index);

			// Edit Praktikum entry.
            for (var i = 0; i < editor.selectedItems.length; i++) {
                if (module.module.id === editor.selectedItems[i].module.id
					&& module.teacher.id === editor.selectedItems[i].teacher.id) {
					editor.selectedItems[i].praktikum = editor.praktikum[index];
                }
            }

		}

		function setCheckboxAndPracticalValue() {
			for (var i = 0; i < editor.list.length; i++) {
				for (var j = 0; j < editor.selectedItems.length; j++) {
					if (editor.list[i].module.id === editor.selectedItems[j].module.id &&
						editor.list[i].teacher.id === editor.selectedItems[j].teacher.id) {
						editor.checked[i] = true;

						// Set Praktikum value if it was already chosen.
						if (editor.selectedItems[j].praktikum && editor.selectedItems[j].praktikum > 0) {
							editor.praktikum[i] = editor.selectedItems[j].praktikum;
						}
					}
				}
			}
		}

		function saveTimetable() {
			console.log(JSON.stringify(editor.selectedItems));
			// Store
			localStorage.timetable = JSON.stringify(editor.selectedItems);
		}

		$scope.$watch('editor.selectedItems', selectedItemsChanged, true);
		function selectedItemsChanged(newValue, oldValue) {
			editor.timetableItems = [];
			// Get the Modules for timetable
			newValue.forEach(function(value) {
				var group = (value.group.study ? value.group.study : "")
					+ (value.group.semester ? value.group.semester.charAt(1) : "")
					+ (value.group.letter ? value.group.letter : "");
				var module = value.module.id;
				var teacher = value.teacher.id;
				var pk = value.praktikum ? value.praktikum : null;
				dataFactory.getLesson({ group: group, module: module, teacher: teacher, pk: pk})
					.then(function(result) {
						for (var i = 0; i < result.data.length; i++) {
							var date = new Date();
							date.setHours(result.data[i].hour);
							date.setMinutes(result.data[i].minute);
							result.data[i].date = date;

							editor.timetableItems.push(result.data[i]);
						}
					});
			});
		}

		// Filter to display the
		editor.mon = function(item) {
			return (item.day === "MONDAY");
		}
		editor.tue = function(item) {
			return (item.day === "TUESDAY");
		}
		editor.wed = function(item) {
			return (item.day === "WEDNESDAY");
		}
		editor.thurs = function(item) {
			return (item.day === "THURSDAY");
		}
		editor.fri = function(item) {
			return (item.day === "FRIDAY");
		}
    }
})();