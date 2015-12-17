angular
    .module("IONOS")
    .directive('didyouknowModule', function() {


        return {
            restrict: 'A',
            controller: 'didYouknowController',
            templateUrl: 'controllers/didYouKnowView.html',


        };
    })
    .controller('didYouknowController', ["$compile", "$sce", "$location", "$interval", "dykService", "$rootScope", "$scope","unica", function($compile, $sce, location, $interval, dykService, $rootScope, scope,unica) {
        // Counter
        var counter = -1,
            dataObj,
            totalLen,
            internalClickThroughAction,
           
            int;
        //on Received Update Ping from Websocket
        $rootScope.$on("receivedUpdatePing", function() {
            counter = 0;
           
            interval.cancel(int);

            dykService.getDidYouKnowContent();
        });



        function handleDYKUnica(par1, par2) { // function to handle Unica 
            unica.setUnica("More_" + par1 + "_" + par2, "", "Did you know");

        }

        function intiDidyouKnow() { // Call service and get response

            var resData = dykService.getContentDYK("didyouknow");
            resData.then(function() {
               
                updateDidYouKnowData();
                
            });
        }

        function updateDidYouKnowData() {
            totalLen = dykService.getTotalLength();
            if (counter >= totalLen - 1) {
                counter = -1;
            }
            counter++;
            var data = dykService.getDataObject(counter);
            scope._AssetType = data._AssetType;
            scope._AssetPath = data._AssetPath;
            scope._Text = data._Text;
            scope._desc = data._desc;
            var obj = (data._InternalClickThroughAction);

        
            if (typeof(scope._AssetPath) !== 'undefined') {
                var imgTag = "<img   class ='bannerImageStyle'  ng-src='../Data/Did You Know/" + scope._AssetPath + "'  ng-click='" + unescape(obj) + "' /> ";
               var ele =  angular.element( document.querySelector( ".didYouKnowModule .colContent") );
                ele.html(imgTag);
                $compile(ele)(scope);//fueling new image tag with click event
              
            }

        }

scope.unescapeFun = function(){
    return  unescape(scope.obj);
};
    

// Click Through Action defined in template;

        scope.OpenVendorDetail = function(str) {
            var data  = str.Metadata;
            var catagry,spd;
            for (var k = 0; k < data.length; k++) {
                var temp=data[k].Value;
                switch(data[k].Key.toUpperCase()){
                    case "CATEGORY":
                    catagry = temp;
                    break;
                    case "VENDORID":
                    spd = temp;
                    break;
                    
                }
                

            }

            location.url("/" + catagry + "/" + spd);            

        };


        scope.OpenCategory = function(str) {
            var ObjectJson = str;

            Finalobj = ObjectJson.Metadata;
            var catagry = "";

            for (var k = 0; k < Finalobj.length; k++) {
                if (Finalobj[k].Key.toUpperCase() == "CATEGORY") {
                    catagry = Finalobj[k].Value;
                }


            }


            location.url("/" + catagry + "/" + " ");
            handleDYKUnica(clickcheck, spd);

        };
        scope.OpenEventCalendar = function(str) {
            var ObjectJson = str;

            Finalobj = ObjectJson.Metadata;
            var catagry = "More";
            var spd = "";
            var leafc = " ";
            var nodeid = " ";
            var clickcheck = "event";
            for (var k = 0; k < Finalobj.length; k++) {
                if (Finalobj[k].Key.toUpperCase() == "VENDORID") {
                    catagry = Finalobj[k].Value;
                }



            }


            location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
            handleDYKUnica(clickcheck, spd);

        };

        scope.OpenATM = function(str) {
            var ObjectJson = str;

            Finalobj = ObjectJson.Metadata;
            var catagry = "More";
            var spd = "";
            var leafc = "";
            var nodeid = "";
            var clickcheck = "dynamic";
            for (var k = 0; k < Finalobj.length; k++) {
                if (Finalobj[k].Key.toUpperCase() == "VENDORID") {
                    catagry = Finalobj[k].Value;
                }


            }

            location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
            handleDYKUnica(clickcheck, spd);

        };

        scope.OpenSafety = function(str) {
            var ObjectJson = str;

            Finalobj = ObjectJson.Metadata;
            var catagry = "More";
            var spd = "";
            var leafc = " ";
            var nodeid = " ";
            var clickcheck = "safety";
            for (var k = 0; k < Finalobj.length; k++) {

                if (Finalobj[k].Key.toUpperCase() == "VENDORID") {
                    spd = Finalobj[k].Value;
                }


            }

            location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
            handleDYKUnica(clickcheck, spd);
        };

        scope.OpenADAinfo = function(str) {
            var ObjectJson = str;

            Finalobj = ObjectJson.Metadata;
            var catagry = "More";
            var spd = "";
            var leafc = "false";
            var nodeid = "411";
            var clickcheck = "other";
            for (var k = 0; k < Finalobj.length; k++) {

                if (Finalobj[k].Key.toUpperCase() == "VENDORID") {
                    spd = Finalobj[k].Value;
                }


            }

            location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
            handleDYKUnica(clickcheck, spd);

        };

        scope.OpenGAB = function(str) {
            var ObjectJson = str;

            Finalobj = ObjectJson.Metadata;
            var catagry = "More";
            var spd = "";
            var leafc = "False";
            var nodeid = "254";
            var clickcheck = "other";
            for (var k = 0; k < Finalobj.length; k++) {

                if (Finalobj[k].Key.toUpperCase() == "VENDORID") {
                    spd = Finalobj[k].Value;
                }


            }

            location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
            handleDYKUnica(clickcheck, spd);

        };

        scope.OpenGRPolicies = function(str) {
            var ObjectJson = str;

            Finalobj = ObjectJson.Metadata;
            var catagry = "More";
            var spd = "";
            var leafc = "False";
            var nodeid = "255";
            var clickcheck = "other";
            for (var k = 0; k < Finalobj.length; k++) {

                if (Finalobj[k].Key.toUpperCase() == "VENDORID") {
                    spd = Finalobj[k].Value;
                }


            }

            location.url("/" + catagry + "/" + spd + "/" + leafc + "/" + nodeid + "/" + clickcheck);
            handleDYKUnica(clickcheck, spd);

        };

        intiDidyouKnow();


    }]);

// JavaScript Document