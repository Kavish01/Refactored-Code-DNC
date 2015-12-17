angular
    .module("IONOS")
    .service('unica', ["$http", "$q", "configService",
        function (http, q, configService) {


            return {
 

                setUnica: function (pt, et, etaf) {
                   _isAdaModeEnable === true ? etaf = "ADA=On&Module=" +etaf : etaf = "ADA=Off&Module="+etaf;
                    http.get("http://localhost:8731/Analytics/Collect?PT=" + encodeURIComponent(pt) + "&ET=" + encodeURIComponent(et) + "&ETAF=" + encodeURIComponent(etaf)).then(function (response) {

                        return "Done";
                    }, function (error) {
                        return q.reject(error.data);
                    });

                }
            };
        }
    ]);
