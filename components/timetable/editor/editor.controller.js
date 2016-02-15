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

        /////////////////////////////////////////////////////

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

		$scope.$watch('editor.selectedItems', selectedItemsChanged, true);
		function selectedItemsChanged(newValue, oldValue) {
			editor.timetableItems = [];
			// Get the Modules for timetable
			newValue.forEach(function(value) {
				console.log(value);
				var group = (value.group.study ? value.group.study : "")
					+ (value.group.semester ? value.group.semester.charAt(1) : "")
					+ (value.group.letter ? value.group.letter : "");
				console.log(group);
				var module = value.module.id;
				var teacher = value.teacher.id;
				var pk = value.praktikum ? value.praktikum : null;
				dataFactory.getLesson({ group: group, module: module, teacher: teacher, pk: pk})
					.then(function(result) {
						console.log(result);
						for (var i = 0; i < result.data.length; i++) {
							var date = new Date();
							date.setHours(result.data[i].hour);
							date.setMinutes(result.data[i].minute);
							result.data[i].date = date;
							console.log(result.data[i]);

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

/*
 <script>
 var selectedItems = {};

 function getModulesByGroup(group, prefix) {
 $.getJSON( "http://fs.cs.hm.edu/rest/api/1/timetable/modules?group="+group, function( data ) {
 $("#groups"+prefix).empty();
 $.each(data, function( index, item) {
 var count = 0 + item.groups.length;
 var list = "<li class='collection-item'";
 if(count > 0) {
 list += " style='height: 12em;'";
 }
 list += "><div>"+item.module.name+"<a href='#!' class='secondary-content'><input type='checkbox' id='"+(item.module.id+item.teacher.id+prefix)+"check' /><label for='"+(item.module.id+item.teacher.id+prefix)+"check'></label></a></div>";

 list += "<p>"+item.teacher.name+"</p>";
 if(count > 0) {
 list += "<div class='input-field' style='height: 6em;'><select id='"+(item.module.id+item.teacher.id+prefix+"praktikum")+"'><option value='0' selected> nicht belegt</option>";
 for(i = 0; i < count; i++) {
 list += "<option value='"+(i+1)+"'>Gruppe "+item.groups[i]+"</option>";
 }
 list += "</select><label>Praktikum</label></div>";
 }
 list += "&lt;script>".replace("&lt;", "<");
 // Listener for Checkbox & Dropdown
 list += "initCheckboxAndDropdown('"+prefix+"', "+JSON.stringify(item)+", "+(count > 0)+", '"+group+"');";
 list += "&lt;/script>".replace("&lt;", "<");
 list += "</li>";

 //console.log(list);
 $(list).appendTo("#groups"+prefix);

 if(JSON.stringify(item) in selectedItems) {
 // check Checkbox
 $("#"+(item.module.id+item.teacher.id+prefix)+"check").prop('checked', true);

 if(count > 0) {
 // choose Dropdown item
 var selectedPk = selectedItems[JSON.stringify(item)];
 $("#"+(item.module.id+item.teacher.id+prefix)+"praktikum option")
 .filter(function() { return $.trim($(this).text()) == "Gruppe "+selectedPk; })
 .prop("selected", "selected");
 }
 }
 });

 $('select').material_select();
 });
 }

 function initCheckboxAndDropdown(prefix, item, count, group) {
 var name = item.module.id+item.teacher.id+prefix;
 var lastPk = 0;
 $("#"+name+"check").change(function() {
 cleanLessons(this.checked, prefix, group, item, lastPk, lastPk, loadLessons);
 });
 if(count > 0) {
 $("#"+name+"praktikum").change(function() {
 var checked = $("#"+name+"check").val();
 $("#"+name+"check").attr("checked", (!checked) ? true : checked);
 var pk = $("#"+name+"praktikum option:selected").val();
 if(checked && pk != lastPk) {
 cleanLessons(checked, prefix, group, item, lastPk, pk, loadLessons);
 lastPk = pk;
 }
 });
 }
 }

 function cleanLessons(selected, prefix, group, object, pkOld, pkNew, callback) {
 delete selectedItems[JSON.stringify(object)];

 $.getJSON( "http://fs.cs.hm.edu/rest/api/1/timetable/lessons?group="+group+"&module="+object.module.id+"&teacher="+object.teacher.id+"&pk="+pkOld, function( data ) {
 $.each(data, function( index, item) {
 var cellName = prefix + "_" + item.day + "_" + item.hour + "_" + item.minute;
 var cellLesson = item.module.id+item.teacher.id+prefix+"lesson";
 $("#"+cellName).children("#"+cellLesson).remove(); // Clean from module
 });
 callback(selected, prefix, group, object, pkNew);
 });
 }

 function loadLessons(selected, prefix, group, object, pk) {
 if(selected) {
 selectedItems[JSON.stringify(object)] = pk;

 $.getJSON( "http://fs.cs.hm.edu/rest/api/1/timetable/lessons?group="+group+"&module="+object.module.id+"&teacher="+object.teacher.id+"&pk="+pk, function( data ) {
 $.each(data, function( index, item) {
 var cellName = prefix + "_" + item.day + "_" + item.hour + "_" + item.minute;
 var cellLesson = item.module.id+item.teacher.id+prefix+"lesson";

 if(pk == 0 && item.suffix.includes("Praktikum")) {
 return;
 }
 var lesson = "<p class='center' id='"+cellLesson+"'><b>"+item.module.name+"</b><br><br></i>"+item.suffix+"</i></p>"; // Create new

 $(lesson).appendTo("#"+cellName); // Append to cell
 });
 });
 }
 }
 </script>
 */