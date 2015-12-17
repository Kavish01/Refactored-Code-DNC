angular
.module("IONOS")
.config(['$routeProvider', function ($routeProvider) {
  
    $routeProvider
            .when('/', {
              templateUrl: 'controllers/pagesView.html',
                    controller: "pagesController"
            })
                .when('/seatFinder', {
                    templateUrl: 'assets/scripts/pages/SeatFinder/view.html',
                    controller: "seatFinderController"
                })
                .when('/Eat/:SpaceId', {
                    templateUrl: 'controllers/pagesView.html',
                    controller: "pagesController"
                })
                .when('/Shops/:SpaceId', {
                    templateUrl: 'controllers/pagesView.html',
                    controller: "pagesController"
                })
                .when('/Restroom/:SpaceId', {
                    templateUrl: 'controllers/pagesView.html',
                    controller: "pagesController"
                })
                .when('/search', {
                    templateUrl: 'assets/scripts/pages/Search/view.html',
                    controller: "searchController"
                })
                .when('/Services/:VendorID/:leafCheck/:nodeId/:clickCheck', {
                    templateUrl: 'controllers/moreView.html',
                    controller: "moreController"
                })


            .otherwise({ redirectTo: "/" });


 

}]);

