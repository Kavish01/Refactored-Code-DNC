angular
    .module("IONOS")
    .service('content', ["$http", "$q", "configService",
        function (http, q, configService) {


            return {


                setUnica: function (pt, et, etaf) {
                    //http://localhost:8731/CollectAnalytics/Collect?PT="pt"&ET="et"&ETAF="etaf 
                    http.get("http://localhost:8731/Analytics/Collect?PT=" + encodeURIComponent(pt) + "&ET=" + encodeURIComponent(et) + "&ETAF=" + encodeURIComponent(etaf)).then(function (response) {

                        return "Done";
                    }, function (error) {
                        return q.reject(error.data);
                    });

                },


                getSettingXML: function () {
                    var settingsUrl = "";

                    settingsUrl = "../Data/" + configService.get("settingModuleXMLPath");


                    //alert("getting settings file"+url);
                    return http.get(settingsUrl).then(function (response) {
                        var x2js = new X2JS(),
                            settingXml = x2js.xml_str2json(response.data);
                        return settingXml;
                    }, function (error) {
                        return q.reject(error.data);
                    });


                },

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
  getSeatFinderModuleData: function (url) {
	   return http.get(url).then(function (response) {
                        var x2js = new X2JS();
                        return x2js.xml_str2json(response.data);
                    }, function () { });
  },
                getModuleData: function (module) {
                    var url = "";

                    url = "../Data/" + configService.get(module + "ModuleXMLPath");

                    // date xml to be picked from common folder
                    if (module == "date" || module == "weather") {
                        url = "../Data_Common" + "/" + configService.get(module + "ModuleXMLPath");
                    }
					if( module == "seatfinder"){
						url =  "../Data/GenericModules/Data.xml";
						http.get(url).then(function (response) {
                        var x2js = new X2JS();
                         var path = x2js.xml_str2json(response.data);
						 url = "../Data/GenericModules/" + path.Sections.Section.Data._AssetPath + "/Seatfinder.xml";
						setTimeout(function(){ return http.get(url).then(function (response) {
                        var x2js = new X2JS();
                        return x2js.xml_str2json(response.data);
                    }, function () { });
						},200);
                    }, function () { });
						
					}else{

                    return http.get(url).then(function (response) {
                        var x2js = new X2JS();
                        return x2js.xml_str2json(response.data);
                    }, function () { });
					}

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
