var myApp = angular.module('IONOS');



var showValue;

var setBorderBottom = '4px dotted #c0c0c0';



myApp.controller('foodDrinkController', ['$scope', '$http', "$sce", "$timeout", "$routeParams", "foodService", "$idle", "$location", '$rootScope', '$interval', '$compile',

    function($scope, $http, $sce, $timeout, $routeParams, foodService, $idle, $location, $rootScope, interval, compile) {

       




        navItem = '';

        foodDrinkHtml = '';

        listItem = [];

        $scope.linkDisable = false;

        $scope.detailDisable = [];

        $scope.menuDisbale = true;

        $scope.foodDrinkDataArray = [];

        $scope.menuArray = [];

        var count = 0;

        var ind = 0;

        var getMapContentHeight = $('#mapContent').height();

        var wrapperHeight = 1100;

        var wrapperHeightAda = 710;

        if (getMapContentHeight <= 800) {

            setBorderBottom = '2px dotted #c0c0c0';

            wrapperHeight = 580;

            wrapperHeightAda = 400;

        }




        var menutimer = 0;

        if (!_isClickedFromNearby && openId == '')

            _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Food & Drink", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Food & Drink", "ADA=Off&Module=Navigation Panel");

        $('#foodHeader').css('display', 'none');



        $('#wrapper').css('bottom', 'auto');

        if (_isAdaModeEnable) {



            $('#wrapper').height(wrapperHeightAda);

            $('#searchItemList').height(710);

        } else {

            $('#wrapper').height(wrapperHeight);

            $('#searchItemList').height(1350);

        }



        var parSpaceID = $routeParams.SpaceId;

        var currentIndex;



        getFoodDrinkData = function(showFoodDrinkData) {



            $scope.foodDrinkDataArray = [];

            content.getModuleData("dynamic").then(function(response) {

                response = angular.copy(response);
                if (response == undefined) {
                    return;
                }
                var xmlDynamicMap = response.Sections.Section.filter(function(val) {
                    return val._ID.toLowerCase() == "dynamic map"
                })
                var foodArray = xmlDynamicMap[0].DNode.filter(function(val) {
                    return val._VT.toLowerCase() == "eat" && val._PxT.toLowerCase() != "" && val._PxD.toLowerCase() != ""
                });

                foodArray.sort(function(a, b) {



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
                $scope.foodDrinkDataArray = foodArray;

                //trish
                if (parSpaceID.length > 1) {
                    for (var n = 0; n < $scope.foodDrinkDataArray.length; n++) {
                        if (parSpaceID.toLowerCase() == $scope.foodDrinkDataArray[n]._SI.toLowerCase()) {

                            var m = n;

                            currentIndex = m;

                            console.log("i got the spaceid! " + currentIndex);
							_isAdaModeEnable == true ? content.setUnica("Food & Drinks_" + $scope.foodDrinkDataArray[i]._VN, "", "ADA=On&Module=Did You Know") : content.setUnica("Food & Drinks_" + $scope.foodDrinkDataArray[i]._VN, "", "ADA=Off&Module=Did You Know");


                            $timeout(function() {

                                if (parSpaceID.toLowerCase() == "legends") {


                                    esclatorWalkPath($rootScope.nearEscId, "Take Escalator down to Level 3.")

                                } else {
                                    showWalkPathByID(parSpaceID);

                                }
                                $scope.openRestrauntDetail(event, parSpaceID, currentIndex)


                            }, 800);



                        }

                    }



                }


                //trish

                showIconByCatagories($scope.foodDrinkDataArray);




                showFoodDrinkData();




            });

        }




        $scope.closeSelected = function() {

            $("#scrollers #thelist li").each(function() {



                $(this).css('display', 'list-item');

                $('#foodHeader').css('display', 'none');

                $('#dietarySearch').remove();

                $scope.linkDisable = false;



            });

            var tmr = setInterval(function() {

                nearbyScroll.refresh();

                clearInterval(tmr);



            }, 100);

        }




        $scope.dietarySearch = function($event) {




            var search_text = event.currentTarget.innerText.trim();

            var rg = new RegExp(search_text, 'i');

            $("#scrollers #thelist li").each(function() {




                if ($.trim($('#dietary', this).html()).search(rg) == -1) {



                    $(this).css('display', 'none');



                } else {



                    for (var i = 0; i < $('#dietary', this).children().length; i++) {

                        ////console.log($.trim($('#dietary div ',this).eq(i).html()));

                        if ($.trim($('#dietary div ', this).eq(i).html()) == search_text) {

                            var searchFlag = true;

                            break;

                        } else {

                            searchFlag = false;

                        }

                    }

                    if (searchFlag == true) {

                        $(this).parent().css('display', '');

                        $(this).css('display', '');

                        $(this).next().css('display', '');

                        $(this).next().next().css('display', '');

                        $scope.linkDisable = true;

                    } else {

                        $(this).css('display', 'none');

                    }




                }

            });

            if (!_isClickedFromNearby)

                //_isAdaModeEnable == true ? content.setUnica("Food & Drinks", "Open", "ADA_Dietary_Feature_" + search_text) : content.setUnica("Food & Drinks", "Open", "Dietary_Feature_" + search_text);

            dietaryElement = angular.element(document.querySelector('#foodHeader'));

            dietaryHtml = '<div  id="dietarySearch" ng-click="closeSelected()"><div class="dietarySearchWrap"><div>' + search_text + '       ' + '</div><img src="assets/imgs/icons/icon_hideButton.svg"/></div></div>';

            dietaryElement.append(dietaryHtml);

            $('#foodHeader').css('display', 'block');



            var tmr = setInterval(function() {

                nearbyScroll.refresh();

                clearInterval(tmr);

                var nitem = "li:nth-child()";



                nearbyScroll.scrollTo(0, 0, 500);



            }, 100);

            compile(dietaryElement)($scope);



        }



        $scope.openRestrauntDetail = function($event, crspd, nearbyIndex) {

            if ($event != undefined) {

                $event.stopPropagation();

            }

            $(".vdDesc").hide();
            $(".adsDivLegends").hide();

            $('.button').css('display', 'block');

            if (nearbyIndex != null && nearbyIndex >= 0) {

                ind = nearbyIndex;

            } else {

                ind = $("." + crspd).closest("li").index();

            }

            // if (!_isClickedFromNearby)

            //   _isAdaModeEnable == true ? content.setUnica("Food & Drinks", "Open", "ADA_Food & Drinks_" + $scope.foodDrinkDataArray[ind]._VN) : content.setUnica("Food & Drinks", "Open", "Food & Drinks_" + $scope.foodDrinkDataArray[ind]._VN);

            // _isClickedFromNearby = false;

            $('.nearbyRow').css({

                'background-color': '#ffffff',

                'border-bottom': '0px'

            });



            $('#thelist li').each(function() {

                var getSrc = $('img', $(this)).eq(1).attr('src').replace('Eat_on.', 'Eat.');

                $('img', $(this)).eq(1).attr('src', getSrc);



            });




            var $this = $('#thelist li').eq(ind);

            var getSrc = $("img", $this).eq(1).attr("src").replace('Eat.', 'Eat_on.');

            $("img", $this).eq(1).attr("src", getSrc);



            $('#thelist li').find('.vendorDetail').css('display', 'none');

            $('#thelist li').find('.nearbyRow').css('backgroundColor', '#ffffff');

            $('#thelist li').eq(ind).find('.nearbyRow').css({

                'background-color': '#f9f9f9',

                'border-bottom': setBorderBottom

            });

            if ($scope.foodDrinkDataArray[ind].FMenu != undefined) {

                $('#thelist li').eq(ind).find('.vendorDetail').css('display', 'block');

                if ($scope.foodDrinkDataArray[ind].FMenu.length > 4) {

                    //$scope.menuDisable=false;

                } else {

                    //$scope.menuDisable=true;

                    $('.button').css('display', 'none');

                }

            }
            if (crspd != null && crspd.toLowerCase() == "legends") {
                $("#vendorDetailContent div").hide();
                $(".vdDesc").show();

                $('.adsDivLegends').show();
                $('.button').css('display', 'none');
                $('#thelist li').eq(ind).find('.vendorDetail').css('display', 'block');
            } else {
                $("#vendorDetailContent div").show();
                $(".vdDesc").hide();

                $('.adsDivLegends').hide();
            }

            var tmr = setInterval(function() {

                nearbyScroll.refresh();

                clearInterval(tmr);

                var nitem = "li:nth-child(" + ind + ")";

                var parentpos = $("#wrapper").position().top;

                var childpos = $("#wrapper li:nth-child(" + (ind + 1) + ")").position().top;

                nearbyScroll.scrollTo(0, parentpos - childpos, 800);

                //nearbyScroll.scrollToElement(nitem, 500);



            }, 100);



        }



        $scope.closeDetail = function($event) {

            $('.nearbyRow').css({

                'background-color': '#ffffff',

                'border-bottom': '0px'

            });

            $('#thelist li').find('.vendorDetail').css('display', 'none');

            $('#thelist li').find('.nearbyRow').css('backgroundColor', '#ffffff');

            $('#thelist li').each(function() {

                var getSrc = $('img', $(this)).eq(1).attr('src').replace('Eat_on.', 'Eat.');

                $('img', $(this)).eq(1).attr('src', getSrc);



            });



            var tmr = setInterval(function() {

                nearbyScroll.refresh();

                clearInterval(tmr);




            }, 100);



        }




        $scope.viewFullMenu = function($event) {

            $scope.menuArray = [];

            var showIndex = $($(event.currentTarget).parents().eq(1)).index();

            var it = $(event.currentTarget).parents().eq(1).html();



            $('.menuList').append(it);

            if ($scope.foodDrinkDataArray[showIndex].FMenu != null) {

                for (var i = 0; i < $scope.foodDrinkDataArray[showIndex].FMenu.length; i++) {

                    $scope.menuArray[i] = $scope.foodDrinkDataArray[showIndex].FMenu[i];

                }

            } else {

                $scope.menuArray = [];

            }
			_isAdaModeEnable == true ? content.setUnica("#DNC#Food & Drinks_" + $scope.foodDrinkDataArray[showIndex]._VN, "View Menu", "ADA=On&Module=Category List") : content.setUnica("#DNC#Food & Drinks_" + $scope.foodDrinkDataArray[showIndex]._VN, "View Menu", "ADA=Off&Module=Category List");



            $('#wrapper').css('display', 'none');

            $('.menuPage').find('.vendorDetail').remove();

            $('.menuPage').css('display', 'block');

            var tmr = setInterval(function() {

                clearInterval(tmr);

                nearbyScroll.refresh();

                if (menuScroll)

                    menuScroll.refresh();

            }, 100);



        }



        $scope.callWalkPath = function($event, crspd) {
            var showIndex = $($(event.currentTarget).parents().eq(1)).index();


            if (crspd.toLowerCase() == "legends") {

                esclatorWalkPath($rootScope.nearEscId, "Take Escalator down to Level 3. ");
            } else {

                showWalkPathByID(crspd);
				_isAdaModeEnable == true ? content.setUnica("#DNC#Food & Drinks_" + $scope.foodDrinkDataArray[showIndex]._VN, "View Menu", "ADA=On&Module=Category List") : content.setUnica("#DNC#Food & Drinks_" + $scope.foodDrinkDataArray[showIndex]._VN, "View Menu", "ADA=Off&Module=Category List");
            }
	



        }



        $scope.closeMenu = function($event) {

            $('#wrapper').css('display', 'block');

            $('.menuPage .menuList').html('');

            $('.menuPage').css('display', 'none');

            var tmr = setInterval(function() {

                nearbyScroll.refresh();

                clearInterval(tmr);

                var nitem = "li:nth-child(" + ind + ")";



                //  nearbyScroll.scrollToElement(nitem,500);



            }, 100);




        }




        showFoodDrinkData = function() {

            if (openId != '') {



                for (var m = 0; m < $scope.foodDrinkDataArray.length; m++) {

                    if (openId == $scope.foodDrinkDataArray[m]._PI) {

                        showValue = $scope.foodDrinkDataArray[m]._SI;

                        break;

                    }



                }




            } else {



            }




            foodDrinkElement = angular.element(document.querySelector('#thelist'));

            foodDrinkElement.html('');

            for (var k = 0; k < $scope.foodDrinkDataArray.length; k++) {

                foodDrinkHtml = '';

                listItem = [];

                listItem = $scope.foodDrinkDataArray[k];

                if (listItem._DF == undefined || listItem._DF == '') {

                    vtc_array = [];

                    //console.log("dietary feature is not defined");

                } else {

                    vtc_array = listItem._DF.split(',');

                }



                if (listItem._PxD.toUpperCase() == "RIGHT") {

                    foodDrinkHtml = '<li><div class="nearbyRow clearfix ' + listItem._SI + '"  ng-click="openRestrauntDetail($event,\'' + listItem._SI + '\',null);callWalkPath($event,\'' + listItem._SI + '\');"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="neabyRightVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + listItem._VT + '.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/RightArrow.svg" /></div><div id="nearbyVendorName" >' + listItem._VN + '</div><div id="nearbyVendorDescription"><div id="foodType">' + listItem._VTC + '</div><div id="dietary">';




                    for (var i = 0; i < vtc_array.length; i++) {

                        foodDrinkHtml = foodDrinkHtml + '<div id="dietaryItem" ng-click="linkDisable||dietarySearch($event)" >' + vtc_array[i].toUpperCase().toUpperCase() + '</div>';

                    }



                    foodDrinkHtml = foodDrinkHtml + '</div></div></div>  <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeDetail($event)"id="hideDetail" ><div>hide</div>   <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Top Picks</div></div></div><div id="vendorDetailContent"><div class="vdDesc">' + listItem.LD.__cdata.substring(0, 200) + '</div><div class="adsDivLegends"> Your selection is on the 3rd Floor. Please go down on the nearest escalator to find your destination.</div>';



                    if ($scope.foodDrinkDataArray[k].FMenu != undefined && $scope.foodDrinkDataArray[k].FMenu instanceof Array) {




                        for (var i = 0; i < 4; i++) {



                            if ($scope.foodDrinkDataArray[k].FMenu[i] != undefined) {

                                foodDrinkHtml += '<div id="vendorDetailRow"><div id="menuName">' + $scope.foodDrinkDataArray[k].FMenu[i]._name + '</div><div id="menuPrice">' + $scope.foodDrinkDataArray[k].FMenu[i]._price + '</div></div>';

                            }




                        }

                        foodDrinkHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/' + $scope.foodDrinkDataArray[k]._VI + '"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    } else if ($scope.foodDrinkDataArray[k].FMenu instanceof Array == false && $scope.foodDrinkDataArray[k].FMenu != undefined) {



                        ////console.log("inside else if"+$scope.foodDrinkDataArray[k].FMenu._name)



                        foodDrinkHtml += '<div id="vendorDetailRow"><div id="menuName">' + $scope.foodDrinkDataArray[k].FMenu._name + '</div><div id="menuPrice">' + $scope.foodDrinkDataArray[k].FMenu._price + '</div></div>';



                        foodDrinkHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/' + $scope.foodDrinkDataArray[k]._VI + '"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    } else {



                        for (var i = 0; i < 4; i++) {

                            foodDrinkHtml += '<div id="vendorDetailRow"><div id="menuName"></div><div id="menuPrice"></div></div>';

                        }

                        foodDrinkHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/' + $scope.foodDrinkDataArray[k]._VI + '"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    }




                } else if (listItem._PxD.toUpperCase() == "LEFT") {

                    foodDrinkHtml = '<li><div class="nearbyRow clearfix ' + listItem._SI + '"    ng-click="openRestrauntDetail($event,\'' + listItem._SI + '\',null);callWalkPath($event,\'' + listItem._SI + '\');"><div id="nearbyLeftVendorDirection"><img id="nearbyVendorimages" src="assets/imgs/icons/LeftArrow.svg" /></div><div id="neabyLeftVendorImage" ><img  id="nearbyVendorimages" src="assets/imgs/icons/' + listItem._VT + '.svg" /></div><div id="nearbyRightVendorDirection"><img id="nearbyVendorimages" src="" /></div><div id="nearbyVendorName" >' + listItem._VN + '</div><div id="nearbyVendorDescription"><div id="foodType">' + listItem._VTC + '</div><div id="dietary">';



                    for (var i = 0; i < vtc_array.length; i++) {

                        foodDrinkHtml = foodDrinkHtml + '<div id="dietaryItem" ng-click="linkDisable||dietarySearch($event)" >' + vtc_array[i].toUpperCase() + '</div>';

                    }

                    foodDrinkHtml = foodDrinkHtml + '</div></div></div> <div class="vendorDetail"><div id="detailHeader"><div id="topPicks"> <div ng-click="closeDetail($event)"id="hideDetail" ><div>hide</div>    <img src="assets/imgs/icons/icon_hideButton.svg"/></div><div>Top Picks</div></div></div><div id="vendorDetailContent"><div class="vdDesc">' + listItem.LD.__cdata.substring(0, 200) + '</div><div class="adsDivLegends">Your selection is on the 3rd Floor. Please go down on the nearest escalator to find your destination </div>';



                    if ($scope.foodDrinkDataArray[k].FMenu != undefined && $scope.foodDrinkDataArray[k].FMenu instanceof Array) {



                        for (var i = 0; i < 4; i++) {

                            if ($scope.foodDrinkDataArray[k].FMenu[i] != undefined) {

                                foodDrinkHtml += '<div id="vendorDetailRow"><div id="menuName">' + $scope.foodDrinkDataArray[k].FMenu[i]._name + '</div><div id="menuPrice">' + $scope.foodDrinkDataArray[k].FMenu[i]._price + '</div></div>';

                            }

                        }

                        foodDrinkHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/' + $scope.foodDrinkDataArray[k]._VI + '"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    } else if ($scope.foodDrinkDataArray[k].FMenu instanceof Array == false && $scope.foodDrinkDataArray[k].FMenu != undefined) {




                        foodDrinkHtml += '<div id="vendorDetailRow"><div id="menuName">' + $scope.foodDrinkDataArray[k].FMenu._name + '</div><div id="menuPrice">' + $scope.foodDrinkDataArray[k].FMenu._price + '</div></div>';



                        foodDrinkHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/' + $scope.foodDrinkDataArray[k]._VI + '"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    } else {



                        for (var i = 0; i < 4; i++) {

                            foodDrinkHtml += '<div id="vendorDetailRow"><div id="menuName"></div><div id="menuPrice"></div></div>';

                        }

                        foodDrinkHtml += '</div><div id="vendorDetailImage"><img onerror="hideBrokenImg(this);" src="../Data/Dynamic Map/' + $scope.foodDrinkDataArray[k]._VI + '"/></div><div  class="insideButton button" ng-click="viewFullMenu($event)">View Full Menu<img src="assets/imgs/icons/moreMenu_rightArrow.svg"/></div></div></li>';



                    }




                } else {

                    //console.log("Something wrong with the code")

                }

                foodDrinkElement.append(foodDrinkHtml);

            }

            compile(foodDrinkElement)($scope);

            menuScroll = new iScroll('menuWrapper', {

                hScrollbar: false,

                vScrollbar: false,

                click: true

            });

            if (nearbyScroll != undefined || nearbyScroll != null) {

                nearbyScroll.destroy();

                nearbyScroll = null;



            }

            nearbyScroll = new iScroll('wrapper', {

                hScrollbar: false,

                vScrollbar: false,

                click: true

            });



            if (showValue != undefined && openId != '') {



                //$('#scrollers #thelist li').eq(showValue).find('.vendorDetail').css('display','block');

                var tmr = setInterval(function() {

                    nearbyScroll.refresh();

                    clearInterval(tmr);




                }, 100);




                $scope.openRestrauntDetail(event, showValue, null);




                openId = '';

                showValue = undefined;

            } else {

                nearbyScroll.refresh();

                openId = '';

            }

        }



        getFoodDrinkData(showFoodDrinkData);

        var imgName = $('nav #Eat img').attr("src");

        imgName = imgName.replace('off.', 'on.');

        $('nav #Eat img').attr("src", imgName);



        //var fooddrinkTimer=interval(function() { interval.cancel(fooddrinkTimer);var foodDrinkScroll = new iScroll('wrapper'); },2000);

    }

]);