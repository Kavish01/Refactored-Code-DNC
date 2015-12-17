angular
    .module("IONOS")
    .service('dykService', ["$http", "$q", "configService","httpService",
        function(http, q, configService, dykhttpService) {
        var dataObj;
            return {
                getContentDYK: function() { // Get content and send data to controller
                    var res = q.defer();
                   dykhttpService.sendRequest("didyouknow").then(function(response) {
                        dataObj = response.Sections.Section.Data;
                        if (dataObj.length === undefined) {
                            dataObj = [dataObj];
                        }

                        res.resolve();


                    });
                    return res.promise;
                },
                getTotalLength:function(){
                    return dataObj.length;
                },
                getDataObject:function(num){
                    return dataObj[num];
                }

            };
        }
    ]);