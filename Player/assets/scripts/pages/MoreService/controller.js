var myApp = angular.module('IONOS');

var count = 0;

var response;

var moreServiceWrapper;

var isClicked = false;
var selectedMoreCategory='';
myApp.controller('moreServiceController', ['$scope', '$routeParams', '$http', "$sce", "$timeout", "content", "$compile", "$location", '$rootScope', '$interval',

    function($scope, $routeParams, $http, $sce, $timeout, content, compile, $location, $rootScope, interval) {



        var arrlst = [{

            vendorName: "ATMs & Other Services",

            id: "inti",

            img: "icon_TDBank_ATM_off",

            leafCheck: "",

            nodeId: "",

            clickCheck: "dynamic"

        }, {

            vendorName: "Safety & First Aid Office",

            id: "inti",

            img: "icon_safety",

            leafCheck: "",

            nodeId: "",

            clickCheck: "safety"

        }, {

            vendorName: "Events Calendar",

            id: "inti",

            img: "icon_eventsCalendar",

            leafCheck: "",

            nodeId: "",

            clickCheck: "event"

        }];

        var varlst = []

        var infoData = [];

        var ulElement;

        var level = 0;

        var previousId = '';

        var previousInfoname = '';

        var backId = '';

        var atmData = [];

        var safetyData = [];

        var previousClicked = 100;

        var showvalue = -100;

        var getMapContentHeight = $('#mapContent').height();

        var wrapperHeight = 1100;

        var wrapperHeightAda = 710;

        if (getMapContentHeight <= 800) {

            setBorderBottom = '2px dotted #c0c0c0';

            wrapperHeight = 580;

            wrapperHeightAda = 400;

        }

        $scope.moreTitle = false;

        $scope.infoItem = '';

        $scope.isChild = false;

        if (!_isClickedFromNearby && openId == '')

            _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "More", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "More", "ADA=Off&Module=Navigation Panel");

        $('#wrapper').css('bottom', 'auto');

        if (_isAdaModeEnable) {



            $('#wrapper').height(wrapperHeightAda);

            $('#searchItemList').height(710);

        } else {

            $('#wrapper').height(wrapperHeight);

            $('#searchItemList').height(1350);

        }



        $scope.handleClickEvent = function(msg, leafCheck, nodeId, clickCheck) {

            varlst.splice(0, varlst.length);

            switch (clickCheck) {

                case "event":

                    if (!_isClickedFromNearby)

                        _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Events Calendar", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Events Calendar", "ADA=Off&Module=Navigation Panel");
					selectedMoreCategory = 'Events Calendar';

                    eventService();

                    break;

                case "dynamic":

                    if (!_isClickedFromNearby)

                        if(openId == '') {
						_isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "ATMs & Other Services", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "ATMs & Other Services", "ADA=Off&Module=Navigation Panel");
					}
					selectedMoreCategory = 'ATMs & Other Services';

                    dynamicMapService("Atm", "ATMs & OTHER SERVICES");

                    break;

                case "safety":

                    if (!_isClickedFromNearby)

                        _isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", "Safety & First Aid Office", "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", "Safety & First Aid Office", "ADA=Off&Module=Navigation Panel");
					selectedMoreCategory = 'Safety & First Aid Office';

                    dynamicMapService("First Aid Office", "Safety & First Aid Office");

                    break;

                default:

                    if (!_isClickedFromNearby)

                        selectedMoreCategory = msg;
					_isAdaModeEnable == true ? content.setUnica("#DNC#Navigation Panel", ""+msg, "ADA=On&Module=Navigation Panel") : content.setUnica("#DNC#Navigation Panel", ""+msg, "ADA=Off&Module=Navigation Panel");	

                    getChildData(msg, leafCheck, nodeId);

                    break;

            }



            var tmr = setTimeout(function() {

                clearInterval(tmr);

                nearbyScroll.refresh();

            }, 300);

        }




        $scope.highlight = function($event, si) {



            var moreIndex = 0;

            for (var i = 0; i < varlst.length; i++) {

                if (si == varlst[i].nodeXml._SI) {

                    moreIndex = i;

                    break;

                }



            }



            showWalkPathByID(varlst[moreIndex].nodeXml._SI);

            $('#thelist li').each(function() {

                var getSrc = $('img', $(this)).eq(0).attr('src').replace('_on', '_off');

                $('img', $(this)).eq(0).attr('src', getSrc);

                $(this).css('background-color', '#ffffff');



            });

            var $this = $($event.currentTarget).parents().eq(1)

            var getSrc = $("img", $this).eq(0).attr("src").replace('_off', '_on');

            $("img", $this).eq(0).attr("src", getSrc);

            $($event.currentTarget).parents().eq(1).css('background-color', '#f9f9f9');

            var serviceName = $event.currentTarget != null ? $event.currentTarget.innerText.trim() : "";

            if (serviceName != null && serviceName != "" && !_isClickedFromNearby)

                _isAdaModeEnable == true ? content.setUnica(""+selectedMoreCategory+"_"+serviceName, "", "ADA=On&Module=Information Items") : content.setUnica(""+selectedMoreCategory+"_"+serviceName, "", "ADA=Off&Module=Information Items");

            nearbyScroll.refresh();

        }




        getChildData = function(infoname, leafCheck, nodeId, lstNode) {




            if (lstNode == undefined) {
                level++;
                previousId = '';
                previousId = nodeId;
                previousInfoname = $('#titleText').html();
            }




            //alert("1"+previousInfoname);



            for (var i = 0; i < infoData.length; i++) {

                if (infoData[i]._ParentID == nodeId && leafCheck != 'True') {



                    varlst.push({

                        vendorName: infoData[i]._infoname,

                        id: "infoSubChild",

                        nodeXml: infoData[i]

                    });

                } else if (infoData[i]._Id == nodeId && leafCheck == 'True') {

                    varlst.push({

                        vendorName: infoData[i]._infoname,

                        id: "infoLeafChild",

                        nodeXml: infoData[i]

                    });

                } else {



                }



            }
            // Update

            if (varlst.length == 1 && leafCheck.toLowerCase() == "false") {
                var nme = varlst[0].vendorName;
                var id = varlst[0].nodeXml._Id;
                varlst.splice(0, varlst.length);
                getChildData(nme, "True", id, "lastNode");

                return;

            }


            if (level <= 1) {



                $scope.titleTxt = infoname.toUpperCase();

            } else {


                $scope.infoItem = previousInfoname.replace(/&amp;/g, '&');

                $scope.isChild = true;

                $scope.titleTxt = infoname.toUpperCase();

            }

            $scope.moreTitle = true;

            $scope.items = varlst;

            nearbyScroll.refresh();

        }



        getParentId = function(previousId) {



            for (var i = 0; i < infoData.length; i++) {

                if (infoData[i]._Id == previousId) {

                    return infoData[i]._ParentID;

                }

            }

        }



        $scope.goPrevious = function() {

            $('#thelist li').css('background-color', '#ffffff');

            varlst = [];

            level = level - 1;



            backId = getParentId(previousId);

            var superId = getParentId(backId);

            //alert("2"+previousInfoname);

            //alert(superId)

            for (var i = 0; i < infoData.length; i++) {

                if (infoData[i]._ParentID == backId) {



                    varlst.push({

                        vendorName: infoData[i]._infoname,

                        id: "infoSubChild",

                        nodeXml: infoData[i]

                    });

                    previousId = backId;



                }



                if (level <= 1 && backId == infoData[i]._Id) {

                    $scope.isChild = false;

                    previousInfoname = infoData[i]._infoname;



                } else if (level > 1 && backId == infoData[i]._Id) {



                    previousInfoname = infoData[i]._infoname;

                    for (var k = 0; k < infoData.length; k++) {

                        if (superId == infoData[k]._Id) {

                            $scope.infoItem = infoData[k]._infoname.replace(/&amp;/g, '&');

                        }

                    }



                } else {



                }



            }



            $scope.titleTxt = previousInfoname.toUpperCase();

            $scope.items = varlst;

            var tmr = setTimeout(function() {



                clearInterval(tmr);

                nearbyScroll.refresh();

            }, 300);

        }




        $scope.items = arrlst;

        $scope.goBack = function() {

            $('#thelist li').css('background-color', '#ffffff');

            $scope.items = arrlst;

            $scope.moreTitle = false;

            $scope.isChild = false;

            $scope.titleTxt = "";

            level = 0;

            previousId = '';

            backId = '';

            previousInfoname = '';

            var tmr = setTimeout(function() {



                clearInterval(tmr);

                nearbyScroll.refresh();

            }, 300);

        }



        var parVendorID = $routeParams.VendorID;



        var parleafCheck = $routeParams.leafCheck;

        var parnodeId = $routeParams.nodeId;

        var parclickCheck = $routeParams.clickCheck;

        eventService = function() {

            content.getModuleData("event").then(function(response) {

                response = angular.copy(response);

                $scope.moreTitle = true;

                $scope.titleTxt = "EVENTS CALENDAR";

                if (response.Sections.Section.DataNode != undefined) {

                    if (response.Sections.Section.DataNode instanceof Array) {

                        for (var i = 0; i < response.Sections.Section.DataNode.length; i++) {

                            varlst.push({

                                vendorName: response.Sections.Section.DataNode[i]._EName,

                                id: "event",

                                nodeXml: response.Sections.Section.DataNode[i]

                            });



                        }

                    } else {

                        varlst.push({

                            vendorName: response.Sections.Section.DataNode._EName,

                            id: "event",

                            nodeXml: response.Sections.Section.DataNode

                        });

                    }

                }




                $scope.items = varlst;

                //trish




                var tmr = setTimeout(function() {



                    clearInterval(tmr);



                    nearbyScroll.refresh();

                }, 600);

            });



        }

        dynamicMapService = function(inp, titletxt) {



            content.getModuleData("dynamic").then(function(response) {

                response = angular.copy(response);

                $scope.moreTitle = true;

                $scope.titleTxt = titletxt.toUpperCase();




                for (var sec = 0; sec < response.Sections.Section.length; sec++) {

                    if (response.Sections.Section[sec]._ID == 'Dynamic Map') {

                        for (var i = 0; i < response.Sections.Section[sec].DNode.length; i++) {

                            if (response.Sections.Section[sec].DNode[i]._VTC.toUpperCase() == inp.toUpperCase()) {

                                varlst.push({

                                    vendorName: response.Sections.Section[sec].DNode[i]._VN,

                                    id: inp,

                                    proximity: response.Sections.Section[sec].DNode[i]._PxT,

                                    nodeXml: response.Sections.Section[sec].DNode[i]

                                });



                            } else if (response.Sections.Section[sec].DNode[i]._VTC.toUpperCase() == 'WATER FOUNTAIN' && inp.toUpperCase() == 'ATM') {

                                varlst.push({

                                    vendorName: response.Sections.Section[sec].DNode[i]._VN,

                                    id: 'Water Fountain',

                                    proximity: response.Sections.Section[sec].DNode[i]._PxT,

                                    nodeXml: response.Sections.Section[sec].DNode[i]

                                });



                            } else if (response.Sections.Section[sec].DNode[i]._VTC.toUpperCase() == 'PUBLIC RELATIONS OFFICE' && inp.toUpperCase() == 'ATM') {

                                varlst.push({

                                    vendorName: response.Sections.Section[sec].DNode[i]._VN,

                                    id: 'Public Relations Office',

                                    proximity: response.Sections.Section[sec].DNode[i]._PxT,

                                    nodeXml: response.Sections.Section[sec].DNode[i]

                                });



                            } else {



                            }



                        }

                    }

                }



                varlst.sort(function(a, b) {

                    // Sort by proximity

                    var proximity = parseInt(a.proximity) - parseInt(b.proximity)

                    if (proximity)

                        return proximity;

                    // If there is a tie, sort by year

                    if (a._VN < b._VN)

                        return -1;

                    if (a._VN > b._VN)

                        return 1;

                });



                $scope.items = varlst;



                var tmr = setTimeout(function() {

                    if (isClicked) {

                        if (currentSpaceID == "FirstAid") {

                            $("#thelist li").eq(0).find(".rowtable").trigger("click");

                        } else {

                            $("#thelist li").eq(1).find(".rowtable").trigger("click");

                        }

                        isClicked = false;

                    }

                    clearInterval(tmr);



                    nearbyScroll.refresh();

                }, 600);



            });




        }



        if (nearbyScroll != undefined)

            nearbyScroll.destroy();

        nearbyScroll = new iScroll('wrapper', {

            hScrollbar: false,

            vScrollbar: false,

            click: true

        });



        nearbyScroll.refresh();



        $scope.handleEventModule = function($event) {

            if ($($event.currentTarget).next().css("display") != "block")

                $('.rightArrow img').show();



            if (previousClicked == $($event.currentTarget).parents().eq(2).index()) {

                return;

            }

            var eventClicked = $($event.currentTarget).find("#eventName").text();

            if (eventClicked != null && eventClicked != "" && !_isClickedFromNearby)

                _isAdaModeEnable == true ? content.setUnica("Events_"+eventClicked, "", "ADA=On&Module=Events") : content.setUnica("Events_"+eventClicked, "", "ADA=Off&Module=Events");



            $(".eventDetails").hide();



            $('.rowtable').css({

                'background-color': '#ffffff',

                'border-bottom': '0px'

            });

            previousClicked = $($event.currentTarget).parents().eq(2).index();



            var ele = $($event.currentTarget).parent().parent().find('.eventDetails');

            $($event.currentTarget).parent().parent().find('.rowtable').css({

                'background-color': '#f9f9f9',

                'border-bottom': '4px dotted #c0c0c0'

            });

            if ($(ele).text().trim().length > 4) {

                $(ele).show();

                $($event.currentTarget).find("img").hide();

            } else {




            }



            nearbyScroll.scrollToElement('li:nth-child(' + previousClicked + ')', 500)

            var tmr = setTimeout(function() {



                clearInterval(tmr);



                nearbyScroll.refresh();

            }, 600);




            // nearbyScroll.scrollToElement("#wrapper","1s")

        }

        $scope.closeDetail = function($event) {

            $(".eventDetails").slideUp();

            $('.rowtable').css({

                'background-color': '#ffffff',

                'border-bottom': '0px'

            });

            $($event.currentTarget).parent().prev().find("img").show();

            previousClicked = 100;

        }




        getInfoCategoryData = function() {

            content.getModuleData("InfoCategory").then(function(response) {

                response = angular.copy(response);

                for (var i = 0; i < response.Sections.Section.Data.length; i++) {



                    if (response.Sections.Section.Data[i]._ParentID == '' || response.Sections.Section.Data[i]._ParentID == undefined) {

                        if (response.Sections.Section.Data[i]._infoname.indexOf('ATM') >= 0) {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_TDBank_ATM",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });



                        } else if (response.Sections.Section.Data[i]._infoname.toUpperCase().indexOf('PREMIUM SEATING') >= 0) {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_premiumSeating",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (response.Sections.Section.Data[i]._infoname.toUpperCase().indexOf('DEFIBULATOR') >= 0) {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_defibrilator",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (response.Sections.Section.Data[i]._infoname.toUpperCase().indexOf('FIRST AID') >= 0) {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_safety",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });



                        } else if (response.Sections.Section.Data[i]._infoname.toUpperCase().indexOf('ADA') >= 0) {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_ADA",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (response.Sections.Section.Data[i]._infoname.toUpperCase().indexOf('GETTING AROUND') >= 0) {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_gettingAround",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (response.Sections.Section.Data[i]._infoname.toUpperCase().indexOf('WATER FOUNTAIN') >= 0) {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_waterFountain",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });



                        } else {

                            arrlst.push({

                                vendorName: response.Sections.Section.Data[i]._infoname,

                                id: "inti",

                                img: "icon_guestRelations",

                                leafCheck: response.Sections.Section.Data[i]._isleafnode,

                                nodeId: response.Sections.Section.Data[i]._Id,

                                clickCheck: "other"

                            });

                        }




                    } else {



                    }



                    infoData.push(response.Sections.Section.Data[i]);




                }




                //check if open id is there




                if (openId != undefined && openId != '') {



                    switch (openId) {

                        case "icon_safety":

                            isClicked = true;

                            $scope.handleClickEvent('', '', '', 'safety');



                            openId = '';

                            break;

                        case "icon_waterFountain":

                            $scope.handleClickEvent('', '', '', 'dynamic')

                            openId = '';

                            break;

                        case "icon_TDBank_ATM":

                            $scope.handleClickEvent('', '', '', 'dynamic')

                            openId = '';

                            break;

                        case "icon_guestRelations":

                            $scope.handleClickEvent('', '', '', 'dynamic')

                            openId = '';

                            break;

                        case "event":

                            $scope.handleClickEvent('', '', '', 'event')

                            openId = '';

                            break;

                        default:

                            content.getModuleData("InfoCategory").then(function(response) {

                                response = angular.copy(response);

                                for (var i = 0; i < response.Sections.Section.Data.length; i++) {

                                    if (openId == response.Sections.Section.Data[i]._Id) {

                                        if (!_isClickedFromNearby)

                                            //_isAdaModeEnable == true ? content.setUnica("More Services", "Open", "ADA_Info Categories_" + response.Sections.Section.Data[i]._infoname) : content.setUnica("More Services", "Open", "Info Categories_" + response.Sections.Section.Data[i]._infoname);

                                        getChildData(response.Sections.Section.Data[i]._infoname, response.Sections.Section.Data[i]._isleafnode, openId);

                                        openId = '';

                                        break;

                                    }

                                }



                            });



                            break;



                    }
					if(!_isClickedFromNearby && _isMapClicked == true) {
						_isAdaModeEnable == true ? content.setUnica("More_"+response.Sections.Section.Data[i]._infoname, "", "ADA=On&Module=Interactive Map") : content.setUnica("More_"+response.Sections.Section.Data[i]._infoname, "", "ADA=Off&Module=Interactive Map");			
					}
					_isMapClicked = true;
					_isClickedFromNearby = false;

                }




                $scope.items = arrlst;

                var tmr = setTimeout(function() {



                    clearInterval(tmr);

                    nearbyScroll.refresh();



                }, 600);

            });




        }




        getInfoCategoryData();




        nearbyScroll.refresh();

        if (parVendorID.length > 1) {

            $timeout(function() {

                //showWalkPathByID(parSpaceID);

                $scope.handleClickEvent(parVendorID, parleafCheck, parnodeId, parclickCheck)

            }, 800);




        }

        var imgName = $('nav #MoreSer img').attr("src");

        imgName = imgName.replace('off.', 'on.');

        $('nav #MoreSer img').attr("src", imgName);



    }

]);