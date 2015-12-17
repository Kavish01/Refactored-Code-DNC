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
           link: function(scope, element, attrs) 
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
                 //element = angular.element( document.querySelector( '.genericmodule-container' ) );
                playGenericItem = function(item) 
                {
                        
                        
                        var html = "";
                        item = urls[item];
                        //alert("generic item 1" +item._FileType);
                        
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
						element.html('');
                        element.append(html);
						$('#iframe').load(function(){ $(".markItUpPreviewFrame").contents().click();$(".markItUpPreviewFrame").contents().click(function(e){ $(".markItUpPreviewFrame").contents().find("[href='#']").attr("href","javascript:void(0)");
						
						}); 
});
                       // $('iframe  a').click(function(e) {alert("yipee got inside  iframe"); e.preventDefault();});
                      
                      
                }                   

				getContent = function()
                        {
                           counter=0;
						   element.html('');
                            content.getModuleData("generic").then(function(data) {

                                data = angular.copy(data);
                               //scope.generictext = data.Sections.Section._Label;
                                var moduleData = data.Sections.Section.Data;
                                //alert("value of scope"+scope.videoValue+scope.orientation);
                                urls = [];
                                
                                

                                if (moduleData instanceof Array) 
                                {
                                    ////console.log("inside if and its a array"+moduleData +""+deviceId);
                                    for (var k = 0; k < moduleData.length; k++) 
                                    {
                                        urls.push(moduleData[k]);
                                    }
                                    //alert(scope.videoValue+scope.orientation);
                                    
                                 	if(scope.videoValue ==true && deviceId!='' &&scope.orientation!='Landscape')
                                 	{
                                 		//alert(scope.videoValue+scope.orientation+1);
                                  //  alert("inside if with video value");
                                 		//playGenericItem(counter, element);
                                        //playGenericItem(++counter, element);
										if(ord==2)
										{
										return;
										}
										    playGenericItem(scope.order[ord], element);
                                           ord++;

                                 	}
                                 	else if(scope.videoValue ==false && deviceId!=''&&scope.orientation!='Landscape')
                                 	{
                                 		//alert(scope.videoValue+scope.orientation+2);
                                 		//playGenericItem(counter, element);
                                 		//playGenericItem(++counter, element);
                                        //playGenericItem(++counter, element);
										if(ord==3)
										{
										return;
										}
										    playGenericItem(scope.order[ord], element);
                                           ord++;
                                 	}

                                    else if(scope.videoValue ==false &&deviceId!=''&& scope.orientation=='Landscape')
                                    {
                                      //alert(scope.videoValue+scope.orientation+3);
                                      //playGenericItem(counter, element);
									  playGenericItem(scope.order[ord], element);
                                           ord++;
                                    }

                                    else if(scope.videoValue ==true &&deviceId!=''&& scope.orientation=='Landscape')
                                    {
                                      //alert(scope.videoValue+scope.orientation+4);
                                      //playGenericItem(counter, element);
									      playGenericItem(scope.order[ord], element);
                                           ord++;
                                    }

                                      else
                                    {
                                       ////console.log("inside else generic html player with video value"+moduleData.length);
                                                playGenericItem(scope.order[ord], element);
                                           ord++;
                                    }

                                } 
                                else 
                                {
                                	
                                    urls[0] = moduleData;
                                    ////console.log("inside else and its not a  array"+urls[0]);
                                    playGenericItem(counter, element);
                                }
   //  $('iframe').contents().find('a').hide();
   
                              // alert($('iframe').contents().find("body").html());
                                // $('iframe').contents().find('a').remove();

/*
                                $("iframe").load(function()
                      {
//var bd = $('iframe').contents().find("body");
var script="<SCRIPT LANGUAGE='javascript'>try { if (top == self) {top.location.href='test.html'; } } catch(er) { } </SCRIPT>";
alert($(this).contents().find("html").html());
    //alert("cappend  ");
   });*/

                            }); 
                        }

                        checkVideo=function()
                        {
                        	 //totallength=0;
                           data=[];
                           content.getSettingXML().then(function(response) {
              
        						 response = angular.copy(response);
                               if(response.Sections.Section.Data instanceof Array)
                                
                                {
                                  for(var k =0 ; k<response.Sections.Section.Data.length;k++)
                                    {
                  
                                      //alert("inside for");
									  
									  
                                      if(response.Sections.Section.Data[k]._Id == "Video")
                                      {
                                         
                                       //alert("inside if of checkVideo");
                                                              scope.videoValue = true;
                                                              scope.orientation=response.Sections.Section._Orientation;
                                                              break;
                                      }
                                      

                                        
                                        else
                                        {
                                         // alert("kuch bhi");
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
                                    //alert("poka choka"+response.Sections.Section._Orientation);
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
						//alert("inside check video"+response.Sections.Section.Data);

							
                                getContent();

                        	});	
                    	}
                         


                      scope.$watch("load", function(){
					  ord=0;
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    ////console.log("value changed"+scope.load);
                    
                   checkVideo();
                }
                else
                {
                    ////console.log("value not changed");
                }
                });



                         checkVideo();
                        



			 }
			 
			 
			 
		  
        }
    }]);
