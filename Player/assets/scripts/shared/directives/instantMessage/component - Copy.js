angular
    .module("IONOS")
    .directive('instantMessage', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) {
        return {
            restrict: 'AE',
            scope:{
                value : "=" 
            },
            template: '<div id="instantMessage" >heloo hw r u</div>',
            
            link: function(scope, elem, attrs) {
               
                var instMsgString = [],
                
                tmr;
                var tmrStatus = false;
               var instantDuration =0;
                var element;
                var message=' ';
                countvalue =0;
                  element = angular.element( document.querySelector( '#instantMessage' ) );
                  document.getElementById('instantMessage').style.display = "none";  
				         scope.$watch("value", function(){
                    if(scope.value == ''){
                        return;
                    }
                   
                    var splitArr = scope.value.toString().split("~&");
                    instMsgString.push({msg:splitArr[0],time:splitArr[1]});
                    
                   
                    if(tmrStatus){
return;
                    }
                     //message= $("<span />", { html: instMsgString[0].msg}).text();
                      message= instMsgString[0].msg;
                     //console.log(message);
                      element.html('');
                     element.append(message);
                      document.getElementById('instantMessage').style.display = "block"; 
                     tmr = interval(updateTime, 1000);
                     tmrStatus = true;
                   
                    function updateTime()
                    {

                        countvalue++;
                        
                        if(instMsgString.length>1 && parseInt(instMsgString[0].time)>15){
                            
                        instantDuration = 15;

                        }else{
                           instantDuration = parseInt(instMsgString[0].time);
                            
                        }
                        
                       
                       
                        if(countvalue >= instantDuration){
                            //console.log("countvalue greater");
countvalue = 0;
//interval.cancel(tmr);
instMsgString.shift();
if(instMsgString.length<1)
{
    //console.log("when data delete"+instMsgString.length);
interval.cancel(tmr);
tmrStatus = false;
//element.html('');
document.getElementById('instantMessage').style.display = "none"; 
}
else
{
  
    //tmr = interval(updateTime, 1000);
    // message= $("<span />", { html: instMsgString[0].msg}).text();
      message= instMsgString[0].msg;
                      // $(".instant").css("display", "block");
                      element.html('');
                     element.append(message);
                     document.getElementById('instantMessage').style.display = "block"; 

}
                        }

                    }
                });
				

            }
        }
    }]);
