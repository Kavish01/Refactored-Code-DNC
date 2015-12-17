angular
    .module("IONOS")
    .directive('idleModule', ['$compile', "$sce","$timeout","$interval", "content", "configService",  function(compile, sce, timeout,interval,content, configService) {
        
        var idleArray = [],
            idleSwitchTimeout,
            idleItem,
            playelement = null,
            idlecounter = 0,
			idleduration = 15000;


 

       		idleItem = function(item)
            {
				//console.log(idleduration + " -------------- ");
                var html = "";
                if(idleArray.length > 0 && idleArray[item])
                    {
						//alert(currentAssetPath);
                        item = idleArray[item];
												// '../'++"Data"+""
                        switch(item._VideoType)
                            {
                                case "Video":
								case "VideoAd":
                                    html = '<video  id="idleElement"   src="'+currentAssetPath+'/Idle Play/'+ item._AssetPath +'" autoplay></video>';

                                    playelement.html(html);
									var idleElement = angular.element(document.querySelector('#idleElement'))[0];

                              //      var idleElement = playelement.find("video")[0];
									

                                    // Load and Play video
                                    idleElement.load();
                                    idleElement.play();
									
										if(item._VideoType == "VideoAd"){
										idleduration = parseInt(item._idleduration);
									}else
									{
										
										idleduration = 10000;
										idleElement.addEventListener("ended", function (){
      interval.cancel(idleSwitchTimeout);
										 	 idleSwitchTimeout = interval(function() { onIdleTimeout(); },100);
   }, false);
										
									}

                                break;
                                case "Image":
                                    html = '<img class="imgVideo" src="'+currentAssetPath+'/Idle Play/'+ item._AssetPath +'" />';
									idleduration = parseInt(item._idleduration);
                                    playelement.html(html);
                                break
                                case "URL":
                                    html = '<iframe src="'+ item._AssetPath +'" ></iframe>';
									idleduration = parseInt(item._idleduration);
                                    playelement.html(html);
                                break
                            }
                    }

                //playelement.html(html);
            }

        // <div id="IdleModule"><iframe src="http://www.w3schools.com" ng-show="iframeSrc.length>1" width="100%" height="100%"></iframe><img ng-src="{{imgSrc}}" ng-show="imgSrc.length>1" width="100%" height="100%" /><video width="100%" height="100%" ng-show="videoSrc.length>1" ng-src="{{videoSrc}}"></video></div>


        return {
            restrict: 'A',
            template: '<div id="idleComp" class="module-container">Loading...</div>',
			scope: {
          		 load : "=" 
		  },
            link: function(scope, elem, attrs)
                {
					
                    playelement = angular.element( document.querySelector( '#idleComp' ) );
					getIdlePlayContent = function(){
                    content.getModuleData("idle").then(function(data){
                        var videoData = data.Sections.Section.Data;
                        
                        for(var k = 0 ; k < videoData.length;k++)
                            {
                                idleArray.push(videoData[k]);
                            }   

                     
					 
					   
						 
                       // idleSwitchTimeout = timeout(onIdleTimeout, (3000));
						
						
						   onIdleTimeout = function()
                            {
                                idlecounter++;
								//alert(idlecounter)
                                // Update media
                                idleItem(idlecounter);

                                // Start idleduration timer
								interval.cancel(idleSwitchTimeout);
                               // timeout.cancel(idleSwitchTimeout);
                              //  idleSwitchTimeout = timeout(onIdleTimeout, (idleduration * 1000));
								  idleSwitchTimeout = interval(function() { onIdleTimeout(); },idleduration * 1000);

                                if(idlecounter === (videoData.length - 1))
                                    {
                                        idlecounter = -1;
                                    }
                            }

				
				  });
				}
				getIdlePlayContent();
				scope.$watch("load", function(){
                    //console.log(scope.load, "Item Updated");
                    if(scope.load.toUpperCase()=='TRUE')
                    {
						
                		//scope.itemArray = [];
						getIdlePlayContent();
               	 }
                else
                {
                    //console.log("value not changed");
                }
                });
				  scope.$on('$idleTimeout', function() {
					//$scope.events.push({event: '$idleTimeout', date: new Date()});
					 idleItem(idlecounter);
                        // Start idleduration timer
						//console.log(idleduration + " -------------- ");
						
						
						 
						//var timeInterval = interval
						 
						  idleSwitchTimeout = interval(function() { onIdleTimeout(); },idleidleduration * 1000);
				});

				scope.$on('$keepalive', function() {
					scope.$apply(function() {
						
						interval.cancel(idleSwitchTimeout);
						idlecounter = 0;
						playelement.html("");
					});					
				})
			 }
        }
    }]);
