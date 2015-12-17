var myApp = angular.module('IONOS');

var count = 0;

var response;

var openId = '';

var setMarginTop = '575px';

var setScrollHeight = '';

var getMapContentHeight;

var searchPanelTopPos = "935px";

myApp.controller('searchController', ['$scope', '$http', "$sce", "$timeout", "content", "$idle", "$location", '$rootScope', '$interval', '$compile',

function ($scope, $http, $sce, $timeout, content, $idle, $location, $rootScope, interval, compile) {

    navItem = '';

    searchHtml = '';

    searchlistItem = [];

    searchClickedCounter = 0;

    searchScroll = '';

    $scope.searchDataArray = [];

    $scope.searchDisable = true;

    $scope.searchText = '';

    $scope.result = '';

    $('#write').focus();

    _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Search List", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Search List", "ADA=Off&Module=Navigation Panel");

    $('#searchUI').css('display', 'none');

    if ($scope.adaMode == true) {

        $('#containerSearch').css('top', '240px');

    }

	

	getMapContentHeight = $('#mapContent').height();

	if(getMapContentHeight <= 800){

		setMarginTop = '290px';

		setScrollHeight = '690px';

		searchPanelTopPos = "470px";

	

	} else {

	searchPanelTopPos = "935px";



		setScrollHeight = '1430px';

	}



    $.fn.highlight = function (str, className) {



        var regex = new RegExp(str, "gi");

        return this.each(function () {

            $(this).contents().filter(function () {

                return this.nodeType == 3 && regex.test(this.nodeValue);

            }).replaceWith(function () {

                return (this.nodeValue || "").replace(regex, function (match) {

                    return "<span class=\"" + className + "\">" + match + "</span>";

                });

            });

        });

    };

    getSearchData = function (getEventData) {



        $scope.searchDataArray = [];

        content.getModuleData("dynamic").then(function (response) {

            response = angular.copy(response);

            for (var sec = 0; sec < response.Sections.Section.length; sec++) {

                if (response.Sections.Section[sec]._ID == 'Dynamic Map') {

                    for (var i = 0; i < response.Sections.Section[sec].DNode.length; i++) {



                        if (response.Sections.Section[sec].DNode[i]._PxT == '' || response.Sections.Section[sec].DNode[i]._PxD == '') {

                            //console.log("no proximity available for the vendor")

                        }

                        else {



                            $scope.searchDataArray.push(response.Sections.Section[sec].DNode[i]);



                        }



                    }

                }

            }





            getEventData(getInfoCategoryData);

        });



    }





    getEventData = function (getInfoCategoryData) {





        content.getModuleData("event").then(function (response) {

            response = angular.copy(response);

            if (response.Sections.Section.DataNode != undefined) {

                for (var i = 0; i < response.Sections.Section.DataNode.length; i++) {

                    $scope.searchDataArray.push(response.Sections.Section.DataNode[i]);

                }

            }

            getInfoCategoryData(showSearchData);

        });



    }



    getInfoCategoryData = function (showSearchData) {





        content.getModuleData("InfoCategory").then(function (response) {

            response = angular.copy(response);

            for (var i = 0; i < response.Sections.Section.Data.length; i++) {

                $scope.searchDataArray.push(response.Sections.Section.Data[i]);

            }

            showSearchData();

        });



    }



    $scope.searchAgain = function () {

        $('#write').html('');

        $('#write').focus();

        $scope.searchText = '';

        $scope.searchDisable = true;

        $('#keyboard').css('display', 'block');

        $('#containerSearch').css('top', searchPanelTopPos);



        if ($scope.adaMode == true) {

            $('#containerSearch').css('top', '225px');



        }



        $('#searchTextContainer').animate({

            marginTop: '0px'

        },

                                           {

                                               easing: 'swing',

                                               duration: 2000,

                                               complete: function () {





                                                   searchFlag = false;







                                                   $('.noResult').css('display', 'none');



                                                   //$('#searchItemList').css('display','block');

                                                   $('#containerSearch').css('height', '660px');



                                               }

                                           });

    }



















    $scope.changeView = function ($event) {

        var searchIndex = $($event.currentTarget).index();

        var viewName = '';

        var searchSrc = '';

        if ($scope.searchDataArray[searchIndex]._VT == 'Services') {

            if ($scope.searchDataArray[searchIndex]._VTC == "Restroom") {

                viewName = 'Restrooms';

            }

            else {

                viewName = 'More';

            }

        }

        else {

            if ($scope.searchDataArray[searchIndex]._VT && $scope.searchDataArray[searchIndex]._IVT == undefined)

                viewName = $scope.searchDataArray[searchIndex]._VT;

            else if ($scope.searchDataArray[searchIndex]._IVT == 'InfoCategory' || $scope.searchDataArray[searchIndex]._IVT == 'InfoItem')

                viewName = 'More';

            else

            { }

        }





        $('#searchUI').css('display', 'block');

        $('#navigationPanelUI').css('display', 'block');



        _isAdaModeEnable == true ? content.setUnica("#DNC#Search List", "Keyword Search", "ADA=On&Module=Search List&KeywordSearch="+$scope.searchText) : content.setUnica("#DNC#Search List", "Keyword Search", "ADA=Off&Module=Search List&KeywordSearch="+$scope.searchText);


        var si = $scope.searchDataArray[searchIndex]._SI
                openId = $scope.searchDataArray[searchIndex]._PI;
        		 if(si.toLowerCase() == "legends"){esclatorWalkPath($rootScope.nearEscId,"Take Escalator down to Level 3. ");} 
                 else if( si.toLowerCase() == "proshop"){esclatorWalkPath($rootScope.nearEscId,"Take Escalator down to Level 2. ");}
                 else{

                showWalkPathByID(si);
        }

        switch (viewName) {

            case "Eat":

                searchSrc = $('nav #Eat img').attr('src')

                $('nav #Eat img').attr("src", searchSrc.replace('off.', 'on.'));

                $location.url("/foodDrink/ ");
				_isAdaModeEnable == true ? content.setUnica("Food & Drinks_" + $scope.searchDataArray[searchIndex]._VN, "Open Vendor Detail", "ADA=On&Module=Search List") : content.setUnica("Food & Drinks_" + $scope.searchDataArray[searchIndex]._VN, "Open Vendor Detail", "ADA=Off&Module=Search List");


                break;

            case "Shops":

                searchSrc = $('nav #Shops img').attr('src')

                $('nav #Shops img').attr("src", searchSrc.replace('off.', 'on.'));

                $location.url("/merchandise/ ");
				_isAdaModeEnable == true ? content.setUnica("Merchandise_" + $scope.searchDataArray[searchIndex]._VN, "Open Vendor Detail", "ADA=On&Module=Search List") : content.setUnica("Merchandise_" + $scope.searchDataArray[searchIndex]._VN, "Open Vendor Detail", "ADA=Off&Module=Search List");
                break;

            case "Restrooms":

                searchSrc = $('nav #Restroom img').attr('src')

                $('nav #Restroom img').attr("src", searchSrc.replace('off.', 'on.'));

                $location.url("/restrooms/ ");
				_isAdaModeEnable == true ? content.setUnica("Restroom_" + $scope.searchDataArray[searchIndex]._VN, "", "ADA=On&Module=Search List") : content.setUnica("Restroom_" + $scope.searchDataArray[searchIndex]._VN, "", "ADA=Off&Module=Search List");
                break;

            case "More":

                searchSrc = $('nav #MoreSer img').attr('src')

                $('nav #MoreSer img').attr("src", searchSrc.replace('off.', 'on.'));

                $location.url("/More/ / / / ");

                if ($scope.searchDataArray[searchIndex]._VTC == 'Atm' || $scope.searchDataArray[searchIndex]._VTC == 'Water Fountain' || $scope.searchDataArray[searchIndex]._VTC == 'Public Relations Office')

                    openId = 'icon_waterFountain';

                else if ($scope.searchDataArray[searchIndex]._VTC == 'icon_safety')

                    openId = 'icon_safety';

                else

                    openId = $scope.searchDataArray[searchIndex]._Id;
				
				if($scope.searchDataArray[searchIndex]._VN != undefined) {				
					_isAdaModeEnable == true ? content.setUnica("More_" + $scope.searchDataArray[searchIndex]._VN, "", "ADA=On&Module=Search List") : content.setUnica("More_" + $scope.searchDataArray[searchIndex]._VN, "", "ADA=Off&Module=Search List");
				} else if($scope.searchDataArray[searchIndex]._infoname != undefined) {				
					_isAdaModeEnable == true ? content.setUnica("More_" + $scope.searchDataArray[searchIndex]._infoname, "", "ADA=On&Module=Search List") : content.setUnica("More_" + $scope.searchDataArray[searchIndex]._infoname, "", "ADA=Off&Module=Search List");
				}

                break;

            case "ICREvent":

                searchSrc = $('nav #MoreSer img').attr('src')

                $('nav #MoreSer img').attr("src", searchSrc.replace('off.', 'on.'));

                openId = 'event';

                $location.url("/More/ / / / ");
				_isAdaModeEnable == true ? content.setUnica("Events_" + $scope.searchDataArray[searchIndex]._EName, "Open Event Detail", "ADA=On&Module=Search List") : content.setUnica("Events_" + $scope.searchDataArray[searchIndex]._EName, "Open Event Detail", "ADA=Off&Module=Search List");
                break;

            case "InfoCategory":

                searchSrc = $('nav #MoreSer img').attr('src')

                $('nav #MoreSer img').attr("src", searchSrc.replace('off.', 'on.'));

                openId = $scope.searchDataArray[searchIndex]._Id;

                $location.url("/More/ / / / ");
				_isAdaModeEnable == true ? content.setUnica("More_"+$scope.searchDataArray[searchIndex]._infoname, "", "ADA=On&Module=Search List") : content.setUnica("More_"+$scope.searchDataArray[searchIndex]._infoname, "", "ADA=Off&Module=Search List");
                break;

            default:

                $location.url("/")

                break;

        }





        //$scope.$apply();

        ////console.log($scope.searchDataArray[searchIndex]._VT);

        ////console.log(openId)



    }







    showSearchData = function () {



        searchElement = angular.element(document.querySelector('#searchthelist'));

        searchElement.html('');



        for (var k = 0; k < $scope.searchDataArray.length; k++) {

            searchHtml = '';

            searchlistItem = [];

            searchlistItem = $scope.searchDataArray[k];

            if (searchlistItem._VT == 'ICREvent') {

                searchHtml = '<li  ng-click="changeView($event)" class="searchList"><div class="searchRow clearfix"><div id="searchVendorName" >' + searchlistItem._EName + '</div><div id="searchVendorDescription">' + searchlistItem._ESD + '</div></div></li>';

            }

            else if (searchlistItem._IVT == 'InfoCategory' || searchlistItem._IVT == 'InfoItem') {

                if (searchlistItem._ISD != undefined) {

                    searchHtml = '<li  ng-click="changeView($event)" class="searchList"><div class="searchRow clearfix"><div id="searchVendorName" >' + searchlistItem._infoname + '</div><div id="searchVendorDescription">' + searchlistItem._ISD + '</div></div></li>';

                }

                else {

                    searchHtml = '<li  ng-click="changeView($event)" class="searchList"><div class="searchRow clearfix"><div id="searchVendorName" >' + searchlistItem._infoname + '</div><div id="searchVendorDescription"></div></div></li>';

                }

            }



            else {

                if (searchlistItem._PRT == undefined) {

                    searchlistItem._PRT = '';

                }

                if (searchlistItem._DF == undefined) {

                    searchlistItem._DF = '';

                }

                if (searchlistItem._VL == undefined) {

                    searchlistItem._VL = '';

                }

                if (searchlistItem._KW == undefined) {

                    searchlistItem._KW = '';

                }



                searchHtml = '<li  ng-click="changeView($event)" class="searchList"><div class="searchRow clearfix"><div id="searchVendorName" >' + searchlistItem._VN + '</div><div id="searchVendorDescription">' + searchlistItem._PRT + '  ' + searchlistItem._VTC + '  ' + searchlistItem._DF + '  ' + searchlistItem._VL + '</div><div style="display:none;" class="keywordSearch">' + searchlistItem._KW + '</div></div></li>';

            }



            searchElement.append(searchHtml);

        }

        compile(searchElement)($scope);

        searchScroll = new iScroll('searchItemList', {

            hScrollbar: false,

            vScrollbar: false,

			click:true

        });



        searchScroll.refresh();

    }



    //var timer=interval(function() { interval.cancel(timer);var searchScroll = new iScroll('searchItemList'); },2000);







    //search start here



    $(function () {



        var $write = $('#write'),

            shift = false,

            capslock = false;



        $('#keyboard li, .delete, .right-shift').click(function () {



            var tmr = setInterval(function () {

                searchScroll.refresh();

                clearInterval(tmr);



            }, 100);





            $('#keyboard li').removeClass('click');

            $('#searchItemList').css('display', 'block');

            $('#searchItemList').css('opacity', '1');

            var $this = $(this),

                character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

            if ($this.hasClass('symbol') || $this.hasClass('letter')) {

                $this.addClass('click');

            }



            // Search keys

            if ($this.hasClass('right-shift')) {

                search_text = $('#write').val();

                $('#keyboard li').removeClass('click');

                return false;

            }



            // Caps lock

            if ($this.hasClass('capslock')) {

                $('.letter').toggleClass('uppercase');

                capslock = true;

                return false;

            }



            // Delete

            if ($this.hasClass('delete')) {

                var html = $write.html();



                $write.html(html.substr(0, html.length - 1));



                var search_text = $('#write').val();

                var rg = new RegExp(search_text, 'i');

                if (search_text == '') {

                    $('#searchItemList').css('opacity', '0');

                    $scope.searchText = '';

                    $scope.result = '';

                }

                else {

                    $scope.searchText = search_text.substring(0, 25);



                    $('#searchScrollers #searchthelist li').each(function () {

                        if ($.trim($(this).html()).search(rg) == -1) {

                            //$(this).parent().css('display', 'none');

                            $(this).css('display', 'none');

                            //$(this).next().css('display', 'none');

                            //$(this).next().next().css('display', 'none');

                        }

                        else {

                            $("#searchVendorName", this).html($("#searchVendorName", this).html().replace('<span class="highLightClass">', ""))

                            $("#searchVendorDescription", this).html($("#searchVendorDescription", this).html().replace('<span class="highLightClass">', ""))

                            $("*", this).highlight($('#write').val(), "highLightClass");

                            $(this).parent().css('display', '');

                            $(this).css('display', '');

                            $(this).next().css('display', '');

                            $(this).next().next().css('display', '');

                        }



                    });



                }

                return false;

            }



            // Special characters

            if ($this.hasClass('symbol')) character = $('span:visible', $this).html();

            if ($this.hasClass('space')) character = ' ';

            if ($this.hasClass('tab')) character = "\t";

            if ($this.hasClass('return')) character = "\n";



            // Uppercase letter

            if ($this.hasClass('uppercase')) character = character.toUpperCase();



            // Remove shift once a key is clicked.

            if (shift === true) {

                $('.symbol span').toggle();

                if (capslock === false) $('.letter').toggleClass('uppercase');



                shift = false;

            }





            // Add the character

            if ($write.html().length <= 25)

                $write.html($write.html() + character);





            var search_text = $('#write').val();



            var rg = new RegExp(search_text, 'i');



            $scope.searchText = search_text.substring(0, 25);

            $('#searchScrollers #searchthelist li').each(function () {

                if ($.trim($(this).text()).search(rg) == -1) {

                    //$(this).parent().css('display', 'none');

                    $(this).css('display', 'none');

                    //$(this).next().css('display', 'none');

                    //$(this).next().next().css('display', 'none');

                }

                else {

                    $("#searchVendorName", this).html($("#searchVendorName", this).html().replace('<span class="highLightClass">', ""))

                    $("#searchVendorDescription", this).html($("#searchVendorDescription", this).html().replace('<span class="highLightClass">', ""))

                    $("*", this).highlight($('#write').val(), "highLightClass");

                    //$(this).highlight("frank","thisClass");

                    $(this).parent().css('display', '');

                    $(this).css('display', '');

                    $(this).next().css('display', '');

                    $(this).next().next().css('display', '');

                }





            });

			 setTimeout(function(){

			  searchScroll.refresh();

			 },10);

            //	$("#searchScrollers #searchthelist li *").highlight($('#write').val(),"highLightClass");



            //	$("*",this).highlight("","highLightClass");			

			





        });

    });











    $('.right-shift').click(function () {

        //_isAdaModeEnable == true ? content.setUnica("Navigation Panel", "Open", "ADA_Search_Submit") : content.setUnica("Navigation Panel", "Open", "Search_Submit");

        //_isAdaModeEnable == true ? content.setUnica("Navigation Panel", "Search", "ADA_Search_Text_" + $scope.searchText) : content.setUnica("Navigation Panel", "Search", "Search_Text_" + $scope.searchText);

        if ($(".keywordSearch").text().indexOf($scope.searchText) > -1) {

            _isAdaModeEnable == true ? content.setUnica("#DNC#Search List", "Keyword Search", "ADA=On&Module=Search List&KeywordSearch="+$scope.searchText) : content.setUnica("#DNC#Search List", "Keyword Search", "ADA=Off&Module=Search List&KeywordSearch="+$scope.searchText);

        }

        if ($scope.adaMode == true) {

            $('#containerSearch').css({ 'top': '205px', 'height': '0px' });



        }



        if ($scope.searchText == '') {



            $('.noResult').css('display', 'block');

            $('#searchItemList').css('display', 'none');

            $('#containerSearch').css('top', searchPanelTopPos);



            if ($scope.adaMode == true) {

                $('#containerSearch').css('top', '240px');

                $('.noResult').css('fontSize', '40px');

            }

        }









        $('#searchTextContainer').animate({

            marginTop: setMarginTop

        },

                   {

                       easing: 'swing',

                       duration: 2000,

                       complete: function () {





							

							$('#searchItemList').css('height',setScrollHeight);

							setTimeout(function(){

							  searchScroll.refresh();

							 },1200);



                           $scope.searchDisable = false;

                           var searchFlag = false;

                           $('#keyboard').css('display', 'none');

                           $('#containerSearch').css('height', '0px');

                           $('#searchScrollers #searchthelist li').each(function () {



                               if ($(this).css('display') == 'none') {

                                   searchFlag = true;



                                   if ($scope.adaMode == true) {



                                       $('.noResult').css('fontSize', '40px');

                                   }

                               }

                               else {

                                   searchFlag = false;

                                   return false;



                               }





                           });

                           if (searchFlag == true) {





                               $('.noResult').css('display', 'block');

                               $('#searchItemList').css('display', 'none');

                           }

                       }

                   });



    });

    $('#headerClose').click(function () {



        //$('#containerSearch').css('opacity','0');

        $('#navigationPanelUI').css('display', 'block');

        $('#searchUI').css('display', 'block');

        $('#containerSearch').css('height', '660px');

        $location.url("/");

        searchSrc = $("img", $('#navigationContainer li').eq(0)).attr('src');



        $("img", $('#navigationContainer li').eq(0)).attr("src", searchSrc.replace('off.', 'on.'));

        $scope.$apply();



    });




    //search ends here



    getSearchData(getEventData);





}]);





