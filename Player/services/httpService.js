angular
    .module("IONOS")
    .service('httpService', ["$http", "$q", "configService",
        function(http, q, configService) {
var dataObj;
            return {



                sendRequest: function(md) { // Make HTTP Request

                    var module = md;
                    var url = "../Data/" + configService.get(module + "ModuleXMLPath");


                    return http.get(url).then(function(response) {
                        var x2js = new X2JS();
                        return x2js.xml_str2json(response.data);
                    }, function() {});
                },
                getContent: function(par) { // Get content and send data to controller
                    var res = q.defer();
                    this.sendRequest(par).then(function(response) {
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