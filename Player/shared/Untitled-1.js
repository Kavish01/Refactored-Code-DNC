angular
    .module("IONOS")
    .service('didYouknowService', ["$http", "$q", "configService",
        function(http, q, configService) {


            return {



                getDidYouKnowData: function(md) {

                    var module = md;
                    var url = "../Data/" + configService.get(module + "ModuleXMLPath");


                    return http.get(url).then(function(response) {
                        var x2js = new X2JS();
                        return x2js.xml_str2json(response.data);
                    }, function() {});
                }
                getDidYouKnowContent = function() {
                    this.getDidYouKnowData("didyouknow").then(function(response) {

                        // stores total length
                        if (response.Sections.Section.Data instanceof Array) {
                            totalLen = response.Sections.Section.Data.length;
                        } else {
                            totalLen = 1;
                        }




                        dataObj = response.Sections.Section.Data;
                        if (dataObj.length == undefined) {
                            dataObj = [dataObj];
                        }
                        var ele;


                        var obj;
                        var imgTag

                        scope._AssetType = dataObj[counter]._AssetType;
                        scope._AssetPath = dataObj[counter]._AssetPath;
                        scope._Text = dataObj[counter]._Text;
                        scope._desc = dataObj[counter]._desc;
                        obj = (dataObj[counter]._InternalClickThroughAction);
                        imgTag = "<img   class ='bannerImageStyle'  ng-src='../Data/Did You Know/" + scope._AssetPath + "'  ng-click='" + unescape(obj) + "' /> ";

                        ele = $(".didYouKnowModule .colContent").html(imgTag)

                        //trish-DYK PROMOTION CLICK THROUGH ACTIONS


                        int = interval(function() {
                            updateDidYouKnowData();
                        }, 15000);



                        compile(ele)(scope);

                    });
                }
                getDidYouKnowContent();

            }
        }
    }]);