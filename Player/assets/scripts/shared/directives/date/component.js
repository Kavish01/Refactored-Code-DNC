angular
    .module("IONOS")
    .directive('dateModule', ['$compile', "$sce","$interval","$filter","dateFilter", "content", "configService",  function(compile, sce, interval,filter,dateFilter, content, configService) 
	{
        return {
            restrict: 'AE',
			  scope: {
            load : "=" 
		  },
          	template: '<div id= "date" >{{dateVal}}</div>',
           link: function(scope, elem, attrs) {
                
                 var dataArray = [],
				  format;// for filling data in array
			
                if(deviceId!='')
                    {
                        
                    }
                else
                {
					
				getDateContent = function()	
				{
					 content.getModuleData("date").then(function(response)
				{
					// formats - (EEEE, MMMM d, y) (M/d/yyyy)  (M/d/yy) 
					format =  response.Sections.Section.Data._DateFormat;
					//alert(dateFilter(new Date(), format))
					if(format=='Day of Week, Month, Date, yyyy')
						{
							format='fullDate';
				}
					scope.dateVal = dateFilter(new Date(), format);
					
					// update date
					var int = interval(function() { updateDateHandler(); }, 3000);
					
					function updateDateHandler()
					{
						scope.dateVal = dateFilter(new Date(), format);
					}
					
				});
				}
					
               
            }
			
				// Update handling - start
				 scope.$watch("load", function(){
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load=='true')
                    {
						interval.cancel(int);
                		getDateContent();
               	 }
                else
                {
                    ////console.log("value not changed");
                }
                });
                    
              //// Update handling - end
			  
                		getDateContent();
		 }
		   
        }
    }]);

