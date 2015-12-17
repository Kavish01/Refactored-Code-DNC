var myApp = angular.module('IONOS');
myApp.controller('moreController', ['$scope', '$routeParams', '$http', "$sce", "$timeout", "unica", "$compile", "$location", '$rootScope', '$interval','moreService',

    function($scope, $routeParams, $http, $sce, $timeout, unica, compile, $location, $rootScope, interval,moreService) {
        var infoData = [];
                var varlst = [];

        var level = 0;
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
     

function  initMoreService(){

    moreService.setCurrentFilterValue($location.path());
  var res = moreService.callDynamicData("First Aid Office", "Safety & First Aid Office");
   var resd=moreService.callInfoCategoryData();

  // var res = moreService.callEventData();
   res.then(function(){
     displayMoreService();

   });
  }

function displayMoreService(){
    $scope.items = moreService.getDataObject();
   
}

function getInfoCategoryData() {

            var resd=moreService.callInfoCategoryData();
           resd.then(function() {

              infoArray= moreService.getDataObjectInfo();

                for (var i = 0; i < infoArray.length; i++) {



                    if (infoArray[i]._ParentID == '' || infoArray[i]._ParentID == undefined) {

                        if (infoArray[i]._infoname.indexOf('ATM') >= 0) {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_TDBank_ATM",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });



                        } else if (infoArray[i]._infoname.toUpperCase().indexOf('PREMIUM SEATING') >= 0) {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_premiumSeating",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (infoArray[i]._infoname.toUpperCase().indexOf('DEFIBULATOR') >= 0) {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_defibrilator",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (infoArray[i]._infoname.toUpperCase().indexOf('FIRST AID') >= 0) {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_safety",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });



                        } else if (infoArray[i]._infoname.toUpperCase().indexOf('ADA') >= 0) {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_ADA",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (infoArray[i]._infoname.toUpperCase().indexOf('GETTING AROUND') >= 0) {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_gettingAround",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });

                        } else if (infoArray[i]._infoname.toUpperCase().indexOf('WATER FOUNTAIN') >= 0) {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_waterFountain",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });



                        } else {

                            arrlst.push({

                                vendorName: infoArray[i]._infoname,

                                id: "inti",

                                img: "icon_guestRelations",

                                leafCheck: infoArray[i]._isleafnode,

                                nodeId: infoArray[i]._Id,

                                clickCheck: "other"

                            });

                        }




                    } else {



                    }



                    infoData.push(infoArray[i]);




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
          // if(!_isClickedFromNearby && _isMapClicked == true) {
          //   _isAdaModeEnable == true ? content.setUnica("More_"+response.Sections.Section.Data[i]._infoname, "", "ADA=On&Module=Interactive Map") : content.setUnica("More_"+response.Sections.Section.Data[i]._infoname, "", "ADA=Off&Module=Interactive Map");      
          // }
          // _isMapClicked = true;
          // _isClickedFromNearby = false;

                }




                $scope.items = arrlst;

                // var tmr = setTimeout(function() {



                //     clearInterval(tmr);

                //     nearbyScroll.refresh();



                // }, 600);

            });




        }

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

                //nearbyScroll.refresh();

            }, 300);

        }


         function getChildData(infoname, leafCheck, nodeId, lstNode) {




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

            //nearbyScroll.refresh();

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

                //nearbyScroll.refresh();

            }, 300);

        }



    $scope.handleClickEvent = function(msg, leafCheck, nodeId, clickCheck) {

            varlst.splice(0, varlst.length);

            switch (clickCheck) {

                 case "event":

                //     // if (!_isClickedFromNearby)

                //     //     _isAdaModeEnable == true ? content.setUnica("More Services", "Open", "ADA_Events") : content.setUnica("More Services", "Open", "Events");

                        $scope.moreTitle = true;

                        $scope.titleTxt = "EVENTS CALENDAR";

                     moreService.callEventData();
                     $scope.items=moreService.getDataObjectEvent();

                     break;

                case "dynamic":
                       $scope.moreTitle = true;

                        $scope.titleTxt = "ATMs & OTHER SERVICES";
                    // if (!_isClickedFromNearby)

                    //     _isAdaModeEnable == true ? content.setUnica("More Services", "Open", "ADA_ATMs & OTHER SERVICES") : content.setUnica("More Services", "Open", "ATMs & OTHER SERVICES");

                    moreService.callDynamicData("Atm", "ATMs & OTHER SERVICES");

                    break;

                case "safety":
                      $scope.moreTitle = true;

                        $scope.titleTxt = "Safety & First Aid Office";
                    // if (!_isClickedFromNearby)

                    //     _isAdaModeEnable == true ? content.setUnica("More Services", "Open", "ADA_Safety & First Aid Office") : content.setUnica("More Services", "Open", "Safety & First Aid Office");

                    moreService.callDynamicData("First Aid Office", "Safety & First Aid Office");

                    break;

                default:

                    // if (!_isClickedFromNearby)

                    //     _isAdaModeEnable == true ? content.setUnica("More Services", "Open", "ADA_InfoCategory_" + msg) : content.setUnica("More Services", "Open", "InfoCategory_" + msg);

                    getChildData(msg, leafCheck, nodeId);

                    break;

            }
        }

    initMoreService();
    getInfoCategoryData();

    }

]);