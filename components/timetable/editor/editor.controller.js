'use strict';
(function () {
    angular
        .module('fsApp.editor', [])
        .controller('TimetableEditorController', ['dataFactory', TimetableEditorController]);

    function TimetableEditorController(dataFactory) {
        var vm = this;

        vm.list = [];
        vm.filter = {};
        vm.selectedItems = [];
		vm.checked = [];

        vm.getModules = getModules;
        vm.toggleModule = toggleModule;
		vm.selectChanged = selectChanged;

        /////////////////////////////////////////////////////

        function getModules() {
			vm.filter = {
                group: vm.searchbar
            }
			vm.checked = [];
            dataFactory.getModules(vm.filter)
                .then(function (result) {
                    vm.list = result.data;
					setCheckbox();
				});
        }

		function toggleModule(module) {
			console.log('toggleMenu');
			var found = false;
				for (var i = 0; i < vm.selectedItems.length; i++) {
					if (module.module.id === vm.selectedItems[i].module.id &&
						module.teacher.id === vm.selectedItems[i].teacher.id) {

						vm.selectedItems.splice(i, 1);
						found = true;
					}
			}
			if (!found) {
				// No entry found, add module.
				vm.selectedItems.push(module);
			}
		}

		function selectChanged(module, index, value) {
			vm.checked[index] = true;
			toggleModule(module); // BUG IF ALREADY SELECTED!

			// Edit Praktikum entry
            for (var i = 0; i < vm.selectedItems.length; i++) {
                if (module.module.id === '' && module.teacher.id === '') {
                    vm.selectedItems[i].praktikum = value;
                }
            }
		}

		function setCheckbox() {
			for (var i = 0; i < vm.list.length; i++) {
				for (var j = 0; j < vm.selectedItems.length; j++) {
					if (vm.list[i].module.id === vm.selectedItems[j].module.id &&
						vm.list[i].teacher.id === vm.selectedItems[j].teacher.id) {
						vm.checked[i] = true;
					}
				}
			}
		}

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
    }
})();