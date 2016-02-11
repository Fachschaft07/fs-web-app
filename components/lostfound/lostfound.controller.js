'use strict';
(function () {
    angular
        .module('fsApp.lostfound', [])
        .controller('LostFoundController', ['dataFactory', LostFoundController]);
    
    function LostFoundController(dataFactory) {
        var vm = this;
        vm.list = [];
        
        getLostFound();
        
        function getLostFound() {
            dataFactory.getLostFound()
                .then(function(result) {
                    vm.list = result.data;
                console.log(result.data);
            })
        }
        
        
        /*
        <script>
		function load() {
			$.getJSON( "http://fs.cs.hm.edu/rest/api/1/lostandfound", function( data ) {
				$("#lostfound").empty();
				var currDate;
				var list = "";
				$.each(data, function( index, item) {
					var date = new Date(item.date);
					if(currDate == null || date.getDate() != currDate.getDate()) {
						currDate = date;
						list += "<li class='collection-header'><b>"+date.toLocaleDateString()+"</b></li>";
					}
					list += "<li class='collection-item'>"+item.subject+"</li>";
				});
				
				$(list).appendTo("#lostfound");
			});
		};
	</script>
    */
    }
    
    
    
})();