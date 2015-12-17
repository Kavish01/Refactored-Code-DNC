angular
    .module("IONOS")
    .directive('seatModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
		
        return {
            restrict: 'A',
          	templateUrl: 'assets/scripts/view/seatfinder.html',
            scope: {
            load : "=",
			orientation:"@"
		  },
           link: function(scope, elem, attrs) {
			 //  alert(scope.load);
			  
			     
				   
				   scope.$watch("load",function(newVal){
					   if (angular.isUndefined(newVal) || newVal == null) return;
					   scope.listItem = newVal;
					  
					    
					   
					   if(lst != null){
						   lst.destroy();
						   lst = null;
						   
					   }
					   
					  var timer = setInterval(function(){
				   clearInterval(timer);
				lst = new iScroll(scope.orientation, {
		snap: 'li',
		momentum: true,
		hScrollbar: false,
		vScrollbar: false,
		click:true,
		 onScrollEnd: function() {
			 $("#"+scope.orientation).trigger("moveEnd");
  
	
  }
	 });
	 lst.isSpinningOn = true;
		// lst.scrollTo(0, -400, 200);		   
				   
				   },200);
					   
					 
					   
					 //  scope.listItem = scope.load.toString().split(",");
					   
					   });
				   

                

            }
		   
        }
    }]);

