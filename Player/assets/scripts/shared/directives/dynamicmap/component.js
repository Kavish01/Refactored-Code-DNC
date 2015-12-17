angular
    .module("IONOS")
    .directive('dynamicModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
        return {
            restrict: 'AE',
          	template: '<div><div id="dvRssCaption" class="moduleHeaderStyle" ng-show="maptext.length>0 && orientation==true" > {{maptext}}</div><iframe id="map" class = "dynamicMapStyle" src ={{assetURL(assetPath)}} ></iframe></div>',
            scope: {
          		load : "=",
				orientation:"="
		  },
           link: function(scope, elem, attrs) {
			   
			   
                
				getContent = function(){
				  content.getModuleData("dynamic").then(function(response){
					  
					  var sectionData = response.Sections.Section;
					  
					   if (sectionData instanceof Array) 
					   {
						    scope.maptext = response.Sections.Section[0]._Label;
							 scope.assetPath = currentAssetPath + "/Dynamic Map/" + response.Sections.Section[0]._AssetPath;
					   }
					   else
					   {
						    scope.maptext = response.Sections.Section._Label;
							 scope.assetPath = currentAssetPath + "/Dynamic Map/" + response.Sections.Section._AssetPath;
					   }
					  
					 
					
						 scope.assetURL = function(url)
						  {
							return sce.trustAsResourceUrl(url);
						  }
					  
					
				  });
		
				}

             	scope.$watch("load", function(){
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    		
							 getContent();
                    
               		 }
                else
                {
                    ////console.log("value not changed");
                }
                });
			
			
				getContent();
			}
		   
        }
    }]);

// JavaScript Document// JavaScript Document