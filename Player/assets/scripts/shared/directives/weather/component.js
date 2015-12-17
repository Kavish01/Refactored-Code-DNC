angular
    .module("IONOS")
    .directive('weatherModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
        return {
            restrict: 'AE',
          	template: '<div id="weather" width="100%" align="center" class="colLeft"> <div id="weatherContainer"><img id="imgWeather" alt="" src="{{sourceValue}}" /></div><div > <div ng-show="fahrenheit.length>0" class="farhen">{{fahrenheit}}<sup class="sub">&deg;F</sup></div><div ng-show="celsius.length>0">{{celsius}}<sup class="sub">&deg;C</sup> </div></div></div>',
            scope: {
            load: '='
		  },
           link: function(scope, elem, attrs) {
                
             	if(deviceId!='')
                    {
                        
                    }
                else
                {
					getWeatherContent = function(){
				   content.getModuleData("weather").then(function(response){
					    
					   //  Image path get stores here
					  
					 scope.sourceValue = "../Data_Common/Weather/"+response.Sections.Section.Data._AssetPath;
					   
					   //  fahrenheit get stores here
					   
					   scope.fahrenheit = response.Sections.Section.Data._Fahrenheit;
					   
					    //  celsius get stores here Celsius
						scope.celsius = response.Sections.Section.Data._Celsius;
					   			
	});
					}
					getWeatherContent();
		}	
			 scope.$watch("load", function(){
                   
                    if(scope.load.toUpperCase()=='TRUE')
                    {
                
                    getWeatherContent();
                }
                else
                {
                    ////console.log("value not changed");
                }
                });	
                   
		
                

            }
		   
        }
    }]);

// JavaScript Document