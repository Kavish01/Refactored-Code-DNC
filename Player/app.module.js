angular
.module("IONOS", ["ngRoute", "ngSanitize", "ngIdle", "angular-websocket"])
.constant('ENVIRONMENT', 'DEV')
.controller('appController', ['$scope', 'content', '$interval', '$location', '$idle', '$rootScope', '$routeParams' , '$route', '$window', function (scope, content, interval, location, $idle,  $rootScope, $rootParams , $route, $window) {
    scope.navClicked = '';
    response = null;
	var controlPanelDiv = angular.element(document.querySelector('#controlPanelUI'));
    var isControlPanelOpen = false;
    scope.headerNav = true;
    var idleTimer = 0;
    scope.searchClicked = 0;
    searchCounter = 1;
    var timeTimer = 0;
    var ping = false;
    scope.adaMode = false;
	scope.isExitShow = false;
    var heartbeatMonitor = 0;
    var isIdlePlayConfigured = true;
	var settingSeatBand = '';
	var setSeatListWrapper = '';
	var wrapperHeight;
	var wrapperHeightAda;
	var menuDetailContentHeightAda ;
	var menuDetailContentHeight;
	$rootScope.nearEscId = "Escalator13";
    location.url("/")

	var getMapContentHeight = $('#mapContent').height();
	 if(getMapContentHeight > 800){
	 wrapperHeight = 1100;

	 globalResolutionForMap = 1000;
		var controlPanelUI = '1050px';
		var searchItemList = '850';
		wrapperHeightAda = 710;
		menuDetailContentHeightAda = 400;
		menuDetailContentHeight = 540;
		if(_isAdaModeEnable == true) {		
			settingSeatBand = "308px";
			setSeatListWrapper = '215px';
		} else {
			settingSeatBand = "";
			setSeatListWrapper = '';
		}
	 } else {
	  globalResolutionForMap = 500;
	  wrapperHeight = 580;
	  wrapperHeightAda = 400;
	  menuDetailContentHeight = 350;
	  menuDetailContentHeightAda = 180;
		var controlPanelUI = '525px';
		var searchItemList = '400';
		if(_isAdaModeEnable == true) {	
			settingSeatBand = "211px";
			setSeatListWrapper = '215px';
		} else {
			settingSeatBand = "";
			setSeatListWrapper = '158px';
		}
	 }
	
    //Display current time
    timeTimer = interval(function () {
        //interval.cancel(timeTimer);
        var d = new Date();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        scope.currentTime = hours + ':' + minutes + ' ' + ampm;

    }, 1000);

    scope.checkme =
            {
                didyouknowvalue: 'false',
                idleplayvalue: 'false',
                vendorlistvalue: 'false',
                instantMessageString: ''
            };

    getHeartBeat = function () {
        content.htmlPlayerMonitoring().then(function (data) {
            data = angular.copy(data);
            console.log("heartbeat" + data);
            //response = data;

        },
            function () {
                console.log("heartbeaterror");
            });
    }

    scope.handleSearch = function ($event) {
        navSrc = '';
        $('#navigationPanelUI').css('display', 'none');
        $('#containerSearch').css('opacity', '1');
        $('nav li').each(function (index) {

            navSrc = $("img", $(this)).attr('src');

            $("img", $(this)).attr("src", navSrc.replace('on.', 'off.'));



        });
        location.url("/search");
		
        openControlPanel();
		
		nearbyScroll.refresh();
    };
    scope.openDetail = function (eleName) {
        //	alert(eleName);
        //$("#eleName").attr("src").replace('on.','off.');

        //location.url("/foodDrink");
    }

    scope.handleButtonClick = function ($event) {
        _onPageLoad = false;
        _isNonTouchReload = false;
        $('nav li').each(function (index) {

            navSrc = $("img", $(this)).attr('src');

            $("img", $(this)).attr("src", navSrc.replace('on.', 'off.'));
        });
        if (openId == "") {
            defaultMapState();
        }
        var strsrc = ''
        //var strSrc = $("img",$event.currentTarget).attr("src");
        //$("img",$event.currentTarget).attr("src",strSrc.replace("off.","on."));
        var clickItem = event.currentTarget.innerText.trim();
        $('#searchUI').css('display', 'block');
		isPopUpShowing = false;
        switch (clickItem) {
            case "SEAT FINDER":
                strsrc = $('nav #Seat img').attr('src')
                $('nav #Seat img').attr("src", strsrc.replace('off.', 'on.'));
                if (location.path() == "/seatFinder") {
                    $route.reload();
                }
                else {
                    location.url("/seatFinder");
                }
                break;
            case "FOOD & DRINK":
                strsrc = $('nav #Eat img').attr('src')
                $('nav #Eat img').attr("src", strsrc.replace('off.', 'on.'));
                if (location.path() == "/Eat/ ") {
                    $route.reload();
                }
                else {
                    location.url("/Eat/ ");

                }

                break;
            case "MERCHANDISE":
                strsrc = $('nav #Shops img').attr('src')
                $('nav #Shops img').attr("src", strsrc.replace('off.', 'on.'));
                if (location.path() == "/Shops/ ") {
                    $route.reload();
                }
                else {
                    location.url("/Shops/ ");
                }
                break;
            case "RESTROOMS":
                strsrc = $('nav #Restroom img').attr('src')
                $('nav #Restroom img').attr("src", strsrc.replace('off.', 'on.'));
                if (location.path() == "/Restroom/ ") {
                    $route.reload();
                }
                else {
                    location.url("/Restroom/ ");
                }
                break;
            case "MORE":
                showIconByCatagories(serviceArray);
                strsrc = $('nav #MoreSer img').attr('src')
                $('nav #MoreSer img').attr("src", strsrc.replace('off.', 'on.'));
                if (location.path() == "/Services/ / / / ") {
                    $route.reload();
                }
                else {
                    location.url("/Services/ / / / ");
                }
                break;
            default:
                strsrc = $('nav li:first-child img').attr('src')
                $('nav li:first-child img').attr("src", strsrc.replace('off.', 'on.'));
                if (location.path() == "/") {
                    $route.reload();

                } else {
                    location.url("/")
                }
                break;
        }

        // if (!isControlPanelOpen && scope.adaMode == false) {
        //     openControlPanel();
        //     nearbyScroll.refresh();
        // }
        // else if (isControlPanelOpen && scope.adaMode == true) {
        //     //closeControlPanel();
        //     openControlPanel();
        //     nearbyScroll.refresh();
        // }
        // else {
        //     //closeControlPanel()
        //     nearbyScroll.refresh();
        // }
        var tmr = setTimeout(function () {

            $('#wrapper').css("bottom", "auto");
            if (_isAdaModeEnable) {
                //$('#wrapper').height(510);
                //$('#searchItemList').height(710);
                $('#wrapper').addClass("wrapperListADA");
                $('#searchItemList').addClass("searchItemListADA");
            } else {
                //$('#wrapper').height(500);
                //$('#searchItemList').height(1350);
                $('#wrapper').addClass("wrapperListNonADA");
                $('#searchItemList').addClass("searchItemListNonADA")
            }
            clearInterval(tmr);
           // nearbyScroll.refresh();
        }, 100);


    };
    scope.handleAdaModeOff = function () {
        scope.adaMode = false;
        adaScroll = false;
        _isAdaModeEnable = false;
		content.setUnica("#DNC#Navigation Panel", "ADA Mode Off", "Module=Navigation Panel");
        $('.listNumberContainer').removeClass('listNumberADA');
        $("#SeatListWrapper, #SeatListWrapper1, #SeatListWrapper2").css("top",setSeatListWrapper);
       // $("#SeatListWrapper, #SeatListWrapper1, #SeatListWrapper2").addClass("SeatListWrapperNonADA");
        $(".Seatband").css("top", settingSeatBand);
        var tmr = setTimeout(function () {
            $('#wrapper').css("bottom", "auto");
            $('#wrapper').height(wrapperHeight);
            $('#searchItemList').height(searchItemList);
            $('#menuDetailContent').height(menuDetailContentHeight);
            clearInterval(tmr);
            nearbyScroll.refresh();
            if (menuScroll) {
                menuScroll.refresh();
            }
        }, 100);
    }
    scope.handleAdaMode = function () {
        scope.adaMode = true;
        adaScroll = true;
        _isAdaModeEnable = true;
        $('.listNumberContainer').addClass('listNumberADA');
        $("#SeatListWrapper, #SeatListWrapper1, #SeatListWrapper2").css("top",setSeatListWrapper);
        $(".Seatband").css("top", settingSeatBand);
        content.setUnica("#DNC#Navigation Panel", "ADA Mode On", "Module=Navigation Panel");
        _isNonTouchReload = false;
        var tmr = setTimeout(function () {
            $('#wrapper').height(wrapperHeightAda);
            $('#searchItemList').height(wrapperHeightAda);
            $('#menuDetailContent').height(menuDetailContentHeightAda);
            clearInterval(tmr);
            if (menuScroll) {
                menuScroll.refresh();
            }
            nearbyScroll.refresh();
        }, 300);
    }


    openControlPanel = function () {

        var tmr = setTimeout(function () {
            $('#wrapper').css("bottom", "auto");
            if (_isAdaModeEnable) {

                $('#wrapper').height(wrapperHeightAda);
                $('#searchItemList').height(wrapperHeightAda);
            } else {
                $('#wrapper').height(wrapperHeight);
                $('#searchItemList').height(searchItemList);
            }
            clearInterval(tmr);
            nearbyScroll.refresh();
        }, 100);


        //controlPanelDiv.css("height","48vh");
        $(controlPanelDiv).animate({
            height: $("#mapContent").height()
        },
   {
       easing: 'swing',
       duration: 1000,
       complete: function () {

           nearbyScroll.refresh();

       }
   });
    }
    closeControlPanel = function () {
        _isNonTouchReload = true;
        $(controlPanelDiv).animate({
            height: controlPanelUI
        },
   {
       easing: 'swing',
       duration: 1000,
       complete: function () {
           isControlPanelOpen = false;
           $('#restroomWrapper').css('bottom', '100px');
           $('#merchandiseWrapper').css('bottom', '100px');
           $('#menuWrapper').css('bottom', '100px');
           nearbyScroll.refresh();
       }
   });
    }

    //Idle Play  code
    scope.idleStatus = false;
scope.resetIdlePlay = function(){
	$idle.unwatch();
            interval.cancel(idleTimer);
            $idle.watch();
}
    scope.$on('$idleStart', function () {
        //$scope.events.push({event: '$idleStart', date: new Date()});	
        //console.log("idleStart")
        scope.idleStatus = false;

        interval.cancel(idleTimer);
    });

    scope.$on('$idleTimeout', function () {
        //console.log("idleTimeout");
        scope.idleStatus = false;
        var timeDuration = (scope.IdlePlayTimeOut * 1000) - 5000;
        idleTimer = interval(idlePlayFunction, timeDuration);
    });

    scope.$on('$keepalive', function () {
        //console.log("keepalive");
        $('.idlePlayModule').fadeOut('3000', function () {

            scope.idleStatus = false;
            interval.cancel(idleTimer);
        });



    })

    idlePlayFunction = function () {
        if (!isIdlePlayConfigured) {
            //$window.location.reload(true);
        }
        else {
            _isNonTouchReload = true;
            _isIdlePlayStarted = true;
            _isNavigationHandled = true;
             scope.handleAdaModeOff();
            $('.idlePlayModule').fadeIn(function () {
                defaultMapState();
                closeControlPanel();
            });
            _isNonTouchReload = true;
            location.url("/")
            $route.reload();
            interval.cancel(idleTimer);
            scope.idleStatus = true;
            $('#searchUI').css('display', 'block');
            $('#navigationPanelUI').css('display', 'block');
            navSrc = '';

            $('#navigationContainer li').each(function (index) {

                navSrc = $("img", $(this)).attr('src');
                if (index == 0) {
                    $("img", $(this)).attr("src", navSrc.replace('off.', 'on.'));
                }
                else {
                    $("img", $(this)).attr("src", navSrc.replace('on.', 'off.'));
                }


            });
        }
        _isNonTouchReload = false;
    }
    //Idle Play code end;


    //settings file get function

    getSetting = function () {


        content.getSettingXML().then(function (data) {
			
            data = angular.copy(data);
            response = data;
            scope.leftLocationText = response.Sections.Section._Label;
            scope.rightLocationText = response.Sections.Section._Label2;
            scope.IdlePlayTimeOut = response.Sections.Section._IdlePlayTimeOut;
            if (scope.IdlePlayTimeOut == null || scope.IdlePlayTimeOut == undefined || scope.IdlePlayTimeOut == "") {
                isIdlePlayConfigured = false;
                scope.IdlePlayTimeOut = 30;
            }
			
			if (response.Sections.Section._IsTransitModule.toLowerCase() == 'true') {
             $rootScope.$broadcast("showExitModule");
 scope.isExitShow  = true;

                }
				else{
					 scope.isExitShow = false;
				}	

            if (ping == true) {
                for (var l = 0 ; l < response.Sections.Section.Data.length; l++) {
                    if (response.Sections.Section.Data[l]._LoadFlag == 'True') {
                        switch (response.Sections.Section.Data[l]._Id) {
                            case "Did You Know":
                                scope.checkme.didyouknowvalue = 'true';
                                break;
                            case "Vendor Listings":
                                scope.checkme.vendorlistvalue = 'true';
                                break;
                            case "Idle Play":
                                scope.checkme.idleplayvalue = 'true';
                                break;

                        }
                    }
                }
            }
            else {

                
				$rootScope.DDName = response.Sections.Section._DSI;
                if (response.Sections.Section.Data instanceof Array) {
                    for (var i = 0; i < response.Sections.Section.Data.length; i++) {
                        if (response.Sections.Section.Data[i]._Id == 'Idle Play') {
                            scope.isIdleavb = 'true';
                            break;
                        }
                    }
                    if (scope.isIdleavb != 'true') {
                        console.log("Idle Play Not thr");
                        isIdlePlayConfigured = false;
                        scope.IdlePlayTimeOut = 30;
                    }
                }
            }
        },

        function () {
            //console.log("error");
        });
    }
//trish
var Seatresponse;
 $rootScope.seatFinderArray = [];
getMessageData = function(){
        var messageURL = "js/Data/seatfinderNearEsc.xml"
        content.getSeatFinderModuleData(messageURL).then(function(Seatresponse)
                        {
                            if(Seatresponse == undefined){
                                return;
                            }
                            if(Seatresponse.Sections.Section.length == undefined){
                                Seatresponse.Sections.Section = [Seatresponse.Sections.Section]
                            }
                            for(var i=0, len=Seatresponse.Sections.Section.length; i < len; i++){
                                if($rootScope.DDName == Seatresponse.Sections.Section[i]._DDId ){
                                    $rootScope.seatFinderArray.push(Seatresponse.Sections.Section[i]);
                                    $rootScope.currentFloor = Seatresponse.Sections.Section[i]._CurrentFloor;
                                    $rootScope.nearEscId = Seatresponse.Sections.Section[i]._NearEsc;
                                }

}

                            console.log("in app . js "+ $rootScope.seatFinderArray);
                            
                            
                        });
    }


    attendanceTimer = interval(function () {

        var dt = new Date();
        content.markAttendance(dt);

    }, 60000);
    scope.showOpAlert = function () {

        $('.instant').css('display', 'none');
        var opDataArr = _operationAlertMsg.toString().split("~|")
        var opAlertElement = angular.element(document.querySelector('#operationAlertModule'));
        $(opAlertElement).find("#OperationAlertTitle").html(opDataArr[1]);
        $(opAlertElement).find("#OperationAlertMessage").html(opDataArr[2]);
      
        scope.operationAlertMsgStatus = true;
        scope.isIdleavb = false;

    }
	scope.hideOpAlert = function(){
		var opAlertElement = angular.element(document.querySelector('#operationAlertModule'));
        $(opAlertElement).find("#OperationAlertTitle").html("");
        $(opAlertElement).find("#OperationAlertMessage").html("");
        scope.operationAlertMsgStatus = false;
       
        scope.isIdleavb = true;
	}
  
    $rootScope.$on("instantMessage", function (event, message1, message2) {
        if (scope.operationAlertMsgStatus == true) {

        }
        else {
            $('.instant').css('display', 'block');
            scope.checkme.instantMessageString = message1 + "~&" + message2;
        }
    });

    $rootScope.$on("changedata", function (event, message) {
        if (sessionStorage.getItem("ping") == null) {
            sessionStorage.setItem("ping", true);
           // $window.location.reload();
        }
        else {
            ping = true;
            handleMap();
            scope.checkme.didyouknowvalue = 'false';
            scope.checkme.idleplayvalue = 'false';
            scope.checkme.vendorlistvalue = 'false';
            getSetting();
        }
    });

    getHeartBeat();
    heartbeatMonitor = interval(function () { getHeartBeat(); }, 300000);
    getSetting();
	getMessageData();

}])


