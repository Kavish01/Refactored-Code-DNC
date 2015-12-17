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
			        order:"="
			  
            
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
                        
                        
                        var html = "";
                        item = urls[_count];
                        //alert("generic item 1" +item._FileType);
						//console.log("item  -------- " + item + "  url Item  " + urls[_count] + " 0rd " + ord);
                        
                        if(item._AssetPath!='undefined')
                        {
                            //

                                        if(item._FileType=='URL')
                                        {
                                            html='<iframe  id="iframe" class="markItUpPreviewFrame" src="'+ item._AssetPath +'" width = "100%" ></iframe>';
                                        }
                                        else
                                        {
                                            html='<iframe  id="iframe" class="markItUpPreviewFrame" src="'+currentAssetPath+'/GenericModules/'+ item._AssetPath +'" width = "100%" ></iframe>';
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
						//console.log(" -------- Scope order --- " +scope.order + "  ------- " + ord );
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
                                    
                                    
                                 	if(scope.videoValue ==true && deviceId!='' &&scope.orientation!='Landscape')
                                 	{
                                 		
                  										if(ord==2)
                  										{
                  										return;
                  										}
              										    playGenericItem(scope.order[ord], elem);
                                           ord++;

                                 	}
                                 	else if(scope.videoValue ==false && deviceId!=''&&scope.orientation!='Landscape')
                                 	{
                                 		
                    										if(ord==3)
                    										{
                    										return;
                    										}
										    playGenericItem(scope.order[ord], elem);
                                           ord++;
                                 	}

                                    else if(scope.videoValue ==false &&deviceId!=''&& scope.orientation=='Landscape')
                                    {
                                      
									  playGenericItem(scope.order[ord], elem);
                                           ord++;
                                    }

                                    else if(scope.videoValue ==true &&deviceId!=''&& scope.orientation=='Landscape')
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

                        checkVideo=function()
                        {
                        	 
                           data=[];
                           content.getSettingXML().then(function(response) {
              
        						 response = angular.copy(response);
                               if(response.Sections.Section.Data instanceof Array)
                                
                                {
                                  for(var k =0 ; k<response.Sections.Section.Data.length;k++)
                                    {
                  
                                      
									  
									  
                                      if(response.Sections.Section.Data[k]._Id == "Video")
                                      {
                                         
                                       
                                                              scope.videoValue = true;
                                                              scope.orientation=response.Sections.Section._Orientation;
                                                              break;
                                      }
                                      

                                        
                                        else
                                        {
                                         
                                          scope.videoValue = false;
										  scope.orientation=response.Sections.Section._Orientation;

                                        }
                
                
                                    }
                                    
                                }
                                else
                                {
                                  

                                  data[0]=response.Sections.Section.Data;
                                  
                                  if(data[0]._Id=='GenericModules' && response.Sections.Section._Orientation=="Landscape")
                                  {
                                    
                                    scope.videoValue=false;
                                    scope.orientation="Landscape";

                                  }
                                  else if(data[0]._Id=='Video' && response.Sections.Section._Orientation=="Landscape")
                                  {
                                    scope.videoValue=true;
                                    scope.orientation="Landscape";

                                  }

                                  else if(data[0]._Id=='Video' && response.Sections.Section._Orientation=="Portrait")
                                  {
                                    scope.videoValue=true;
                                    scope.orientation="Portrait";

                                  }
                                  else
                                  {
                                    scope.videoValue=false;
                                    scope.orientation="Portrait";
                                  }


                                }
						

							
                                getContent();

                        	});	
                    	}
                         


                      scope.$watch("load", function(){
					          ord=0;
                    
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    
                    
                   checkVideo();
                }
                else
                {
                    
                }
                });



                         checkVideo();
                        



			 }
			 
			 
			 
		  
        }
    }]);
