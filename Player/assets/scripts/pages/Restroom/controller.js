var myApp = angular.module('IONOS');

var showValue;
myApp.controller('restroomController', ['$scope', '$http', "$routeParams", "$sce", "$timeout", "content", "$idle", "$location", '$rootScope', '$interval', '$compile',
function ($scope, $http, $routeParams, $sce, $timeout, content, $idle, $location, $rootScope, interval, compile) {
    navItem = '';
    restroomHtml = '';
    listItem = [];
    var ind = 0;
    var parSpaceID = $routeParams.SpaceId;
    var currentIndex;
var getMapContentHeight = $('#mapContent').height();
					var wrapperHeight = 1100;
					var wrapperHeightAda = 710;
	if(getMapContentHeight <= 800){
	setBorderBottom = '2px dotted #c0c0c0';
	wrapperHeight = 580;
	wrapperHeightAda = 400;
	}
    $scope.restroomDataArray = [];

    var count = 0;
    if (!_isClickedFromNearby && openId == '')
        _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Restrooms", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Restrooms", "ADA=Off&Module=Navigation Panel");

    $('#wrapper').css('bottom', 'auto');
    if (_isAdaModeEnable) {

        $('#wrapper').height(wrapperHeightAda);
        $('#searchItemList').height(710);
    } else {
        $('#wrapper').height(wrapperHeight);
        $('#searchItemList').height(1350);
    }
    getRestroomData = function (showRestroomData) {

        $scope.restroomDataArray = [];
        content.getModuleData("dynamic").then(function (response) {
            response = angular.copy(response);
            for (var sec = 0; sec < response.Sections.Section.length; sec++) {
                if (response.Sections.Section[sec]._ID == 'Dynamic Map') {
                    for (var i = 0; i < response.Sections.Section[sec].DNode.length; i++) {

                        if (response.Sections.Section[sec].DNode[i]._VT == 'Services' && response.Sections.Section[sec].DNode[i]._VTC == 'Restroom' && response.Sections.Section[sec].DNode[i]._PxT != '' && response.Sections.Section[sec].DNode[i]._PxD != '') {
                            $scope.restroomDataArray.push(response.Sections.Section[sec].DNode[i]);
                            
                        }
                        else {
                            //console.log("vendor is not food & drink")
                        }


                    }
                }
            }

            $scope.restroomDataArray.sort(function (a, b) {
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
			//trish

                                if (parSpaceID.length > 1) {

for(var n = 0 ; n < $scope.restroomDataArray.length;n++){
				   if (parSpaceID.toLowerCase() == $scope.restroomDataArray[n]._SI.toLowerCase()) {
                                    if (parSpaceID == $scope.restroomDataArray[n]._SI) {
                                        var m = n;
                                        currentIndex = m;
                                        console.log("i got the spaceid! " + currentIndex);
										_isAdaModeEnable == true ? content.setUnica("Restroom_"+$('#restroomthelist li').eq(ind).find("#restroomVendorName").text(), "", "ADA=On&Module=Did You Know") : content.setUnica("Restroom_"+$('#restroomthelist li').eq(ind).find("#restroomVendorName").text(), "", "ADA=Off&Module=Did You Know");
                                        $timeout(function() {
                                            showWalkPathByID(parSpaceID);
                                            $scope.openRestroomDetail(event, currentIndex)
                                        }, 800);

                                    }

                                }
								}}

                            //trish

            showIconByCatagories($scope.restroomDataArray);
            showRestroomData();
        });
    }



    $scope.openRestroomDetail = function ($event, restroomIndex) {
        $('.restroomRow').css({ 'background-color': '#ffffff', 'border-bottom': '0px' });

        if (restroomIndex != undefined && restroomIndex >= 0) {
            ind = restroomIndex;
        }
        else {
            ind = $(event.currentTarget).parent().index();
        }

        $('#restroomthelist li').each(function () {
            var getSrc = $('img', $(this)).eq(1).attr('src').replace('_on', '_off');
            $('img', $(this)).eq(1).attr('src', getSrc);

        });


        var $this = $('#restroomthelist li').eq(ind)
        var getSrc = $("img", $this).eq(1).attr("src").replace('_off', '_on');
        $("img", $this).eq(1).attr("src", getSrc);


        $('#restroomthelist li').find('.restroomRow').css('backgroundColor', '#ffffff');
        $('#restroomthelist li').eq(ind).find('.restroomRow').css('background-color', '#f9f9f9');

        if (!_isClickedFromNearby)
            _isAdaModeEnable == true ? content.setUnica("Restroom_"+$('#restroomthelist li').eq(ind).find("#restroomVendorName").text(), "", "ADA=On&Module=Category List") : content.setUnica("Restroom_"+$('#restroomthelist li').eq(ind).find("#restroomVendorName").text(), "", "ADA=Off&Module=Category List");
			_isClickedFromNearby = false;
			_isMapClicked = false;	
    }

    $scope.callWalkPath = function ($event) {

        showWalkPathByID($scope.restroomDataArray[ind]._SI);
    }


    showRestroomData = function () {

        if (openId != '') {

            for (var m = 0; m < $scope.restroomDataArray.length; m++) {
                if (openId == $scope.restroomDataArray[m]._PI) {
                    showValue = m;
                    break;
                }

            }


        }
        else {

        }





        restroomElement = angular.element(document.querySelector('#restroomthelist'));
        restroomElement.html('');
        for (var k = 0; k < $scope.restroomDataArray.length; k++) {
            restroomHtml = '';
            listItem = [];
            listItem = $scope.restroomDataArray[k];
            if (listItem._VN.indexOf('Women') > 1) {
                listItem._VT = "icon_womensRestroom";
            }
            else {
                listItem._VT = "icon_mensRestroom";
            }


            if (listItem._PxD.toUpperCase() == "RIGHT") {
                restroomHtml = '<li><div class="restroomRow clearfix" ng-click="openRestroomDetail($event);callWalkPath($event);"><div id="restroomLeftVendorDirection"><img id="restroomVendorimages" src="" /></div><div id="restroomRightVendorImage" ><img  id="restroomVendorimages" src="assets/imgs/icons/' + listItem._VT + '_off.svg" /></div><div id="restroomRightVendorDirection"><img id="restroomVendorimages" src="assets/imgs/icons/RightArrow.svg" /></div><div id="restroomVendorName" >' + listItem._VN + '</div><div id="restroomVendorDescription"><div id="restroomType">' + listItem._VTC + '</div></div></div></li> ';
            }
            else if (listItem._PxD.toUpperCase() == "LEFT") {
                restroomHtml = '<li><div class="restroomRow clearfix" ng-click="openRestroomDetail($event);callWalkPath($event);"><div id="restroomLeftVendorDirection"><img id="restroomVendorimages" src="assets/imgs/icons/LeftArrow.svg" /></div><div id="restroomLeftVendorImage" ><img  id="restroomVendorimages" src="assets/imgs/icons/' + listItem._VT + '_off.svg" /></div><div id="restroomRightVendorDirection"><img id="restroomVendorimages" src="" /></div><div id="restroomVendorName" >' + listItem._VN + '</div><div id="restroomVendorDescription"><div id="restroomType">' + listItem._VTC + '</div></div></div></li>';
            }
            else {
                //console.log("Something wrong with the code")
            }
            restroomElement.append(restroomHtml);
        }
        compile(restroomElement)($scope);
        if (nearbyScroll != undefined)
            nearbyScroll.destroy();
        nearbyScroll = new iScroll('wrapper', {
            hScrollbar: false,
            vScrollbar: false,
			click:true
        });



        if (showValue != undefined && openId != '') {

            $scope.openRestroomDetail(event, showValue);
            if(showValue > 0 || showValue < 7) {
				showValue = showValue-1;
				var nitem = "li:nth-child(" + showValue + ")";
			} else {
				var nitem = "li:nth-child(" + showValue + ")";
			} 

            nearbyScroll.scrollToElement(nitem, 1000);
            nearbyScroll.refresh();
            openId = '';
            showValue = undefined;
        }
        else {
            nearbyScroll.refresh();
            openId = '';
        }


    }



    getRestroomData(showRestroomData);
    var imgName = $('nav #Restroom img').attr("src");
        imgName = imgName.replace('off.', 'on.');
        $('nav #Restroom img').attr("src", imgName);

    //var restroomTimer=interval(function() {interval.cancel(restroomTimer); var restroomScroll = new iScroll('restroomWrapper'); },2000);
}]);


