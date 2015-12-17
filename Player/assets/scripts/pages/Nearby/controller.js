var myApp = angular.module('IONOS');

var count = 0;

var response;

var nearbyvtc_array = new Array();

myApp.controller('nearbyController', ['$scope', '$http', "$sce", "$routeParams", "$timeout", "content", "$idle", "$location", '$rootScope', '$interval', '$compile',

function ($scope, $http, $sce, $routeParams, $timeout, content, $idle, $location, $rootScope, interval, compile) {

    navItem = '';

    nearbyHtml = '';

    nearbylistItem = [];

    searchClickedCounter = 0;

    $scope.nearbyDataArray = [];

    $scope.nearbyMenuArray = [];

    $scope.menuArray = [];

   

        var currentIndex;

	var getMapContentHeight = $('#mapContent').height();

					var wrapperHeight = 1100;

						var wrapperHeightAda = 710;

	if(getMapContentHeight <= 800){

	setBorderBottom = '2px dotted #c0c0c0';

	wrapperHeight = 580;

	wrapperHeightAda = 400;

	}

    if (!_isNonTouchReload && !_onPageLoad && !_isIdlePlayStarted)

        _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Nearby", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Nearby", "ADA=Off&Module=Navigation Panel");

    $('#wrapper').css('bottom', 'auto');

    if (_isAdaModeEnable) {



        $('#wrapper').height(wrapperHeightAda);

        $('#searchItemList').height(710);

    } else {

        $('#wrapper').height(wrapperHeight);

        $('#searchItemList').height(1350);

    }

    getNearbyData = function (showNearbyData) {

        serviceArray = [];

        $scope.nearbyDataArray = [];

        content.getModuleData("dynamic").then(function (response) {

            response = angular.copy(response);

            _walkPathFileName = response.Sections.Section[0]._WalkPath;

            for (var sec = 0; sec < response.Sections.Section.length; sec++) {

                if (response.Sections.Section[sec]._ID == 'Dynamic Map' && response.Sections.Section[sec].DNode != undefined) {

                    for (var i = 0; i < response.Sections.Section[sec].DNode.length; i++) {

                        if (response.Sections.Section[sec].DNode[i]._PxT == '' || response.Sections.Section[sec].DNode[i]._PxD == '') {

                            //console.log("no proximity available for the vendor")

                        }

                        else {

                            $scope.nearbyDataArray.push(response.Sections.Section[sec].DNode[i]);

                            if (response.Sections.Section[sec].DNode[i]._VT == 'Services' && response.Sections.Section[sec].DNode[i]._VTC != 'Restroom') {

                                serviceArray.push(response.Sections.Section[sec].DNode[i])

                            }







                        }

                       



                    }

                }

            }

            $scope.nearbyDataArray.sort(function (a, b) {

                // Sort by proximity

                var proximity = parseInt(a._PxT) - parseInt(b._PxT)

                if (proximity)

                    return proximity;

                // If there is a tie, sort by year

                if (a._VN < b._VN)

                    return -1;

                if (a._VN > b._VN)

                    return 1;

            });



            showIconByCatagories($scope.nearbyDataArray);

            showNearbyData();

        });

    }







    $scope.openNearbyDetail = function (vt,pi,si,vn) {

      

        _isClickedFromNearby = true;

        var openTab = vt;

        navSrc = $('nav li:first-child img').attr('src')

        $('nav li:first-child img').attr("src", navSrc.replace('on.', 'off.'));



        switch (openTab.toLowerCase()) {

            case "eat":

                _isAdaModeEnable == true ? content.setUnica("#DNC#Category List", "Open Vendor Detail", "ADA=On&Module=Category List") : content.setUnica("#DNC#Category List", "Open Vendor Detail", "ADA=Off&Module=Category List");
				_isAdaModeEnable == true ? content.setUnica("Food & Drinks_" + vn, "", "ADA=On&Module=Category List") : content.setUnica("Food & Drinks_" + vn, "", "ADA=Off&Module=Category List");

                openId = pi;
                $location.url("/foodDrink/ ");

                
    if(si.toLowerCase() == "legends"){

    esclatorWalkPath($rootScope.nearEscId,"Take Escalator down to Level 3. ");
}
 else{           
  showWalkPathByID(si);}

                navSrc = $('nav #Eat img').attr('src')

                $('nav #Eat img').attr("src", navSrc.replace('off.', 'on.'));

                break;

            case "shops":

                _isAdaModeEnable == true ? content.setUnica("#DNC#Category List", "Open Vendor Detail", "ADA=On&Module=Category List") : content.setUnica("#DNC#Category List", "Open Vendor Detail", "ADA=Off&Module=Category List");
				_isAdaModeEnable == true ? content.setUnica("Merchandise_" + vn, "", "ADA=On&Module=Category List") : content.setUnica("Merchandise_" + vn, "", "ADA=Off&Module=Category List");

                $location.url("/merchandise/ ");

                openId = pi;
                if(si.toLowerCase() == "proshop"){
               
                esclatorWalkPath($rootScope.nearEscId,"Take Escalator down to Level 2.")
                 
                }else{                     
                  showWalkPathByID(si);}
                navSrc = $('nav #Shops img').attr('src')

                $('nav #Shops img').attr("src", navSrc.replace('off.', 'on.'));

                break;

            case "icon_mensrestroom":

                $location.url("/restrooms/ ");

                 _isAdaModeEnable == true ? content.setUnica("Restrooms_" + vn, "", "ADA=On&Module=Category List") : content.setUnica("Restrooms_" + vn, "", "ADA=Off&Module=Category List");

                openId = pi;

                showWalkPathByID(si);

                navSrc = $('nav #Restroom img').attr('src')

                $('nav #Restroom img').attr("src", navSrc.replace('off.', 'on.'));

                break;

            case "icon_womensrestroom":

                $location.url("/restrooms/ ");

                _isAdaModeEnable == true ? content.setUnica("Restrooms_" + vn, "", "ADA=On&Module=Category List") : content.setUnica("Restrooms_" + vn, "", "ADA=Off&Module=Category List");

                openId = pi;

                showWalkPathByID(si);

                navSrc = $('nav #Restroom img').attr('src')

                $('nav #Restroom img').attr("src", navSrc.replace('off.', 'on.'));

                break;

            default:

                $location.url("/More/ / / / ");

                _isAdaModeEnable == true ? content.setUnica("More_" + vn, "", "ADA=On&Module=Category List") : content.setUnica("More_" + vn, "", "ADA=Off&Module=Category List");

                openId = vt;

                showWalkPathByID(si);

                navSrc = $('nav #MoreSer img').attr('src')

                $('nav #MoreSer img').attr("src", navSrc.replace('off.', 'on.'));



        }

        nearbyScroll.refresh();

    }



    showNearbyData = function () {

        nearbyElement = angular.element(document.querySelector('#thelist'));

        nearbyElement.html('');



        for (var k = 0; k < $scope.nearbyDataArray.length; k++) {

            nearbylistItem = [];

            nearbyHtml = '';

            nearbylistItem = $scope.nearbyDataArray[k];



            if (nearbylistItem._PxD.toUpperCase() == "RIGHT") {



                if (nearbylistItem._VT.toUpperCase() == "EAT") {

                    if (nearbylistItem._DF == undefined || nearbylistItem._DF == '') {

                        nearbyvtc_array = [];

                        //console.log("dietary feature is not defined");

                    }

                    else {

                        nearbyvtc_array = nearbylistItem._DF.split(',');

                    }





                    nearbyHtml = '<li><div class="nearbyRow clearfix" ng-click="openNearbyDetail(\''+nearbylistItem._VT+'\',\''+nearbylistItem._PI+'\',\''+nearbylistItem._SI+'\',\''+escape(nearbylistItem._VN) +'\')"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="neabyRightVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + nearbylistItem._VT + '_off.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/RightArrow.svg" /></div><div id="nearbyVendorName" >' + nearbylistItem._VN + '</div><div id="nearbyVendorDescription"><div id="foodType">' + nearbylistItem._VTC + '</div><div id="dietary">';





                    for (var i = 0; i < nearbyvtc_array.length; i++) {

                        nearbyHtml = nearbyHtml + '<div id="dietaryItem">' + nearbyvtc_array[i].toUpperCase() + '</div>';

                    }



                    nearbyHtml = nearbyHtml + '</div></div></div> <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeNearbyDetail($event)"id="hideDetail" ><div>hide</div>    <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Top Picks</div></div></div><div id="vendorDetailContent">';



                    if ($scope.nearbyDataArray[k].FMenu != null || $scope.nearbyDataArray[k].FMenu != undefined) {



                        for (var i = 0; i < 4; i++) {



                            if ($scope.nearbyDataArray[k].FMenu[i] != undefined) {



                                nearbyHtml += '<div id="vendorDetailRow"><div id="menuName">' + $scope.nearbyDataArray[k].FMenu[i]._name + '</div><div id="menuPrice">' + $scope.nearbyDataArray[k].FMenu[i]._price + '</div></div>';

                            }

                        }

                        nearbyHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    }

                    else {



                        for (var i = 0; i < 4; i++) {

                            nearbyHtml += '<div id="vendorDetailRow"><div id="menuName"></div><div id="menuPrice"></div></div>';

                        }

                        nearbyHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    }









                }



                else if (nearbylistItem._VT.toUpperCase() == "SHOPS") {





                    nearbyHtml = '<li><div class="nearbyRow clearfix" ng-click="openNearbyDetail(\''+nearbylistItem._VT+'\',\''+nearbylistItem._PI+'\',\''+nearbylistItem._SI+'\',\''+escape(nearbylistItem._VN) +'\')"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="neabyRightVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + nearbylistItem._VT + '_off.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/RightArrow.svg" /></div><div id="nearbyVendorName" >' + nearbylistItem._VN + '</div><div id="nearbyVendorDescription"><div id="foodType">' + nearbylistItem._VTC + '</div>';



                    nearbyHtml = nearbyHtml + '</div></div> <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeNearbyDetail($event)"id="hideDetail" ><div>hide</div>     <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Details</div></div></div><div id="vendorDetailContent">';

                    nearbyHtml += '<div id="vendorDetailRow">' + nearbylistItem.LD.__cdata.substring(0, 200) + '</div></div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/"/></div></div></li>';







                }

                else {

                    if (nearbylistItem._VT.toUpperCase() == "SERVICES") {

                        switch (nearbylistItem._VTC) {

                            case "Restroom":

                                if (nearbylistItem._VN.indexOf('Women') > 1) {

                                    nearbylistItem._VT = "icon_womensRestroom";

                                }

                                else {

                                    nearbylistItem._VT = "icon_mensRestroom";

                                }

                                break;

                            case "AED":

                                nearbylistItem._VT = "icon_defibrilator";

                                break;

                            case "Transportation":

                                nearbylistItem._VT = "icon_gettingAround";

                                break;

                            case "First Aid Office":

                                nearbylistItem._VT = "icon_safety";

                                break;

                            case "Water Fountain":

                                nearbylistItem._VT = "icon_waterFountain";

                                break;

                            case "ATM":

                                nearbylistItem._VT = "icon_TDBank_ATM";

                                break;

                            case "Public Relations Office":

                                nearbylistItem._VT = "icon_guestRelations";

                                break;

                            default:

                                nearbylistItem._VT = "icon_more";

                                break;

                        }

                    }





                    nearbyHtml = '<li><div class="nearbyRow clearfix" ng-click="openNearbyDetail(\''+nearbylistItem._VT+'\',\''+nearbylistItem._PI+'\',\''+nearbylistItem._SI+'\',\''+escape(nearbylistItem._VN) +'\')"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="neabyRightVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + nearbylistItem._VT + '_off.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/RightArrow.svg" /></div><div id="nearbyVendorName" >' + nearbylistItem._VN + '</div><div id="nearbyVendorDescription">' + nearbylistItem._PT + '</div></div></li>';

                }







            }

            else if (nearbylistItem._PxD.toUpperCase() == "LEFT") {

                if (nearbylistItem._VT.toUpperCase() == "EAT") {



                    if (nearbylistItem._DF == undefined || nearbylistItem._DF == '') {

                        //console.log("dietary feature is not defined");

                    }

                    else {

                        nearbyvtc_array = nearbylistItem._DF.split(',');

                    }





                    nearbyHtml = '<li><div class="nearbyRow clearfix" ng-click="openNearbyDetail(\''+nearbylistItem._VT+'\',\''+nearbylistItem._PI+'\',\''+nearbylistItem._SI+'\',\''+escape(nearbylistItem._VN) +'\')"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/LeftArrow.svg" /></div><div id="neabyLeftVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + nearbylistItem._VT + '_off.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="nearbyVendorName" >' + nearbylistItem._VN + '</div><div id="nearbyVendorDescription"><div id="foodType">' + nearbylistItem._VTC + '</div><div id="dietary">';



                    for (var i = 0; i < nearbyvtc_array.length; i++) {

                        nearbyHtml = nearbyHtml + '<div id="dietaryItem">' + nearbyvtc_array[i].toUpperCase() + '</div>';

                    }

                    nearbyHtml = nearbyHtml + '</div></div></div> <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeNearbyDetail($event)"id="hideDetail" ><div>hide</div>      <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Top Picks</div></div></div><div id="vendorDetailContent">';



                    if ($scope.nearbyDataArray[k].FMenu != null || $scope.nearbyDataArray[k].FMenu != undefined) {



                        for (var i = 0; i < 4; i++) {



                            if ($scope.nearbyDataArray[k].FMenu[i] != undefined) {



                                nearbyHtml += '<div id="vendorDetailRow"><div id="menuName">' + $scope.nearbyDataArray[k].FMenu[i]._name + '</div><div id="menuPrice">' + $scope.nearbyDataArray[k].FMenu[i]._price + '</div></div>';

                            }

                        }

                        nearbyHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    }

                    else {



                        for (var i = 0; i < 4; i++) {

                            nearbyHtml += '<div id="vendorDetailRow"><div id="menuName"></div><div id="menuPrice"></div></div>';

                        }

                        nearbyHtml += '</div><div id="vendorDetailImage"><img  onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/"/></div><div class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    }













                }



                else if (nearbylistItem._VT.toUpperCase() == "SHOPS") {

                    nearbyHtml = '<li><div class="nearbyRow clearfix" ng-click="openNearbyDetail(\''+nearbylistItem._VT+'\',\''+nearbylistItem._PI+'\',\''+nearbylistItem._SI+'\',\''+escape(nearbylistItem._VN) +'\')"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/LeftArrow.svg" /></div><div id="neabyLeftVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + nearbylistItem._VT + '_off.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="nearbyVendorName" >' + nearbylistItem._VN + '</div><div id="nearbyVendorDescription"><div id="foodType">' + nearbylistItem._VTC + '</div>';





                    nearbyHtml = nearbyHtml + '</div></div> <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeNearbyDetail($event)"id="hideDetail" ><div>hide</div>    <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Details</div></div></div><div id="vendorDetailContent">';



                    nearbyHtml += '<div id="vendorDetailRow">' + nearbylistItem.LD.__cdata.substring(0, 200) + '</div></div><div id="vendorDetailImage"><img  onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/"/></div></div></li>';







                }



                else {





                    if (nearbylistItem._VT.toUpperCase() == "SERVICES") {

                        switch (nearbylistItem._VTC) {

                            case "Restroom":



                                if (nearbylistItem._VN.indexOf('Women') > 1) {

                                    nearbylistItem._VT = "icon_womensRestroom";

                                }

                                else {

                                    nearbylistItem._VT = "icon_mensRestroom";

                                }

                                break;

                            case "AED":

                                nearbylistItem._VT = "icon_defibrilator";

                                break;

                            case "Transportation":

                                nearbylistItem._VT = "icon_gettingAround";

                                break;

                            case "First Aid Office":

                                nearbylistItem._VT = "icon_safety";

                                break;

                            case "Water Fountain":

                                nearbylistItem._VT = "icon_waterFountain";

                                break;

                            case "ATM":

                                nearbylistItem._VT = "icon_TDBank_ATM";

                                break;

                            case "Public Relations Office":

                                nearbylistItem._VT = "icon_guestRelations";

                                break;

                            default:

                                nearbylistItem._VT = "icon_more";

                                break;

                        }

                    }











                    nearbyHtml = '<li><div class="nearbyRow clearfix" ng-click="openNearbyDetail(\''+nearbylistItem._VT+'\',\''+nearbylistItem._PI+'\',\''+nearbylistItem._SI+'\',\''+escape(nearbylistItem._VN) +'\')"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/LeftArrow.svg" /></div><div id="neabyLeftVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + nearbylistItem._VT + '_off.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="nearbyVendorName" >' + nearbylistItem._VN + '</div><div id="nearbyVendorDescription">' + nearbylistItem._PT + '</div></div></li>';

                }





            }

            else {

                //console.log("Something wrong with the code")

            }

            nearbyElement.append(nearbyHtml);

        }

        compile(nearbyElement)($scope);



        if (nearbyScroll == undefined || nearbyScroll == '') {

        }

        else {

            nearbyScroll.destroy();

        }

        var screenWidth = screen.width;

        nearbyScroll = new iScroll('wrapper', {

            hScrollbar: false,

            vScrollbar: false,

			click:true,

            onScrollMove: function () {

                if (screenWidth >= 1290 && screenWidth <= 2000 && $("#controlPanelUI").height() == 335 && $("#controlPanelUI").hasClass("adaPanelHeight") == false) {

                    $("#controlPanelUI").animate({

                        height: '565px'

                    }

   , {

       easing: 'swing',

       duration: 1000,

       complete: function () {



       }

   });

                }

                else {

                    if ($("#controlPanelUI").height() > 500 && $("#controlPanelUI").hasClass("adaPanelHeight") == false) {

					var getMapContentHeight = $('#mapContent').height();

					var limitheight = "1600px";

	if(getMapContentHeight <= 800){

	limitheight = "800px";

	}



                        $("#controlPanelUI").animate({

                            height: limitheight

                        }

       , {

           easing: 'swing',

           duration: 1000,

           complete: function () {



           }

       });

                    }

                }



            }

        });

    }









    // var nearbyTimer=interval(function() { interval.cancel(nearbyTimer); var nearbyScroll = new iScroll('wrapper'); },2000);



    getNearbyData(showNearbyData);

     var imgName = $('nav li:first-child img').attr("src");

        imgName = imgName.replace('off.', 'on.');

        $('nav li:first-child img').attr("src", imgName);





}]);





