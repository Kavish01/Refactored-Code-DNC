angular
    .module("IONOS")
    .factory('moreService', ["$http", "$q", "configService", "httpService",
        function(http, q, configService, pagesService) {
            var dataObj;
            var dataObjEvent;
            var currentFilterValue;
            var varlst = [];
            var dataObjl;
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


            return {

                callInfoCategoryData:function(){
                     var res = q.defer();
                    pagesService.sendRequest("InfoCategory").then(function(response) {
                        dataObjl = response.Sections.Section.Data;
                         if (dataObjl.length === undefined) {
                            dataObjl = [dataObjl];
                        }

                        res.resolve();


                    });
                    return res.promise;
                },
                callDynamicData: function(inp, titletxt) { // Get content and send data to controller
                    
                    var res = q.defer();
                    pagesService.sendRequest("dynamic").then(function(response) {
                        dataObj = response.Sections.Section;
                        for (i = 0; i < dataObj.length; i++) {
                            if (dataObj[i]._ID.toLowerCase() == "dynamic map")

                                var resData = dataObj[i].DNode;
                            for (var k = 0, len = resData.length; k < len; k++) {


                                // if (resData[k]._VTC.toUpperCase() == inp.toUpperCase()) {

                                //     varlst.push({

                                //         vendorName: resData[k]._VN,

                                //         id: inp,

                                //         proximity: resData[k]._PxT,

                                //         nodeXml: resData[k]

                                //     });



                                // } else
                                // if (resData[k]._VTC.toUpperCase() == 'WATER FOUNTAIN' || inp.toUpperCase() == 'ATM') {


                                //     varlst.push({

                                //         vendorName: resData[k]._VN,

                                //         id: 'Water Fountain',

                                //         proximity: resData[k]._PxT,

                                //         nodeXml: resData[k]

                                //     });



                                // } else if (resData[k]._VTC.toUpperCase() == 'PUBLIC RELATIONS OFFICE' && inp.toUpperCase() == 'ATM') {

                                //     varlst.push({

                                //         vendorName: resData[k]._VN,

                                //         id: 'Public Relations Office',

                                //         proximity: resData[k]._PxT,

                                //         nodeXml: resData[k]

                                //     });



                                // }
                            }
                        }

                        dynamicDataObj = resData;

                        if (dynamicDataObj.length === undefined) {
                            dynamicDataObj = [dynamicDataObj];
                        }

                        res.resolve();


                    });
                    return res.promise;
                },


                callEventData: function() {

                    var res = q.defer();
                    pagesService.sendRequest("event").then(function(response) {
                        dataObjEvent = response.Sections.Section.DataNode;


                        if (dataObjEvent != undefined) {

                            if (dataObjEvent instanceof Array) {

                                for (var i = 0; i < dataObjEvent.length; i++) {

                                    varlst.push({

                                        vendorName: dataObjEvent[i]._EName,

                                        id: "event",

                                        nodeXml: dataObjEvent[i]

                                    });

                                }

                            } else {

                                varlst.push({

                                    vendorName: dataObjEvent._EName,

                                    id: "event",

                                    nodeXml: dataObjEvent

                                });

                            }

                        }


                        dataObjEvent=varlst;

                        if (dataObjEvent.length === undefined) {
                            dataObjEvent = [dataObjEvent];
                        }

                        res.resolve();


                    });
                    return res.promise;

                },

                getTotalLength: function() {
                    return dynamicDataObj.length;
                },
                setCurrentFilterValue: function(path) {
                    currentFilterValue = path;
                    currentFilterValue = currentFilterValue.replace(/\//g, "");
                    currentFilterValue = currentFilterValue.replace(/\s\s+/g, '');




                },


                applyFilterValue: function() {
                    var filteredValue = dynamicDataObj.filter(function(val) {
                        return true;
                        // return (val._VT.toUpperCase() == "SERVICES" && val._VTC.toLowerCase() != "restroom" );


                    });
                    return filteredValue;
                },

                getDataObjectInfo:function(){
                    return dataObjl;
                },
                getDataObjectEvent:function(){
                    return dataObjEvent;
                },

                getDataObject: function() {

                    var filteredDataObj = this.applyFilterValue();
                    dynamicDataObj = filteredDataObj.concat(arrlst);
                    dynamicDataObjl= dynamicDataObj.concat(dataObjl);

                    return dynamicDataObjl;
                }

            };
        }
    ]);