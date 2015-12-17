var myApp= angular.module('IONOS');
var count= 0;
var dualSpaceId;
var Seatresponse;
var firstNodeIndex = 0;
var secondNodeIndex = 0;
var thirdNodeIndex = 0;
var walkPathSpaceId = "";
var setTop = '';
var setTopADA = '';
var setSeatBand = ''; 
var isSameLevel = true;
var selectedLevel = "";
var PopMsg = "";
var PanelMsg = "";
myApp.controller('seatFinderController', ['$scope','$compile', '$http', "$sce","$timeout", "content" ,"$idle","$location",'$rootScope','$interval', 
function($scope,compile, $http, $sce,$timeout,content,$idle,$location,$rootScope,interval) 
{
	
	 $scope.valueNumber = [];
	 $scope.seatNumber = [];
	 $scope.rowNumber = [];
	 $scope.topTxt = "Select your section";
	 $scope.leftButtonValue ="";
	 $scope.lodgeValue = "";
	 $scope.rowValue = "";
	 $scope.seatval = "";
	 $scope.PanelMsg = "";
	 var listScroll = null;
	 var arrowContainer = $("#arrowContainer");
	 _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Seat Finder", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Seat Finder", "ADA=Off&Module=Navigation Panel");
	 $(".hideBut").hide();	 
	 arrowContainer.show();
	 var getMapContentHeight = $('#mapContent').height();
	 if(getMapContentHeight > 800){
		//setTop = "317px";
		setTopADA = "215px";
		
	 } else {
		//setTop = "158px";
		setTopADA = "109px";
		
	 }		
init = function(){
	$timeout(function(){
		listScroll = new iScroll('categorySeatFinderWrapper', {
            hScrollbar: false,
            vScrollbar: false,
			click:true,
			
  onScrollEnd: function() {
	  var scEle = $("#categorySeatFinderWrapper").children()[0];
	 console.log($(scEle).height() + "  ----  " + $(scEle).position().top);
	 if($(scEle).position().top < -200){
		 arrowContainer.hide(); 
	 }else{
		 arrowContainer.show();
	 }
	
  }
        });
		$(".seatFinderFooter").show();
		$scope.showMainScreen();
		},300);
}
	 
	$scope.handleClickEvent = function($event){
				   	
		if($scope.adaMode==true)
		{
			$('.listNumberContainer').addClass('listNumberADA');
			//$("#SeatListWrapper, #SeatListWrapper1, #SeatListWrapper2").css("top",setTopADA);
		//	$(".Seatband").css("top",setSeatBand);			
		}
		else
		{
			$('.listNumberContainer').removeClass('listNumberADA');
		//	$("#SeatListWrapper, #SeatListWrapper1, #SeatListWrapper2").css("top",setTop);	
		
			//$(".Seatband").css("top",308);
			//$(".Seatband").addClass("SeatBandNonADA");
		}

		$($event.currentTarget).parent().find("li").removeClass('seatFinderActive');
		$($event.currentTarget).addClass('seatFinderActive');
		firstNodeIndex = parseInt($event.target.id);
		$scope.leftButtonValue  = $($event.target).text();
		var data_array = $scope.leftButtonValue.split('(');
                     $scope.leftBtnValue = data_array[0]; 
                     		
		var len = $scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data.length;
		var numberItem = [];
		
		$scope.valueNumber.splice(0,$scope.valueNumber.length);
		
		if($scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data instanceof Array)
		{

		for(var getNum = 0 ; getNum<len;getNum++)
			{
			numberItem.push($scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[getNum]._Name);
			}
		}
		else
		{
			numberItem[0]=$scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data._Name;
		}
		
				
		$scope.valueNumber=  numberItem;
		_isAdaModeEnable == true ? content.setUnica("Seat Finder_"+$scope.leftButtonValue, "", "ADA=On&Module=Seat Finder") : content.setUnica("Seat Finder_"+$scope.leftButtonValue, "", "ADA=Off&Module=Seat Finder");
		$scope.topTxt = "Thanks! Everything Looks Good.";
		var enableBtn = angular.element(document.querySelector('.seatFinderFooter') );
		$(enableBtn).find(".col:last-child div:last-child").fadeIn().css("display","inline-block");
		var seatTable = angular.element(document.querySelector('#numberList') );
		$(seatTable).hide().css("display","table-cell").fadeIn();

		
		 
	}
	
	$scope.backToSlide = function(){
		if(!isSameLevel){	
			esclatorWalkPath($rootScope.nearEscId,PopMsg);
			}else{
				hidePopUP();
		clearSeatFinderWalkPath();
			}
		var elementDiv = angular.element( document.querySelector('#seatFinderWrapper') );
		var enableBtn = $(elementDiv).find('.seatFinderFooter');
		$(enableBtn).find(".col:last-child >div:last-child").fadeOut().css("display","inline-block");
		$(enableBtn).find(".col:last-child >div:first-child").fadeOut().css("display","none");
		$(enableBtn).find(".col:first-child >div").fadeOut().css("display","none");
		$(enableBtn).parent().find(".helpSection").fadeIn();
		$scope.topTxt = "Thanks! Everything Looks Good.";
		
		var nextTable  = $(elementDiv).find('#buttonContainer');
		$(nextTable).css("display","table-cell");
		var numberTable = $(elementDiv).find('#numberList');
		$(numberTable).css("display","table-cell");
		
		var seatTable = $(elementDiv).find('#thirdList');
		$(seatTable).css("display","none");
		
		var rowTable = $(elementDiv).find('#secondList');
		$(rowTable).css("display","none");
		var secondNodeIndex = 0;
var thirdNodeIndex = 0;
		$scope.rowNumber.splice(0,$scope.rowNumber.length);
		$scope.seatNumber.splice(0,$scope.seatNumber.length);
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
$scope.$apply();
		}

		
		
	}
	$scope.hideHelpSection = function(){
		$(".seatFinderFooter").animate({height:"100px"},400);
		$('.seatFinderFooter').find(".navbuttonContainer").fadeIn();
		$('.seatFinderFooter').find(".mapImg").fadeOut();
		$('.seatFinderFooter').find(".description").fadeOut();
		$('.seatFinderFooter').find(".description").fadeOut();
		$(".hideBut").hide();
		var getSrc = $('.title img').attr('src').replace('_on.','_off.');
			 $('.title img').attr('src',getSrc);
	}
	$scope.showHelpContainer = function(){
		$(".seatFinderFooter").animate({height:"300px"},400);
		$('.seatFinderFooter').find(".navbuttonContainer").fadeOut();
		var getSrc = $('.title img').attr('src').replace('_off.','_on.');
			 $('.title img').attr('src',getSrc);
		$('.seatFinderFooter').find(".mapImg").fadeIn();
		$('.seatFinderFooter').find(".description").fadeIn();
		$('.seatFinderFooter').find(".description").fadeIn();
		$(".hideBut").show();
		
		
	}
	isDifferentFloor = function(n){
		var DNodes=$rootScope.seatFinderArray[0].DNode;
		var i=DNodes.length-1;
		while(i>-1){
			if($scope.leftButtonValue == DNodes[i]._Name){
				var seats=DNodes[i].seats.seat;
				 
				if(seats.length == undefined){
					PopMsg = seats._PopMsg;
					$scope.PanelMsg  = seats._PanelMsg;
					selectedLevel = seats._Floor;
					return !($rootScope.currentFloor == seats._Floor);
				}
				
				for(var k = 0 ; k < seats.length;k++){
					var splitRange = seats[k]._Range.split("-");
					for(var m=splitRange[0], len=splitRange[1]; m < len; m++){
						if(n == m){
							if($rootScope.currentFloor != seats[k]._Floor){
								PopMsg = seats[k]._PopMsg;
					$scope.PanelMsg  = seats[k]._PanelMsg;
								selectedLevel = seats[k]._Floor;
								return true;
							}
							
						}
					}
						
					
				}
				
				
			}
		//	return !(currentFloor == seats[k]._Floor)
			i--;
		}
			
		
		return false;
	}
	$scope.showMainScreen = function(){
		$("#seatFinderTable").show();
			$(".ttSeatFinder").show();
			$(".nearEscScreenWrapper").hide();
	}
	
	$scope.goToNextSlide = function(){
		
		var secondList = angular.element( document.querySelector('#SeatListWrapper') );
		var elem=$(secondList).find(".selectedRow");
		secondNodeIndex = elem.index();
		$scope.lodgeValue = elem.text();
		console.log($scope.lodgeValue);
		if(isDifferentFloor($scope.lodgeValue)){
			isSameLevel = false;
			
			console.log("Yes it is different");
			
		}else{
			isSameLevel = true;
		}
		console.log();
		var node=$scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data;
		if(angular.isUndefined(node.length)){
			try{
			dualSpaceId = node._SpaceID;
			if($scope.leftButtonValue.toLowerCase() == "flr (floor)"){

				 seatfinderShowWalkPath(dualSpaceId,true);
				
				  $("#seatFinderTable").hide();
			$(".ttSeatFinder").hide();
			$(".nearEscScreenWrapper").show();
			}
			else if(!isSameLevel){	
			esclatorWalkPath($rootScope.nearEscId,PopMsg);
			}
			else{
		 seatfinderShowWalkPath(dualSpaceId,true);
			}
			}catch(e){}
			return;
		}else{
			try{
			dualSpaceId = node[secondNodeIndex]._SpaceID;
				if($scope.leftButtonValue.toLowerCase() == "flr (floor)"){
				 seatfinderShowWalkPath(dualSpaceId,true);
				
				 $("#seatFinderTable").hide();
			$(".ttSeatFinder").hide();
			$(".nearEscScreenWrapper").show();
			}
			else if(!isSameLevel){	
			esclatorWalkPath($rootScope.nearEscId,PopMsg);
			$("#seatFinderTable").hide();
			$(".ttSeatFinder").hide();
			$(".nearEscScreenWrapper").show();
			}
			else{
		 	seatfinderShowWalkPath(dualSpaceId,true);
			}
			}catch(e){}
		}
		
		
		
		_isAdaModeEnable == true ? content.setUnica("Seat Finder_"+$scope.leftButtonValue+" "+$scope.lodgeValue, "", "ADA=On&Module=Seat Finder") : content.setUnica("Seat Finder_"+$scope.leftButtonValue+" "+$scope.lodgeValue, "", "ADA=Off&Module=Seat Finder");
		if(angular.isUndefined($scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data)){
			return;
		}
		var elementDiv = angular.element( document.querySelector('#seatFinderWrapper') );
		var enableBtn = $(elementDiv).find('.seatFinderFooter');
		$(enableBtn).find(".col:last-child >div:last-child").fadeOut().css("display","none");
		$(enableBtn).find(".col:last-child >div:first-child").fadeIn().css("display","inline-block");
		$(enableBtn).find(".col:first-child >div").fadeIn().css("display","inline-block");
		$(enableBtn).find(".buttonTab").css("display","table");
		$(enableBtn).parent().find(".helpSection").fadeOut();
		var len = $scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data.length;
		var rowItem = [];
		
		for(var getNum = 0 ; getNum<len;getNum++){
			rowItem.push($scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data[getNum]._Name);
		}
		
		$scope.rowNumber=  rowItem;
		var seatItem= [];
	
		var seatlen = $scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data[0].Data.length;
		
		for(var seatNum = 0 ; seatNum< seatlen;seatNum++){
			seatItem.push($scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data[0].Data[seatNum]._Name);
		
		}
		 
		$scope.seatNumber = seatItem;
		lst.refresh();
		<!--end of data Feeding-->
			$(elementDiv).find("#SeatListWrapper2").parent().find(".Seatband").text("Row:");
		$(elementDiv).find('#SeatListWrapper1').parent().find(".Seatband").text("Seat:");
		var nextTable  = $(elementDiv).find('#buttonContainer');
		$(nextTable).css("display","none");
		var numberTable = $(elementDiv).find('#numberList');
		$(numberTable).css("display","none");
		
		var seatTable = $(elementDiv).find('#thirdList');
		$(seatTable).css("display","table-cell");
		
		var rowTable = $(elementDiv).find('#secondList');
		$(rowTable).css("display","table-cell");
		var scdList = angular.element( document.querySelector('#SeatListWrapper2') );
		
		//$scope.valueNumber=  numberItem;
		$(scdList).on('moveEnd',changeSeatValue);
		
	$scope.topTxt = "Enter your row & seat numbers to find your entrance";
		
		
		
		
	}
	$scope.goBackTo = function(){
		$("#seatFinderWrapper .backButton").fadeOut(400,function(){
		$(".refinedScreen").slideUp();
		$("#seatFinderSecondTable").show();
		$("#seatFinderTable").fadeIn();
		
		if(!isSameLevel){	
			esclatorWalkPath($rootScope.nearEscId,PopMsg);
			}else{
			seatfinderShowWalkPath(dualSpaceId,true);
			}
		
		$scope.topTxt = "Enter your row & seat numbers to find your entrance";
		});
	
	}
	$scope.sendSpaceIdMap = function(){

	
		var rowValue = $("#SeatListWrapper2").find("ul");
		$scope.rowValue = ($(rowValue).find(".selectedRow").html());
		var seatValue = $("#SeatListWrapper1").find("ul");
		$scope.seatval  = ($(seatValue).find(".selectedRow").html());
		//_isAdaModeEnable == true ? content.setUnica("Seat Finder" ,"Open","ADA_Seatfinder_"+$scope.rowValue+","+$scope.seatval) : content.setUnica("Seat Finder" ,"Open","Seatfinder_"+$scope.rowValue+","+$scope.seatval);	
		var seatIndex = ($(seatValue).find(".selectedRow").index());
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
		$scope.$apply();
		}
		$("#seatFinderSecondTable").hide();
		$("#seatFinderTable").fadeOut();
		$(".refinedScreen").slideDown();
		$("#seatFinderWrapper .backButton").css("display","table").fadeIn();
		$scope.topTxt = "";
	walkPathSpaceId = $scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data[thirdNodeIndex].Data[seatIndex]._SpaceID;
	if(!isSameLevel){	
			esclatorWalkPath($rootScope.nearEscId,PopMsg);
			}else{
				isPopUpShowing=false;
	seatfinderShowWalkPath(walkPathSpaceId,false);
			}
		return;
	$(window).trigger('changedSpace.ControlPannel', 'FD408');
	}
	function changeSeatValue(e){
		var checkTime = setInterval(function(){
			clearInterval(checkTime);
		var secondList = angular.element( document.querySelector('#SeatListWrapper2') );
		thirdNodeIndex = $(secondList).find(".selectedRow").index();
		//$scope.seatval = $(secondList).find(".selectedRow").text();
		var len  = $scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data[thirdNodeIndex].Data.length;
		var numberItem = [];
		for(var getNum = 0 ; getNum<len;getNum++){
			numberItem.push($scope.xmlObj.Sections.Section.Data[firstNodeIndex].Data[secondNodeIndex].Data[thirdNodeIndex].Data[getNum]._Name);
		}
		
		$scope.seatNumber.splice(0,$scope.seatNumber.length);
		$scope.$apply();
		$scope.seatNumber=  numberItem;
		if(lst != null){
		lst.refresh();
		}
		},200);
		
	}
	$scope.isNumberVisible = false;
	

      			getNearbyData=function()
	      			{
	      				 url =  "../Data/GenericModules/Data.xml";
						$http.get(url).then(function (response) {
                        var x2js = new X2JS();
                         var path = x2js.xml_str2json(response.data);
						 url = "../Data/GenericModules/" + path.Sections.Section.Data._AssetPath + "/Seatfinder.xml";
						 content.getSeatFinderModuleData(url).then(function(Seatresponse)
	      				{
							var listElement = angular.element( document.querySelector('#seatFinderContiner') );
	      					Seatresponse = angular.copy(Seatresponse);
							$scope.xmlObj = Seatresponse;
							var nameArr = []
							for(var k = 0 ; k<Seatresponse.Sections.Section.Data.length;k++){
								
								nameArr.push(Seatresponse.Sections.Section.Data[k]._Name);
							
							}
							$scope.listArray = nameArr;
init();
	      					
	      				});
						});
	      				 
	      			}
getNearbyData();
getMessageData();
	
  
   }]);

   
