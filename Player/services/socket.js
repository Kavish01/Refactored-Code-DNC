angular
    .module("IONOS")
    .factory("socket", ["$rootScope", "WebSocket", "$interval",
        function($rootScope, WebSocket, interval) {
            var timer;
            var msgString = '';
            var duration = 0;
            WebSocket.onopen(function(event) {
                // BroadCast on Connnect Build
                $rootScope.$broadcast("socketconnectionmade");
            });


            WebSocket.onclose(function(event) {
                console.log("Socket : Connection closed");

            });

            WebSocket.onerror(function(event) {

                console.log("Socket :error");

            });

            WebSocket.onmessage(function(event) {
                console.log("Socket : Message Received", event.data);
                //	_operationAlertMsg =  String(event.data);
                var data = event.data;
                var msg = "";
                if (data.indexOf('501') > -1) { // treatment for the instant message
                    var msgIndex = data.indexOf('501');
                    msgString = data.substring(msgIndex, data.length);
                    var instantMessage = msgString.split('~|');
                    duration = instantMessage[2].split('~');
                    $rootScope.$broadcast("instantMessage", instantMessage[1], duration);
                    return;
                }
                if (data.indexOf('101') > -1) {
                    msg = "showOpAlert";
                }
                if (data.indexOf('102') > -1) {
                    msg = "hideOpAlert";
                }
                if (data.toString().toUpperCase() == "OPALERT") {
                    msg = "operationAlert";
                }
                if (data.trim() === '') {
                    msg = "changedata";

                }
                if (data == '301') {
                    location.reload();
                    return;
                }
                $rootScope.$broadcast(msg);




            });

        }
    ]);