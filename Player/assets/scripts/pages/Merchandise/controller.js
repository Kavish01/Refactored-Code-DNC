var myApp = angular.module('IONOS');



var showValue;

myApp.controller('merchandiseController', ['$scope', '$http', "$routeParams", "$sce", "$timeout", "content", "$idle", "$location", '$rootScope', '$interval', '$compile',

    function($scope, $http, $routeParams, $sce, $timeout, content, $idle, $location, $rootScope, interval, compile) {

        navItem = '';

        merchandiseHtml = '';

        merchandiseListItem = [];

        $scope.merchandiseDataArray = [];

        $scope.merchandiseMenuArray = [];

        $scope.merchandiseArr

        ay = [];

        var count = 0;

        var ind = 0;

        var parSpaceID = $routeParams.SpaceId;

        var currentIndex;



        var getMapContentHeight = $('#mapContent').height();

        var wrapperHeight = 1100;

        var wrapperHeightAda = 710;

        if (getMapContentHeight <= 800) {

            setBorderBottom = '2px dotted #c0c0c0';

            wrapperHeight = 580;

            wrapperHeightAda = 400;

        }

        if (!_isClickedFromNearby && openId == '')

            _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Merchandise", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Merchandise", "ADA=Off&Module=Navigation Panel");

        $('#wrapper').css('bottom', 'auto');

        if (_isAdaModeEnable) {



            $('#wrapper').height(wrapperHeightAda);

            $('#searchItemList').height(710);

        } else {

            $('#wrapper').height(wrapperHeight);

            $('#searchItemList').height(1350);

        }



        getMerchandiseData = function(showMerchandiseData) {



            $scope.merchandiseDataArray = [];

            content.getModuleData("dynamic").then(function(response) {

                response = angular.copy(response);

                for (var sec = 0; sec < response.Sections.Section.length; sec++) {

                    if (response.Sections.Section[sec]._ID == 'Dynamic Map') {

                        for (var i = 0; i < response.Sections.Section[sec].DNode.length; i++) {

                            if (response.Sections.Section[sec].DNode[i]._VT == 'Shops' && response.Sections.Section[sec].DNode[i]._PxT != '' && response.Sections.Section[sec].DNode[i]._PxD != '') {

                                $scope.merchandiseDataArray.push(response.Sections.Section[sec].DNode[i]);




                                if (response.Sections.Section[sec].DNode[i].FMenu != undefined) {

                                    $scope.merchandiseMenuArray.push(response.Sections.Section[sec].DNode[i].Menu);

                                } else {

                                    $scope.merchandiseMenuArray.push(null);

                                }

                            } else {

                                //console.log("vendor is not food & drink")

                            }




                        }

                    }

                }



                $scope.merchandiseDataArray.sort(function(a, b) {

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

                    for (var n = 0; n < $scope.merchandiseDataArray.length; n++) {
                        if (parSpaceID.toLowerCase() == $scope.merchandiseDataArray[n]._SI.toLowerCase()) {



                            if (parSpaceID == $scope.merchandiseDataArray[n]._SI) {

                                var m = n;

                                currentIndex = m;

                                console.log("i got the spaceid! " + currentIndex);
								_isAdaModeEnable == true ? content.setUnica("Merchandise_" + $scope.merchandiseDataArray[n]._VN, "", "ADA=On&Module=Did You Know") : content.setUnica("Merchandise_" + $scope.merchandiseDataArray[n]._VN, "", "ADA=Off&Module=Did You Know");


                                $timeout(function() {

                                    if (parSpaceID.toLowerCase() == "proshop") {

                                        esclatorWalkPath($rootScope.nearEscId, "Take Escalator down to Level 2.")

                                    } else {
                                        showWalkPathByID(parSpaceID);

                                    }


                                    $scope.openMerchandiseDetail(event, parSpaceID, currentIndex)

                                }, 800);



                            }



                        }
                    }
                }


                //trish


                showIconByCatagories($scope.merchandiseDataArray);

                showMerchandiseData();

            });

        }



        $scope.openMerchandiseDetail = function($event, crspd, merchandiseIndex) {


            $('.merchandiseRow').css({
                'background-color': '#ffffff',
                'border-bottom': '0px'
            });

            $(".vdDesc").hide();
            $(".adsDivProshop").hide();

            if (merchandiseIndex != undefined && merchandiseIndex >= 0) {

                ind = merchandiseIndex;

            } else {

                ind = $("." + crspd).closest("li").index();

            }



            $('#thelist li').each(function() {

                var getSrc = $('img', $(this)).eq(1).attr('src').replace('Shops_on.', 'Shops.');

                $('img', $(this)).eq(1).attr('src', getSrc);



            });




            var $this = $('#thelist li').eq(ind)

            var getSrc = $("img", $this).eq(1).attr("src").replace('Shops.', 'Shops_on.');

            $("img", $this).eq(1).attr("src", getSrc);



            $('#thelist li').find('.vendorDetail').css('display', 'none');

            $('#thelist li').find('.merchandiseRow').css('backgroundColor', '#ffffff');

            $('#thelist li').eq(ind).find('.merchandiseRow').css({
                'background-color': '#f9f9f9',
                'border-bottom': '4px dotted #c0c0c0'
            });

            if (!_isClickedFromNearby)

            //  _isAdaModeEnable == true ? content.setUnica("Merchandise", "Open", "ADA_" + $($event.currentTarget).find("#merchandiseVendorName").text()) : content.setUnica("Merchandise", "Open", $($event.currentTarget).find("#merchandiseVendorName").text());

                _isClickedFromNearby = false;

            if ($scope.merchandiseDataArray[ind].LD.__cdata.length > 0) {

                $('#thelist li').eq(ind).find('.vendorDetail').css('display', 'block');

                //if ($event.currentTarget != null && $event.currentTarget.innerText != "")



                //nearbyScroll.scrollToElement('li:nth-child('+ind+')', 500)
                if (crspd != null && crspd.toLowerCase() == "proshop") {
                    $(".vdDesc").show();

                    $('.adsDivProshop').show();
                    $('.button').css('display', 'none');
                    $('#thelist li').eq(ind).find('.vendorDetail').css('display', 'block');
                }
                var tmr = setInterval(function() {

                    nearbyScroll.refresh();

                    clearInterval(tmr);

                    var nitem = "li:nth-child(" + ind + ")";



                    nearbyScroll.scrollToElement(nitem, 500);



                }, 300);

            }
			if (!_isClickedFromNearby)
            //_isAdaModeEnable == true ? content.setUnica("Merchandise", "Open", "ADA_" + $($event.currentTarget).find("#merchandiseVendorName").text()) : content.setUnica("Merchandise", "Open", $($event.currentTarget).find("#merchandiseVendorName").text());
			_isAdaModeEnable == true ? content.setUnica("#DNC#Category List", "Open Vendor Detail", "ADA=On&Module=Category List") : content.setUnica("#DNC#Category List", "Open Vendor Detail", "ADA=Off&Module=Category List");
			_isAdaModeEnable == true ? content.setUnica("Merchandise_" + $($("." + crspd)).find("#merchandiseVendorName").text(), "", "ADA=On&Module=Category List") : content.setUnica("Merchandise_" + $($("." + crspd)).find("#merchandiseVendorName").text(), "", "ADA=Off&Module=Category List");
			_isClickedFromNearby = false;
			_isMapClicked = false;

        }



        $scope.callWalkPath = function($event, crspd) {

            //showWalkPathByID($scope.foodDrinkDataArray[ind]._SI);
            if (crspd.toLowerCase() == "proshop") {

                esclatorWalkPath($rootScope.nearEscId, "Take Escalator down to Level 2.")

            } else {
                showWalkPathByID(crspd);
            }

        }




        $scope.closeDetail = function($event) {

            $('#thelist li').find('.vendorDetail').css('display', 'none');

            $('#thelist li').find('.merchandiseRow').css({
                'background-color': '#ffffff',
                'border-bottom': '0px'
            });



            $('#thelist li').each(function() {

                var getSrc = $('img', $(this)).eq(1).attr('src').replace('Shops_on.', 'Shops.');

                $('img', $(this)).eq(1).attr('src', getSrc);



            });

            nearbyScroll.refresh();

        }




        showMerchandiseData = function() {

            if (openId != '') {



                for (var m = 0; m < $scope.merchandiseDataArray.length; m++) {

                    if (openId == $scope.merchandiseDataArray[m]._PI) {

                        showValue = $scope.merchandiseDataArray[m]._SI;

                        break;

                    }



                }



            } else {



            }




            merchandiseElement = angular.element(document.querySelector('#thelist'));

            merchandiseElement.html('');

            for (var k = 0; k < $scope.merchandiseDataArray.length; k++) {

                merchandiseListItem = [];

                merchandiseHtml = '';

                merchandiseListItem = $scope.merchandiseDataArray[k];

                if (merchandiseListItem._PxD.toUpperCase() == "RIGHT") {

                    merchandiseHtml = '<li><div class="merchandiseRow clearfix ' + merchandiseListItem._SI + '" ng-click="openMerchandiseDetail($event,\'' + merchandiseListItem._SI + '\',null);callWalkPath($event,\'' + merchandiseListItem._SI + '\');"><div id="merchandiseLeftVendorDirection"><img id="merchandiseVendorimages" src="" /></div><div id="merchandiseRightVendorImage" ><img  id="merchandiseVendorimages" src="assets/imgs/icons/' + merchandiseListItem._VT + '.svg" /></div><div id="merchandiseRightVendorDirection"><img id="merchandiseVendorimages" src="assets/imgs/icons/RightArrow.svg" /></div><div id="merchandiseVendorName" >' + merchandiseListItem._VN + '</div><div id="merchandiseVendorDescription"><div id="merchandiseType">' + merchandiseListItem._VTC + '</div>';



                    merchandiseHtml = merchandiseHtml + '</div></div>  <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeDetail($event)"id="hideDetail" ><div>hide</div>    <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Details</div></div></div><div id="vendorDetailContent">';



                    merchandiseHtml += '<div id="vendorDetailRow">' + merchandiseListItem.LD.__cdata.substring(0, 200) + '<div class="adsDivProshop">This vendor is on the 2nd  floor. Please go down on the nearest escalator to find your destination.</div></div></div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);"  src="../Data/Dynamic Map/' + $scope.merchandiseDataArray[k]._VI + '"/></div></div></li>';




                } else if (merchandiseListItem._PxD.toUpperCase() == "LEFT") {

                    merchandiseHtml = '<li><div class="merchandiseRow clearfix ' + merchandiseListItem._SI + '" ng-click="openMerchandiseDetail($event,\'' + merchandiseListItem._SI + '\',null);callWalkPath($event,\'' + merchandiseListItem._SI + '\');"><div id="merchandiseLeftVendorDirection"><img id="merchandiseVendorimages" src="" /></div><div id="merchandiseRightVendorImage" ><img  id="merchandiseVendorimages" src="assets/imgs/icons/' + merchandiseListItem._VT + '.svg" /></div><div id="merchandiseRightVendorDirection"><img id="merchandiseVendorimages" src="assets/imgs/icons/RightArrow.svg" /></div><div id="merchandiseVendorName" >' + merchandiseListItem._VN + '</div><div id="merchandiseVendorDescription"><div id="merchandiseType">' + merchandiseListItem._VTC + '</div>';




                    merchandiseHtml = merchandiseHtml + '</div></div> <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeDetail($event)"id="hideDetail" ><div>hide</div>    <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Details</div></div></div><div id="vendorDetailContent">';

                    merchandiseHtml += '<div id="vendorDetailRow">' + merchandiseListItem.LD.__cdata.substring(0, 200) + '<div class="adsDivProshop">This vendor is on the 2nd  floor. Please go down on the nearest escalator to find your destination.</div></div></div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/' + $scope.merchandiseDataArray[k]._VI + '"/></div></div></li>';




                } else {

                    //console.log("Something wrong with the code")

                }

                merchandiseElement.append(merchandiseHtml);

            }

            compile(merchandiseElement)($scope);

            if (nearbyScroll != undefined && nearbyScroll != null)

                nearbyScroll.destroy();

            nearbyScroll = null;

            nearbyScroll = new iScroll('wrapper', {

                hScrollbar: false,

                vScrollbar: false,

                click: true

            });



            if (showValue != undefined) {

                //$('#merchandiseScrollers #thelist li').eq(showValue).find('.vendorDetail').css('display','block')

                $scope.openMerchandiseDetail(event, showValue, null);

                openId = '';

                nearbyScroll.refresh();

                showValue = undefined;

            } else {

                nearbyScroll.refresh();

                openId = '';

            }

        }



        getMerchandiseData(showMerchandiseData);

        var imgName = $('nav #Shops img').attr("src");

        imgName = imgName.replace('off.', 'on.');

        $('nav #Shops img').attr("src", imgName);



        //var merchandiseTimer=interval(function() { interval.cancel(merchandiseTimer);var merchandiseScroll = new iScroll('merchandiseWrapper'); },2000);

    }
]);