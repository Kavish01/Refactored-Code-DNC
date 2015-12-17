angular
    .module("IONOS")
    .directive('videoModule', ['$compile', "$sce","$timeout","$interval", "content", "configService",  function(compile, sce, timeout,interval,content, configService) {

        return {
            restrict: 'A',
            scope: { load : "=" ,
            ist:"=",
            
            transparentload:"="

        },
            template: '<div  class="moduleHeaderStyle clearfix" ng-show="videoHeaderText.length>0">{{videoHeaderText}}</div><div class="clearfix videoContainer"><div id="videoComp" class="module-container clearfix">Loading...</div><div ng-show="ist" id="isTransparent" data-load="transparentload" transparentad-module class="transparentAds"></div></div>',
            link: function(scope, elem, attrs)
                {
                
            var videoUrls = [],
           
            playVideoItem,
            element = null,
            counter = 0,
            duration = 15000;
            var  videoModuleTimeout=0;



 

            playVideoItem = function(item)
            {
                ////console.log(duration + " -------------- ");
                var html = "";
                var folder="Video";
                ////console.log("inside iffffffffffffffffffffffffffffff"+scope.config);

                if(videoUrls.length > 0 && videoUrls[item])
                    {
                       
                        item = videoUrls[item];

                        switch(item._VideoType)
                            {
                                case "Video":
                                case "VideoAd":
                                
                                
                                    //alert("inside elseeeeeeeeeeeeeeeeeeeeeee"+item._AssetPath);
                              html = '<video id="videoElement"   src="'+currentAssetPath+'/'+folder+'/'+item._AssetPath +'"  poster="assets/imgs/loader.gif" preload="none" autoplay autobuffer></video>';
                                 
                                    element.html(html);

                                    var videoElement = element.find("video")[0];
                                    

                                    // Load and Play video
                                    videoElement.load();
                                    videoElement.play();
                                    
                                        if(item._VideoType == "VideoAd"){
                                        //duration = parseInt(item._Duration);
                                        duration = 10000;
                                         videoElement.addEventListener("ended", onEnd);
                                         function onEnd()
                                         {
                                          
                                            // alert("Video");
                                             interval.cancel(videoModuleTimeout);
                                             videoModuleTimeout = interval(function() { onVideoTimeout(); },100);
                                //      videoModuleTimeout = timeout(onVideoTimeout, 100);
                                         //var videoModuleTimeout = interval(function() { onVideoTimeout(); },duration * 1000);
                                    }
                                        
                                    }else
                                    {
                                        duration = 10000;
                                         videoElement.addEventListener("ended", onEnd);
                                         function onEnd()
                                         {
                                           
                                            // alert("Video");
                                             interval.cancel(videoModuleTimeout);
                                             videoModuleTimeout = interval(function() { onVideoTimeout(); },100);
                                //      videoModuleTimeout = timeout(onVideoTimeout, 100);
                                         //var videoModuleTimeout = interval(function() { onVideoTimeout(); },duration * 1000);
                                    }
                                    }

                                break;
                                case "Image":

                                if(deviceId!=''&& ip=='')
                              {
                                    html = '<img width="100%" height="100%" class="imgVideo" src="../Data_'+deviceId+'/'+folder+'/'+item._AssetPath +'" />';
                                }
                                else
                                {
                                     html = '<img width="100%" height="100%" class="imgVideo" src="../Data_'+ip+'/'+folder+'/'+item._AssetPath +'" />';
                                }


                                    
                                    duration = parseInt(item._Duration);
                                    element.html(html);
                                    interval.cancel(videoModuleTimeout);
                                    videoModuleTimeout = interval(function() { onVideoTimeout(); },duration * 1000);
                                break
                                case "URL":
                                    html = '<iframe src="'+ item._FilePath +'" width="100%" height="100%"></iframe>';
                                    duration = parseInt(item._Duration);
                                    element.html(html);
                                    interval.cancel(videoModuleTimeout);
                                    videoModuleTimeout = interval(function() { onVideoTimeout(); },duration * 1000);
                                break
                            }
                    }
              //element.html(html);
            }







getVideoContent = function()
                        {
                           ////console.log("inside get content--------------------------------------------------------");
                            content.getModuleData("video").then(function(data){
                        var videoData = data.Sections.Section.Data;
                        scope.videoHeaderText = data.Sections.Section._Label;

                        if (videoData instanceof Array) 

                           {

   for(var k = 0 ; k < videoData.length;k++)

                            {

                                videoUrls.push(videoData[k]);

                            }   

  }

  else

  {

   videoUrls[0] = videoData;

  }

   

                    // //console.log(videoUrls+"---------"+duration);
                     
                        playVideoItem(counter);
                        // Start duration timer
                        ////console.log(duration + " -------------- "+videoUrls);
                        
                        
                         
                        //var timeInterval = interval
                         
                         // videoModuleTimeout = interval(function() { onVideoTimeout(); },duration * 1000);
                         
                       // videoModuleTimeout = timeout(onVideoTimeout, (3000));
                        
                        
                           

                  }); 
                        }


                        onVideoTimeout = function()
                            {
                                
                                interval.cancel(videoModuleTimeout);
                                counter++;
                                ////console.log(counter)
                                // Update media
                                if(counter === (videoUrls.length ))
                                    {
                                        counter = 0;
                                    }
                                
                                playVideoItem(counter);

                                // Start duration timer
                                
                               // timeout.cancel(videoModuleTimeout);
                              //  videoModuleTimeout = timeout(onVideoTimeout, (duration * 1000));
                                 // videoModuleTimeout = interval(function() { onVideoTimeout(); },duration * 1000);

                                
                            }



                ////console.log(scope.load)

                scope.$watch("load", function(){
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    ////console.log("value changed"+scope.load);
                    counter = 0;

                    videoUrls = [];
                    interval.cancel(videoModuleTimeout);
                    videoModuleTimeout = null;
                    duration = 15000;
                    element.html("");
                    getVideoContent();
                }
                else
                {
                    ////console.log("value not changed");
                }
                });
                    
                /*scope.$on("instantMessage", function(event,message1,message2){
                        alert("inside video component"+message2);
                        //getVideoContent();
                    });*/
                    element = angular.element( document.querySelector( '#videoComp' ) );
                  getVideoContent();


             }
        }
    }]);
