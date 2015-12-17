angular
    .module("IONOS")
    .directive('subwayModule', function() {

        return {
            restrict: 'AE',
            controller: 'subwayController',
            scope: {
                val: '='
                
            },
            templateUrl: 'assets/scripts/view/subwayTemplate.html',
            link: function(scope, $timeout) {

            }

        }
    })
    .controller('subwayController', ['$scope', '$timeout', '$rootScope', 'content', 'configService', '$location', function($scope, $timeout, $rootScope, content, configService, location) {
        $scope.counter = 0;

        $scope.$watch('val', function(newValue, oldValue) {

            if (newValue == oldValue) {
                $scope.myObj = newValue;

                $scope.counter = newValue.number;
            }
        })
        $scope.checkit = function() {

            if ($scope.myObj._TRN == "Orange Line")
                return true;
            else
                return false;
        }

        $scope.component = function(x, v) {  
            return Math.floor(x / v);
        }
        $scope.updateCounter = function() {
            $scope.timestamp = $scope.myObj.num;
        
             
            $scope.timestamp -= 60; // decrement timestamp with one second each second

            console.log($scope.timestamp);   
            $scope.hours  = $scope.component($scope.timestamp,    60 * 60) % 24; // hours
              
            $scope.minutes = $scope.component($scope.timestamp,      60) % 60; // minutes
            $scope.seconds = Math.round($scope.minutes / 60); //seconds
            console.log("$scope.seconds:" + $scope.seconds);
            $scope.myObj.num = $scope.timestamp;   
            $scope.myObj.number = (($scope.hours * 60) + $scope.minutes + $scope.seconds); //numberBlock to be displayed
            console.log("number::" + $scope.myObj.number);


            if ($scope.myObj.num < 1) {          //remove item when num becomes 0

                $scope.$emit("removeItem");

            }


            $timeout($scope.updateCounter, 1000 * 60);
        }
        $timeout($scope.updateCounter, 10);

    }]);
// JavaScript Document