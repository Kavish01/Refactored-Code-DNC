angular
    .module("IONOS")

.directive('didyouknowModule', ['$compile', "$sce", "$location", "$interval", "content", "configService", function(compile, sce, location, interval, content, configService) {
    // Counter
    var counter = 0,
	 dataObj, 
        totalLen,
        internalClickThroughAction,
        dataArray = [], // for filling data in array
        int;

    return {
        restrict: 'A',
        templateUrl: 'assets/scripts/view/didYouKnow.html',
        scope: {
            load: '='
        },
        link: function(scope, elem, attrs) {

            handleTopNav = function() {
                $('nav li').each(function(index) {

                    navSrc = $("img", $(this)).attr('src');

                    $("img", $(this)).attr("src", navSrc.replace('on.', 'off.'));
                });
				$("#controlPanelUI").animate({
            height: $("#mapContent").height()
        },400);
            }
           

function updateDidYouKnowData() {
    if (counter >= totalLen - 1) {
                            counter = -1;
                        }
                        counter++;
                        scope._AssetType = dataObj[counter]._AssetType;
                        scope._AssetPath = dataObj[counter]._AssetPath;
                        scope._Text = dataObj[counter]._Text;
                        scope._desc = dataObj[counter]._desc;
                        obj = (dataObj[counter]._InternalClickThroughAction);
                   
                       // scope._InternalClickThroughAction = obj;
					   if(typeof(scope._AssetPath) !== 'undefined')
					   {
                       var imgTag  ="<img   class ='bannerImageStyle'  ng-src='../Data/Did You Know/"+scope._AssetPath+"'  ng-click='" +unescape(obj)+"' /> ";
                 
                     ele =   $(".didYouKnowModule .colContent").html(imgTag)
                      compile(ele)(scope);
                        //.replace('"','***');  // if counter reaches data length, set it to 0
                        //content.setUnica("DidYouKnow" ,"",""); Removed in build .16 changes done for unica logging
					   }
                        
                    }





            getDidYouKnowContent = function() {
                content.getModuleData("didyouknow").then(function(response) {

                    // stores total length
                    if (response.Sections.Section.Data instanceof Array) {
                        totalLen = response.Sections.Section.Data.length;
                    } else {
                        totalLen = 1;
                    }




                    dataObj = response.Sections.Section.Data;
                    if(dataObj.length == undefined){
dataObj = [dataObj];
                    }
                        var ele ;

                    
                      var obj ;
                      var imgTag
                   
                        scope._AssetType = dataObj[counter]._AssetType;
                        scope._AssetPath = dataObj[counter]._AssetPath;
                        scope._Text = dataObj[counter]._Text;
                        scope._desc = dataObj[counter]._desc;
                     obj = (dataObj[counter]._InternalClickThroughAction);
                 imgTag  ="<img   class ='bannerImageStyle'  ng-src='../Data/Did You Know/"+scope._AssetPath+"'  ng-click='" +unescape(obj)+"' /> ";
                 
                     ele =   $(".didYouKnowModule .colContent").html(imgTag)
                     
                        //trish-DYK PROMOTION CLICK THROUGH ACTIONS


                        int = interval(function() {
                            updateDidYouKnowData();
                        }, 15000);

                   

                    compile(ele)(scope);

                });
            }
            getDidYouKnowContent();

            scope.OpenVendorDetail=function(str){
                 var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                    var catagry = "";
                var spd = "";
                for (var k = 0; k < Finalobj.length; k++) {
                    if (Finalobj[k].Key.toLowerCase() == "category") {
                        catagry = Finalobj[k].Value;
                    }
                    if (Finalobj[k].Key.toLowerCase() == "vendorid") {
                        spd = Finalobj[k].Value;
                    }

                }
                handleTopNav();


                location.url("/" + catagry + "/" + spd);
                console.log("here!!");

            }


             scope.OpenCategory = function(str) {
                var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                var catagry = "";

               for (var k = 0; k < Finalobj.length; k++) {
                    if (Finalobj[k].Key.toLowerCase() == "category") {
                        catagry = Finalobj[k].Value;
                    }


                }
                handleTopNav();

                location.url("/" + catagry + "/" + " ");
                console.log("here!!");

            }
           scope.OpenEventCalendar = function(str) {
             var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                var catagry = "More";
                var spd = "";
                var leafc = " ";
                var nodeid = " ";
                var clickcheck = "event";
                 for (var k = 0; k < Finalobj.length; k++) {
                    if (Finalobj[k].Key.toLowerCase() == "vendorid") {
                        catagry = Finalobj[k].Value;
                    }

                    

                }
                handleTopNav();
                console.log("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                console.log("here!!");
				_isAdaModeEnable == true ? content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=On&Module=Did You Know") : content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=Off&Module=Did You Know");

            }

            scope.OpenATM = function(str) {
                var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                var catagry = "More";
                var spd = "";
                var leafc = "";
                var nodeid = "";
                var clickcheck = "dynamic";
                for (var k = 0; k < Finalobj.length; k++) {
                    if (Finalobj[k].Key.toLowerCase() == "vendorid") {
                        catagry = Finalobj[k].Value;
                    }
                    

                }
                handleTopNav();
                console.log("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                console.log("here2!!");
				_isAdaModeEnable == true ? content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=On&Module=Did You Know") : content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=Off&Module=Did You Know");
            }

            scope.OpenSafety = function(str) {
                var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                var catagry = "More";
                var spd = "";
                var leafc = " ";
                var nodeid = " ";
                var clickcheck = "safety";
                for (var k = 0; k < Finalobj.length; k++) {
                    
                    if (Finalobj[k].Key.toLowerCase() == "vendorid") {
                        spd = Finalobj[k].Value;
                    }
                    

                }
                handleTopNav();
                console.log("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                console.log("here3!!");
				_isAdaModeEnable == true ? content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=On&Module=Did You Know") : content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=Off&Module=Did You Know");
            }

            scope.OpenADAinfo = function(str) {
                var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                var catagry = "More";
                var spd = "";
                var leafc = "false";
                var nodeid = "411";
                var clickcheck = "other";
                for (var k = 0; k < Finalobj.length; k++) {
                    
                    if (Finalobj[k].Key.toLowerCase() == "vendorid") {
                        spd = Finalobj[k].Value;
                    }
                    

                }
                handleTopNav();
                console.log("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                console.log("here3!!");
				_isAdaModeEnable == true ? content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=On&Module=Did You Know") : content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=Off&Module=Did You Know");

            }

            scope.OpenGAB = function(str) {
                 var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                var catagry = "More";
                var spd = "";
                var leafc = "False";
                var nodeid = "254";
                var clickcheck = "other";
                for (var k = 0; k < Finalobj.length; k++) {
                    
                    if (Finalobj[k].Key.toLowerCase() == "vendorid") {
                        spd = Finalobj[k].Value;
                    }
                    

                }
                handleTopNav();
                console.log("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                console.log("here4!!");
				_isAdaModeEnable == true ? content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=On&Module=Did You Know") : content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=Off&Module=Did You Know");

            }

            scope.OpenGRPolicies = function(str) {
                var ObjectJson = str;
        
                     Finalobj = ObjectJson.Metadata;
                var catagry = "More";
                var spd = "";
                var leafc = "False";
                var nodeid = "255";
                var clickcheck = "other";
                for (var k = 0; k < Finalobj.length; k++) {
                    
                    if (Finalobj[k].Key.toLowerCase() == "vendorid") {
                        spd = Finalobj[k].Value;
                    }
                    

                }
                handleTopNav();
                console.log("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
                console.log("here4!!");
				_isAdaModeEnable == true ? content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=On&Module=Did You Know") : content.setUnica("More_" +clickcheck+ "_"+spd , "", "ADA=Off&Module=Did You Know");

            }

                //trish-DYK PROMOTION CLICK THROUGH ACTIONS
            scope.$watch("load", function() {
                // //console.log(scope.load, "Item Updated");
                if (scope.load == 'true') {

                    counter = 0;
                    dataArray = [];
                    interval.cancel(int);

                    getDidYouKnowContent();
                }

            }); //End of Watch function
 

        }

    }
}]);

// JavaScript Document
