angular
    .module("IONOS")
    .service('utility', ["$http", "$q", "configService",
        function (http, q, configService) {


            return {


                  htmlPlayerMonitoring: function () {
                    var heartBeatUrl = "";
                    if (ip != '') {
                        heartBeatUrl = "http://services.ionosplatform.com/Services/Tenant/TenantService.svc/PlayerMonitoring?IP=" + ip + "&tenantCode=DNC";
                    }
                    else {
                        ////console.log("no query parameter recieved");
                    }
                    //alert("getting settings file"+url);
                    return http.get(heartBeatUrl).then(function (response) {
                        var x2js = new X2JS(),
                            settingXml = x2js.xml_str2json(response.data);
                        return settingXml;
                    }, function (error) {
                        return q.reject(error.data);
                    });


                },
				 markAttendance: function (O) {
                    http.get("http://localhost:8731/Analytics/ImPresent?time=" + encodeURIComponent(O)).then(function (response) {

                        return "Done";
                    }, function (error) {
                        return q.reject(error.data);
                    });
                }
            }
        }
    ]);
