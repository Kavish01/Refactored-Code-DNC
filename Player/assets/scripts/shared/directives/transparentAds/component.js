angular
    .module("IONOS")
    .directive('transparentadModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) {
        return {
            restrict: 'AE',
            template: '<div><img id="transparentadimage" ng-src="{{image}}" /></div>',
            scope: {
                load: '='
            },
            link: function(scope, elem, attrs) {
                
                var onTransparentTimeout,
                    counter = 0,
                    folder="Transparent Ad",
                    videoSwitchInterval,
                    videoUrls = [],
                    videoData
					
				getTransparentAdContent = function()
				{
				  content.getModuleData("transparentAd").then(function(data){

                    videoData = data.Sections.Section.Data;
					
					
			

					  if (videoData instanceof Array) 
                           {
							    for(var k = 0 ; k < videoData.length;k++)
                       			 {
                            
                                     videoUrls.push(""+currentAssetPath+"/"+folder+"/"+videoData[k]._AssetPath);
                                  }   	
						   }
						   else
						   {
							    videoUrls[0] = ""+currentAssetPath+"/"+folder+"/"+videoData._AssetPath;
						   }
                    
                   

                    scope.image = sce.trustAsResourceUrl(videoUrls[counter]);
                    ////console.log(scope.image);
                 
                    onTransparentTimeout = function()
                        {
                            counter++;
                            scope.image = sce.trustAsResourceUrl(videoUrls[counter]);
                            if(counter === (videoData.length - 1))
                                {
                                    counter = -1;
                                }
                        }

                    videoSwitchInterval = interval(onTransparentTimeout,configService.get("videoModuleInterval"));

                 

                });
				}
					
				// Update handling - start
				 scope.$watch("load", function(){
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load=='true')
                    {
						videoUrls = [];
						counter =0;
						
						interval.cancel(videoSwitchInterval);
						getTransparentAdContent();
               	    }
                else
                {
                    ////console.log("value not changed");
                }
                });
                    
              //// Update handling - end
					getTransparentAdContent();
               

            }
        }
    }]);
