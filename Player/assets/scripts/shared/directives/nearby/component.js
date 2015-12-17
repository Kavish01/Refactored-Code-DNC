angular
    .module("IONOS")
    .directive('nearbyModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
		
		
        return {
            restrict: 'A',
          	template: '<div style="position:relative"><div id="wrapper"><div id="scroller"><ul id="thelist"><li ng-repeat="item in nearbyDataArray">{{item._VN}}</li></ul></div></div></div>',
            scope: {
            load: '='
		  },
           link: function(scope, elem, attrs) 
           {
      			scope.nearbyDataArray=[];
      			getNearbyData=function()
	      			{
	      				 content.getModuleData("dynamic").then(function(response)
	      				{
	      					response = angular.copy(response);
	      					for(var i=0;i<response.Sections.Section.Data.length;i++)
		      					{
		      						scope.nearbyDataArray.push(response.Sections.Section.Data[i])
		      					}
	      					
	      				});
	      			}
	      			getNearbyData();

		   }
		}
	    }]);

	// JavaScript Document