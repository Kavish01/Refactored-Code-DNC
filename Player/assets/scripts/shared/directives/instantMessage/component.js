angular
    .module("IONOS")
    .directive('instantMessage', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) {
        return {
            restrict: 'AE',
            scope:{
                value : "=" 
            },
            template: '<img id="instantImage" src="assets/imgs/icons/IM.png" /><div id="instantMessage" ></div>',
            
            link: function(scope, elem, attrs) {
               
                var instMsgString = [],
                
                tmr,
                tmrStatus = false;
                instantDuration =0;
                var instantElement;
                countvalue =0;
                var message;
                instantElement = angular.element( document.querySelector( '#instantMessage' ) );
          scope.$watch("value", function()
          {
                    if(scope.value == '')
                      {
                          return;
                      }
                    instantElement = angular.element( document.querySelector( '#instantMessage' ) );
                    var splitArr = scope.value.toString().split("~&");
                    instMsgString.push({msg:splitArr[0],time:splitArr[1]});
                    if(tmrStatus)
                      {
                        return;
                      }
                    // message= $("<span />", { html: instMsgString[0].msg}).text(); 
                     message=instMsgString[0].msg;               
                     instantElement.html(message);
                     $(".instant").css({"opacity":"0.93", "z-index":200});
                     $("#instantMessage div").css({"font-size":"80px","font-family": "DIN Engschrift Std"} );
                    /* $(".instant").next().css({"position":"absolute", "z-index":-200});
                     $(".instant").next().css({"position":"relative"});*/
                     tmr = interval(updateTime, 1000);
                     tmrStatus = true;
                   
                    function updateTime()
                    {

                        countvalue++;
                        if(instMsgString.length>1 && parseInt(instMsgString[0].time)>15)
                          {
                            instantDuration = 15;
                          }
                        else
                          {
                            instantDuration = parseInt(instMsgString[0].time);
                          }

                        if(countvalue >= instantDuration)
                          {
                           
                              countvalue = 0;
                              //interval.cancel(tmr);
                              instMsgString.shift();
                              if(instMsgString.length<1)
                                {
                                   
                                    interval.cancel(tmr);
                                    tmrStatus = false;
                                    instantElement.html('');
                                    $(".instant").css({"opacity":"0", "z-index":0});
                                }
                              else
                                {
                                     // message= $("<span />", { html: instMsgString[0].msg}).text();
                                     message=instMsgString[0].msg;  
                                      instantElement.html(message);
                                       $(".instant").css({"opacity":"0.93", "z-index":200});
                     $("#instantMessage div").css({"font-size":"80px","font-family": "DIN Engschrift Std"} );
                                      
                                }
                          }

                      }   
            });
        

            }
        }
    }]);
