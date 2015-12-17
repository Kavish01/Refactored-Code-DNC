angular
    .module("IONOS")
    .directive('genericModule', ['$compile', "$sce","$interval", "content", "configService",  
    	function(compile, sce, interval, content, configService) 
	{
		
		
        return {
            restrict: 'AE',
          	template: '<div class="genericmodule-container"></div>',
            scope: {
              load:"=",
			        order:"=",
			  
            
		 },
           link: function(scope, elem, attrs) 
		  {
                var urls = [],
				//ord=0,
                        getContent,
                        data=[],
                        counter = 0,
                        playGenericItem,
                        data,response;
                        scope.videoValue = false;
						
                        scope.orientation="";
                 //elem = angular.elem( document.querySelector( '.genericmodule-container' ) );
                playGenericItem = function(_count) 
                {
                        var namGen =  elem.attr('id').toString();
var psrInt = parseInt(namGen.substr(namGen.length-1,namGen.length));
                        var html = "";
                        item = urls[psrInt];
                        //alert("generic item 1" +item._FileType);
						////console.log("item  -------- " + item + "  url Item  " + urls[_count] + " 0rd " + ord);
                        ////console.log(" -------------  " + item._AssetPath)
                        if(item._AssetPath!='undefined')
                        {
                            //
var itemAssetPath = item._AssetPath;
                                        if(item._FileType=='URL')
                                        {
										
										////console.log("item._AssetPath  " + itemAssetPath + "    _count "  +psrInt);
                                            html='<iframe   class="markItUpPreviewFrame" src="'+ itemAssetPath +'" width = "100%" ></iframe>';
                                        }
                                        else
                                        {
										////console.log("item._AssetPath  " + itemAssetPath + "    _count "  +psrInt);
                                            html='<iframe   class="markItUpPreviewFrame" src="'+currentAssetPath+'/GenericModules/'+ itemAssetPath +'" width = "100%" ></iframe>';
                                        }
                                            
                            
                             
                        }
                        else
                        {
                            
                        }
						elem.html('');
                        elem.append(html);
    $('.markItUpPreviewFrame').each(function(){$(this).load(function(){ $(".markItUpPreviewFrame").contents().click();$(".markItUpPreviewFrame").contents().click(function(e){ $(".markItUpPreviewFrame").contents().find("[href='#']").attr("href","javascript:void(0)");
            
            }); 
});   });            // $('iframe  a').click(function(e) {alert("yipee got inside  iframe"); e.preventDefault();});
                      
                      
                }                   

				getContent = function()
                        {
						////console.log(" -------- Scope order --- " +scope.order + "  ------- " + ord );
                           counter=0;
						                elem.html('');
                            content.getModuleData("generic").then(function(data) {

                                data = angular.copy(data);
                              
                                var moduleData = data.Sections.Section.Data;
                               
                                urls = [];
                                
                                

                                if (moduleData instanceof Array) 
                                {
                                    
                                    for (var k = 0; k < moduleData.length; k++) 
                                    {
                                        urls.push(moduleData[k]);
                                    }
                                    
                                    
                                 	if(videoValue ==true && deviceId!='' &&genericOrientation!='Landscape')
                                 	{
                                 		
                  										if(ord==2)
                  										{
                  										return;
                  										}
              										    playGenericItem(scope.order[ord], elem);
                                           ord++;

                                 	}
                                 	else if(videoValue ==false && deviceId!=''&&genericOrientation!='Landscape')
                                 	{
                                 		
                    										if(ord==3)
                    										{
                    										return;
                    										}
										    playGenericItem(scope.order[ord], elem);
                                           ord++;
                                 	}

                                    else if(videoValue ==false &&deviceId!=''&& genericOrientation=='Landscape')
                                    {
                                      
									  playGenericItem(scope.order[ord], elem);
                                           ord++;
                                    }

                                    else if(videoValue ==true &&deviceId!=''&& genericOrientation=='Landscape')
                                    {
                                      
									      playGenericItem(scope.order[ord], elem);
                                           ord++;
                                    }

                                      else
                                    {
                                       
                                        playGenericItem(scope.order[ord], elem);
                                           ord++;
                                    }

                                } 
                                else 
                                {
                                	
                                    urls[0] = moduleData;
                                   
                                    playGenericItem(counter, elem);
                                }
   

                            }); 
                        }

                       /* checkVideo=function()
                        {
                        	 
                           //console.log("value of video is "+videoValue+genericOrientation);
                           
							
                                getContent();

                        	
                    	}*/
                         


                      scope.$watch("load", function(){
					         // ord=0;
                    //console.log(ord);
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    
                    getContent();
                  // checkVideo();
                }
                else
                {
                    
                }
                });

getContent();

                        // checkVideo();
                        



			 }
			 
			 
			 
		  
        }
    }]);
