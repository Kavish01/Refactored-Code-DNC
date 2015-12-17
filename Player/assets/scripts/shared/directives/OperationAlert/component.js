angular
    .module("IONOS")
    .directive('operationModule', function() {
        return {
            restrict: 'AE',
			controller:'operationAlertController',
            template: '<header id="location1" class="clearfix"><div id="middleLocation" align="center"><img src="assets/imgs/icons/TDGardenLogo_Top.svg" /><div id="timeContainer">{{currentTime}}</div></div></header><div class="operationAlertContainer"><span class="opwrapper"><img id="OperationAlertImage" src="assets/imgs/icons/IM.png"/><div id="OperationAlertTitle">{{opTitle}}</div><div id="OperationAlertMessage">{{opMsg}}</div></span></div>',
            
            link: function(scope, elem, attrs) {
                   
                   
            
				
				

            }
        }
    })
	.controller('operationAlertController', ['$scope', '$timeout', '$rootScope', 'content', 'configService', '$location', function($scope, $timeout, $rootScope, content, configService, location) {
		getOperationAlertXML = function(){
			
			content.getModuleData("operation").then(function (response) {
				if(response == undefined || response.Sections.Section.Data == undefined)
				return
				
				if(response.Sections.Section._OperationAlert.toLowerCase() == "true"){

					$scope.$parent.operationAlertMsgStatus = true;
				}else{
					$scope.$parent.operationAlertMsgStatus = false;
				}
				$scope.opTitle = response.Sections.Section.Data._Title;
				$scope.opMsg = response.Sections.Section.Data._Summary;
			});
        
		}
		getOperationAlertXML();
		$rootScope.$on("operationAlert",function(){
			getOperationAlertXML();
		});
	}]);
