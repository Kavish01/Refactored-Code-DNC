angular
.module("IONOS")
.config(['WebSocketProvider', function (WebSocketProvider) {
   WebSocketProvider
  .prefix('')
  .uri('ws://' + ip + ':2013');


 

}]);

