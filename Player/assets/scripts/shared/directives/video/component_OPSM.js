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
            videoSwitchTimeout,
            playVideoItem,
            element = null,
            counter = 0,
            duration = 15000;





            playVideoItem = function(item)
            {
                ////console.log(duration + " -------------- ");
                var html = "";
                var folder="Video";
                ////console.log("inside iffffffffffffffffffffffffffffff"+scope.config);
interval.cancel(videoSwitchTimeout);
                if(videoUrls.length > 0 && videoUrls[item])
                    {
                       
                        item = videoUrls[item];

                        switch(item._VideoType)
                            {
                                case "Video":
                                case "VideoAd":
                                
                                
                                    //alert("inside elseeeeeeeeeeeeeeeeeeeeeee"+item._AssetPath);
                              html = '<video    src="'+currentAssetPath+'/'+folder+'/'+item._AssetPath +'"  poster="assets/imgs/loader.gif" preload="none" autoplay autobuffer></video>';
                                
                                    element.append(html);
                                                                                                                                                var videoElement = element.find("video")[element.find("video").length-1];
                                    

                                    // Load and Play video
                                    videoElement.load();
                                    videoElement.play();
                                                            

 videoElement.addEventListener("loadedmetadata", function()
  {
duration = parseInt(videoElement.duration); 
//console.log(videoElement.duration + " ------------- Video Duration");
videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);
  }
);
                                                                                                                                                
                                                                /* var videoElementDiv = interval(function(){
                                                                  interval.cancel(videoElementDiv);
                                                                   //console.log(videoElement.duration + " ------------- Video Duration");
                                                                  duration = parseInt(videoElement.duration); 
                                                                  if(duration==NaN)
                                                                  {
                                                                    duration=15;
                                                                  }
                                                                  //console.log(videoElement.duration + " ------------- final Video Duration");
                                                                 videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);
                                                                  },1500);
                                                                                */                                                                

                                   
                                   

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
                                                                                                                                                videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);
                                    element.append(html);
                                break
                                case "URL":
                                    html = '<iframe src="'+ item._FilePath +'" width="100%" height="100%"></iframe>';
                                    duration = parseInt(item._Duration);
                                                                                                                                                videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);
                                    element.append(html);
                                break
                            }
                    }
       
                   
                   

  if($("#videoComp").children().length>1)
  {
                $("#videoComp >*").first().css("zIndex", 10000 );
                $("#videoComp >*").last().hide();
$("#videoComp >*").first().animate({ opacity: 0 },{duration: 'slow',easing: 'swing',complete: function(){$(this).remove();
                                                                if($("#videoComp >*").first().is("video")){
                                                //            $("#videoComp").find("video")[0].load();
                                                                //$("#videoComp").find("video")[0].play();
                                                                }
                                                                }});            
                                                                                
            $("#videoComp >*").last().fadeIn('slow');
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
                         
                          
                         
                       // videoSwitchTimeout = timeout(onTimeout, (3000));
                        
                        
                           

                  }); 
                        }


                        onTimeout = function()
                            {
                                counter++;
                                //alert(counter)
                                // Update media
                                                                                                                                if(counter === (videoUrls.length ))
                                    {
                                        counter = 0;
                                    }
                                                                                                                                
                                playVideoItem(counter);

                                // Start duration timer
                            //    interval.cancel(videoSwitchTimeout);
                               // timeout.cancel(videoSwitchTimeout);
                              //  videoSwitchTimeout = timeout(onTimeout, (duration * 1000));
                                 // videoSwitchTimeout = interval(function() { onTimeout(); },duration * 1000);

                                
                            }



                ////console.log(scope.load)

                scope.$watch("load", function(){
                    ////console.log(scope.load, "Item Updated");
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    ////console.log("value changed"+scope.load);
                    counter = 0;

                    videoUrls = [];
                    interval.cancel(videoSwitchTimeout);
                    videoSwitchTimeout = null;
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
