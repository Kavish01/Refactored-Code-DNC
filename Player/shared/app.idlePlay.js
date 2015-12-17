angular
.module("IONOS")
.config(['$idleProvider', '$keepaliveProvider', function ($idleProvider, $keepaliveProvider) {
   $idleProvider.idleDuration(2);
    $idleProvider.warningDuration(5);
    $keepaliveProvider.interval(60); 

}])
.run(function ($rootScope, $idle, $log, $keepalive) {

    $idle.watch();

    $log.debug('app started.');

});

