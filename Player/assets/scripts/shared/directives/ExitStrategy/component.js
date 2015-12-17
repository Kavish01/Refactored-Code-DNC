angular
    .module("IONOS")
    .directive('exitElement', function() {

        return {
            restrict: 'AE',
            controller: 'exitController',
            templateUrl: 'assets/scripts/view/exitTemplate.html',
            link: function(scope, elem, attrs) {

                scope.templates = [{

                    url: 'assets/scripts/view/promotionView.html'
                }, {

                    url: 'assets/scripts/view/alertView.html'
                }];
            }
        }


    })
    .controller('exitController', ['$scope', '$rootScope', '$timeout', '$interval', 'content', function($scope, $rootScope, $timeout, interval, content) {

        var comArray = [];
        var railArray = [];
        var promotionArray = [];
        var indx = [];
        var prirityArray = [];
        var section = null;
        var rotationCount = 0;
        var index = 0;
        $scope.isTemplateVisible = false;
        var timeTimer = 0;
        //Display current time
        $scope.timeTimer = function() {
            
            var d = new Date();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0' + minutes : minutes;
            $scope.currentTime = hours + ':' + minutes + ' ' + ampm;


        }


        $timeout($scope.timeTimer, 1000 * 15);
        rotateItem = function() {
            if (section[index].DNode.length < 2) {
                return;
            }
            rotationCount++;
            if (section[index].DNode[rotationCount].hasOwnProperty("_AM")) {
                $scope.leftSrc = section[index].DNode[rotationCount]._AM;
            } else {
                $scope.leftSrc = section[index].DNode[rotationCount]._AssetPath;
            }
            console.log(rotationCount + "  ----  " + (section[index].DNode.length - 1))
            if (rotationCount >= section[index].DNode.length - 1) {
                rotationCount = -1;
            }
            $timeout(rotateItem, 1000 * 60);
        }
        $scope.changeTemplate = function() {
            if (prirityArray.length < 1) {
                return;
            }
            var currenTemplateNumber = Math.max.apply(null, prirityArray);
            var key = currenTemplateNumber.toString();
            index = indx.filter(function(val) {
                return val.key == key
            });
            index = index[0].value;
            if (section[index].DNode.length == undefined) {
                section[index].DNode = [section[index].DNode];
            }
            if (section[index].DNode[0].hasOwnProperty("_AM")) {
                $scope.leftSrc = section[index].DNode[0]._AM;
            } else {
                $scope.leftSrc = section[index].DNode[0]._AssetPath;
            }

            $scope.main = $scope.templates[currenTemplateNumber].url;
            $timeout(rotateItem, 1000 * 60);

        }

        $scope.$on("removeItem", function() {
            var newarray = [];

            for (var k = 0; k < $scope.subArray.length; k++) {
                console.log("k_ti" + $scope.subArray[k].num);
                if (parseInt($scope.subArray[k].num) > 0) {
                    newarray.push($scope.subArray[k]);
                }
            }
            $scope.subArray = newarray;
            console.log(newarray)


        });



        getExitContent = function() {
            content.getModuleData("exit").then(function(response) {
                comArray = [];
                railArray = [];
                promotionArray = [];
                indx = [];
                prirityArray = [];
                section = null;
                rotationCount = 0;
                index = 0;
                timeTimer = 0;
                if (response == undefined) {

                    $timeout(getExitContent, 1000 * 300);
                    return;
                }
                if (response.Sections == undefined) {

                    $timeout(getExitContent, 1000 * 300);
                    return;
                }
                section = response.Sections.Section
                if (section.length == undefined) {
                    section = [section];
                }

                len = section.length;

                for (var j = 0; j < len; j++) {
                    if (section[j]._ID.toLowerCase() == "alert" && section[j]._IsTransitAlert.toLowerCase() == "true") {
                        indx.push({
                            key: "1",
                            value: j
                        });
                        prirityArray.push(1);

                    }

                    if (section[j]._ID.toLowerCase() == "promotion") {
                        indx.push({
                            key: "0",
                            value: j
                        });
                        prirityArray.push(0);



                    }


                    if (section[j]._ID.toLowerCase() == "exitcontent") {
                        comArray = section[j].DNode;

                    }

                }


                var currenTime = new Date();
                var hours = currenTime.getHours();
                var minutes = currenTime.getMinutes();
                var ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                $scope.updatedTime = hours + ':' + minutes + ' ' + ampm;
                console.log($scope.updatedTime);


                var sbArray = comArray.filter(function(el) {
                    if (el._TMN.toLowerCase() == "subway" && el._TRN.toLowerCase() == "orange line") {

                        var newObj = new Date(el._SAT);
                        var currenTime = new Date();
                        var approxObj = new Date(el._EAT);
                        el.eat = approxObj.toLocaleTimeString();

                        var timestamp = new Date(approxObj.getTime() - currenTime.getTime());
                        timestamp /= 1000;
                        el.num = timestamp;
                        var inoutBound;
                        if (el._DM.toLowerCase() == "southbound") {
                            inoutBound = "Inbound to";
                        } else {
                            inoutBound = "Outbound to";
                        }

                        el.leftTxt = inoutBound + " " + el._EL;

                        console.log(el.num);
                        //logic



                        return true;
                    }
                    return false;
                });
                sbArray = sbArray.sort(function(a, b) {
                    return a.num - b.num;
                });
                $scope.subArray = sbArray;


                var railArr = comArray.filter(function(el) {
                    if (el._TMN.toLowerCase() == "commuter rail") {
                        var Obj = new Date(el._SAT);



                        var hours = Obj.getHours();
                        var minutes = Obj.getMinutes();
                        var ampm = hours >= 12 ? 'PM' : 'AM';
                        hours = hours % 12;
                        hours = hours ? hours : 12; // the hour '0' should be '12'
                        minutes = minutes < 10 ? '0' + minutes : minutes;
                        el.satTime = hours + ':' + minutes + ' ' + ampm;
                        console.log("sattime::" + el.satTime);

                        var myObj = new Date(el._EAT);

                        var timestamp = (myObj.getTime() - Obj.getTime());
                        if (timestamp > 300000)
                            el.statuss = "DELAYED";
                        else
                            el.statuss = "ON TIME";

                        console.log("statuss::" + timestamp);

                        el._TRN = el._TRN.replace("Line", "");
                        console.log("trn:: " + el._TRN);



                        return true;
                    }
                    return false;

                });
                railArr = railArr.sort(function(a, b) {
                    console.log(a._SAT);
                    console.log(b._SAT);
                    return new Date(a._SAT).getTime() - new Date(b._SAT).getTime();
                });
                $scope.railArray = railArr;
                $scope.changeTemplate();
                console.log(railArray._TMN);


            })
            $timeout(getExitContent, 1000 * 300);
        }

        

        $rootScope.$on("showExitModule", function() {
            getExitContent();
        });



    }]);
// JavaScript Document