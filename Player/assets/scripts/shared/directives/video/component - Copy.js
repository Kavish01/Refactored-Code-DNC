angular
    .module("IONOS")
    .directive('videoModule', ['$compile', "$sce","$timeout","$interval", "content", "configService",  function(compile, sce, timeout,interval,content, configService) {
        
        












        // <div id="IdleModule"><iframe src="http://www.w3schools.com" ng-show="iframeSrc.length>1" width="100%" height="100%"></iframe><img ng-src="{{imgSrc}}" ng-show="imgSrc.length>1" width="100%" height="100%" /><video width="100%" height="100%" ng-show="videoSrc.length>1" ng-src="{{videoSrc}}"></video></div>


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
            videoSwitchTimeout,
            playVideoItem,
            element = null,
            counter = 0,
            duration = 15000;



 

            playVideoItem = function(item)
            {
                //console.log(duration + " -------------- ");
                var html = "";
                var folder="Video";
                //console.log("inside iffffffffffffffffffffffffffffff"+scope.config);

                if(videoUrls.length > 0 && videoUrls[item])
                    {
                       
                        item = videoUrls[item];

                        switch(item._VideoType)
                            {
                                case "Video":
                                case "VideoAd":
                                
                                
                                    //alert("inside elseeeeeeeeeeeeeeeeeeeeeee"+item._AssetPath);
                              html = '<video id="videoElement"   src="'+currentAssetPath+'/'+folder+'/'+item._AssetPath +'"  poster="assets/imgs/loader.gif" autoplay autobuffer></video>';
                                 
                                    element.html(html);

                                    var videoElement = element.find("video")[0];
                                    

                                    // Load and Play video
                                    videoElement.load();
                                    videoElement.play();
                                    
                                        if(item._VideoType == "VideoAd"){
                                        duration = parseInt(item._Duration);
                                    }else
                                    {
                                        duration = 10000;
                                         videoElement.addEventListener("ended", onEnd);
                                         function onEnd()
                                         {
                                            // alert("Video");
                                             interval.cancel(videoSwitchTimeout);
                                             videoSwitchTimeout = interval(function() { onTimeout(); },100);
                                //      videoSwitchTimeout = timeout(onTimeout, 100);
                                         //var videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);
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
                                break
                                case "URL":
                                    html = '<iframe src="'+ item._FilePath +'" width="100%" height="100%"></iframe>';
                                    duration = parseInt(item._Duration);
                                    element.html(html);
                                break
                            }
                    }

                //element.html(html);
            }







getContent = function()
                        {
                           //console.log("inside get content--------------------------------------------------------");
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

   

                     //console.log(videoUrls+"---------"+duration);
                     
                        playVideoItem(counter);
                        // Start duration timer
                        //console.log(duration + " -------------- "+videoUrls);
                        
                        
                         
                        //var timeInterval = interval
                         
                          videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);
                         
                       // videoSwitchTimeout = timeout(onTimeout, (3000));
                        
                        
                           

                  }); 
                        }


                        onTimeout = function()
                            {
                                counter++;
                                //alert(counter)
                                // Update media
                                playVideoItem(counter);

                                // Start duration timer
                                interval.cancel(videoSwitchTimeout);
                               // timeout.cancel(videoSwitchTimeout);
                              //  videoSwitchTimeout = timeout(onTimeout, (duration * 1000));
                                  videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);

                                if(counter === (videoUrls.length - 1))
                                    {
                                        counter = -1;
                                    }
                            }



                //console.log(scope.load)

                scope.$watch("load", function(){
                    //console.log(scope.load, "Item Updated");
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    //console.log("value changed"+scope.load);
                    counter = 0;

                    videoUrls = [];
                    interval.cancel(videoSwitchTimeout);
                    videoSwitchTimeout = null;
                    duration = 15000;
                    element.html("");
                    getContent();
                }
                else
                {
                    //console.log("value not changed");
                }
                });
                    
                /*scope.$on("instantMessage", function(event,message1,message2){
                        alert("inside video component"+message2);
                        //getContent();
                    });*/
                    element = angular.element( document.querySelector( '#videoComp' ) );
                  getContent();


             }
        }
    }]);
