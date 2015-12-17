angular
    .module("IONOS")
    .directive('rssModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
        return {
            restrict: 'A',
          	template: '<div id= "rss"><div id="dvRssCaption" class="moduleHeaderStyle" ng-show="rssText.length>0 && orientation==true" > {{rssText}}</div> <div  class ="rssStyle" ><marquee behavior="scroll" direction="left"><ul><li class ="rssText" ng-repeat="item in itemArray" > >> {{item}}</li></ul></marquee></div></div>',
            scope: {
            load : "=",
			orientation:"="
		  },
           link: function(scope, elem, attrs) {
                
               var dataArray = [];// for filling data in array
				//rss = angular.element('<div id= "rss"><div id="dvRssCaption" class="moduleHeaderStyle" ng-show="rssText.length>0" > {{rssText}}</div> <div  class ="rssStyle" ><marquee behavior="scroll" direction="left"><ul><li class ="rssText" ng-repeat="item in itemArray track by $index" > >> {{item}}</li></ul></marquee></div></div>');
				scope.itemArray=[];
				
				getRssContent = function()
				{
					  content.getModuleData("rssReader").then(function(response)
					{
					// populate label in rss text (Header)
					 scope.rssText = response.Sections.Section._Label;
				 
						 for (var i = 0; i < response.Sections.Section.Data.length; i++) 
						 { 
						 scope.itemArray.push(response.Sections.Section.Data[i].__cdata);
							//dataArray.push(response.Sections.Section.Data[i].__cdata);
						 }
						//scope.itemArray = dataArray;
						

				});
				}
                
				
				// Update handling - start
				 scope.$watch("load", function(){
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load=='true')
                    {
						
                		//scope.itemArray = [];
						scope.itemArray.splice(0,scope.itemArray.length);
						getRssContent();
               	 }
                else
                {
                    ////console.log("value not changed");
                }
                });
                    
              //// Update handling - end
				getRssContent();
               	    //elem.append(rss);
                    //compile(rss)(scope);
		
                

            }
		   
        }
    }]);

