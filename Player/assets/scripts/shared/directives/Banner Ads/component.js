angular
    .module("IONOS")
    .directive('bannerModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) {
        return {
            restrict: 'A',
            template: '<div id="bannerHeader" ng-show="headerTxt.length>0 && orientation==true" class="moduleHeaderStyle">{{headerTxt}}</div><div id="bannerarea" ><img ng-src="'+currentAssetPath+'/Banner/{{videoSource}}" class="bannerContiner"/></div>',
            scope: {
              load:"=",
			  orientation:"="
            },
            link: function(scope, elem, attrs) {
                
                var onTimeout,
                    counter = 0,
					bannerSwitchTimeout,
                    videoSwitchInterval,
                    videoUrls = [],
                    videoData
              getBannerData = function(){ 
                content.getModuleData("banner").then(function(data){
					
var labelText = data.Sections.Section;
scope.headerTxt = labelText._Label

                    videoData = data.Sections.Section.Data;
                    if(videoData.length == undefined){
						videoUrls.push(videoData._AssetPath);
					}else{
                    for(var k = 0 ; k < videoData.length;k++)
                        {
                            videoUrls.push(videoData[k]._AssetPath);
                        }
					}
                    scope.videoSource = videoUrls[counter];
                   
                  onTimeout = function()
                        {
                            counter++;
                            scope.videoSource = videoUrls[counter];
                            if(counter === (videoData.length - 1))
                                {
                                    counter = -1;
                                }
                        }

					if(videoData.length != undefined)
					{
						 bannerSwitchTimeout = interval(onTimeout,configService.get("bannerModuleInterval"));
					}
                   

                   

                });
			  }
			  getBannerData();
			  scope.$watch("load", function(){
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    ////console.log("value changed"+scope.load);
                    counter = 0;

                    videoUrls = [];
                    interval.cancel(bannerSwitchTimeout);
                    bannerSwitchTimeout = null;
                    
                    getBannerData();
                }
                else
                {
                    ////console.log("value not changed");
                }
                });

            }
        }
    }]);
