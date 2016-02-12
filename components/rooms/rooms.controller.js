'use strict';
(function () {
    angular
        .module('fsApp.rooms', [])
        .controller('RoomsController', [RoomController]);
    
    function RoomController() {
        /*<script>
		var weekday = new Array(7);
		weekday[0]=  "SUNDAY";
		weekday[1] = "MONDAY";
		weekday[2] = "TUESDAY";
		weekday[3] = "WEDNESDAY";
		weekday[4] = "THURSDAY";
		weekday[5] = "FRIDAY";
		weekday[6] = "SATURDAY";
		
		var selectedWeekday;
		var selectedTimeHours;
		var selectedTimeMinutes;

		function load() {
			var date = new Date();
			selectedWeekday = date.getDay();
			
			// Select current day of week
			$("#dayofweek option[value='"+selectedWeekday+"'").prop("selected", "selected");
			
			var time1 = createDate(0, 0);
			var time2 = createDate(10, 0);
			var time3 = createDate(11, 45);
			var time4 = createDate(13, 30);
			var time5 = createDate(15, 15);
			var time6 = createDate(17, 0);
			var time7 = createDate(18, 45);
			
			// Select current time range
			if(time1.getTime() < date.getTime() && time2.getTime() > date.getTime()) {
				$("#time option[value='1'").prop("selected", "selected");
			} else if(time2.getTime() < date.getTime() && time3.getTime() > date.getTime()) {
				$("#time option[value='2'").prop("selected", "selected");
			} else if(time3.getTime() < date.getTime() && time4.getTime() > date.getTime()) {
				$("#time option[value='3'").prop("selected", "selected");
			} else if(time4.getTime() < date.getTime() && time5.getTime() > date.getTime()) {
				$("#time option[value='4'").prop("selected", "selected");
			} else if(time5.getTime() < date.getTime() && time6.getTime() > date.getTime()) {
				$("#time option[value='5'").prop("selected", "selected");
			} else if(time6.getTime() < date.getTime() && time7.getTime() > date.getTime()) {
				$("#time option[value='6'").prop("selected", "selected");
			} else {
				$("#time option[value='7'").prop("selected", "selected");
			}
			
			// Select the items in the dropdowns
			$('select').material_select();
			
			selectedTimeHours = date.getHours();
			selectedTimeMinutes = date.getMinutes();
			search();
		}
		
		function createDate(hours, minutes) {
			var time = new Date();
			time.setHours(hours);
			time.setMinutes(minutes);
			return time;
		}
		
		function search() {
			var day = weekday[selectedWeekday];
			var hour = selectedTimeHours;
			var minute = selectedTimeMinutes;
			$.getJSON( "http://fs.cs.hm.edu/rest/api/1/room?type=ALL&day="+day+"&hour="+hour+"&minute="+minute, function( data ) {
				$("#rooms").empty();
				var table = "<table style='width: 100%;'>"+
					"<thead><tr>"+
					"<th>Raum</th>"+
					"<th>Frei bis</th>"+
					"<th class='center'>Typ</th>"+
					"</tr><thead><tbody>";
				$.each(data, function( index, item) {
					var date = new Date();
					date.setHours(item.hour);
					date.setMinutes(item.minute);
					date.setSeconds(0);
					table += "<tr><td>"+item.name+"</td>"+
						"<td>"+date.toLocaleTimeString()+"</td>"+
						"<td class='center'>"+item.roomType+"</td></tr>";
				});
				table += "</tbody></table>";
				
				$(table).appendTo("#rooms");
			});
		};
	</script>*/
    }
    
})();