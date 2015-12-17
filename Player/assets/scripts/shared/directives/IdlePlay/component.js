angular
    .module("IONOS")
    .directive('idleModule', ['$compile', "$sce", "$timeout", "$interval", "content", "configService", function (compile, sce, timeout, interval, content, configService) {

        var idleArray = [],
            idleSwitchTimeout,
            idleItem,
            idlelement = null,
            counter = 0,
            ctVideo = 0,
            duration = 15000;
        return {
            restrict: 'A',
            template: '<div id="idleComp" class="module-container"></div>',
            scope: {
                load: "=",
                time: "="
            },
            link: function (scope, elem, attrs) {

                idlelement = angular.element(document.querySelector('#idleComp'));

                scope.$watch("time", function () {
                    if (angular.isUndefined(scope.time) || scope.time == null) return;

                    duration = scope.time;

                });



                idleItem = function (item) {
                    ////console.log(duration + " -------------- ");
                    var html = "";
                    var item_duration = 0;
                    if (idleArray.length > 0 && idleArray[item]) {
                        item = idleArray[item];
                        switch (item._VideoType) {
                            case "Video":
                            case "VideoAd":
                                html = '<div class="idleRow"><video  class="vd" id="' + ctVideo + '"    src="../Data/Idle Play/' + item._AssetPath + '" preload="auto" autoplay></video></div>';
                                ctVideo++;
                                idlelement.append(html);

                                if (idlelement.find("video").length > 1)
                                    var idlevideoElement = idlelement.find("video").eq(1)[0];
                                else
                                    var idlevideoElement = idlelement.find("video").eq(0)[0];
                                // Load and Play video

                                idlevideoElement.load();
                                idlevideoElement.play();
                                //duration = 10000;
                                idlevideoElement.addEventListener("ended", function () {
                                    interval.cancel(idleSwitchTimeout);
                                    idleSwitchTimeout = interval(function () { onIdleTimeout(); }, 100);
                                }, false);
                                break;
                            case "Image":
                                html = '<div class="idleRow"><img class="imgVideo vd" src="../Data/Idle Play/' + item._AssetPath + '" /></div>';
                                item_duration = parseInt(item._Duration);
                                interval.cancel(idleSwitchTimeout);
                                idleSwitchTimeout = interval(function () { onIdleTimeout(); }, item_duration * 1000);
                                idlelement.append(html);
                                // idlelement.html(html);
                                break;
                            case "URL":
                                html = '<div class="idleRow"><iframe class="vd" src="' + item._AssetPath + '" ></iframe></div>';
                                item_duration = parseInt(item._Duration);
                                interval.cancel(idleSwitchTimeout);
                                idleSwitchTimeout = interval(function () { onIdleTimeout(); }, item_duration * 1000);
                                idlelement.append(html);
                                //idlelement.html(html);
                                break;
                        }


                        if ($("#idleComp").children().length > 1) {
                            var firstComp = $(idlelement).children().first();
                            var secondComp = $(idlelement).children().last();

                            firstComp.css("zIndex", 100);
                            secondComp.css("opacity", 0);
                            firstComp.animate({ opacity: 0 }, {
                                duration: 2000, easing: 'swing', complete: function () {
                                    var vdEle = firstComp.find(".vd");
                                    if (vdEle.is('video')) {
                                        var vdElement = document.getElementById(vdEle.attr('id'));
                                        console.log("Video remove" + vdEle.attr('id'));
                                        var jsEle = $(vdElement)[0];

                                        jsEle.ended = null;
                                        $(vdElement)[0].pause();
                                        $(vdElement)[0].src = "";
                                        $(vdElement)[0].load();
                                        $(vdElement)[0].remove();
                                        $(this).remove();
                                    }
                                    else {
                                        $(this).remove();
                                    }
                                }
                            });
                            secondComp.animate({ opacity: 1 }, {
                                duration: 2000, easing: 'swing', complete: function () {
                                    secondComp.css("zIndex", 100);
                                }
                            });
                        }

                    }
                }
                getIdlePlayContent = function () {
                    _isIdlePlayStarted = true;
                    content.getModuleData("idle").then(function (data) {
                        var videoData = data.Sections.Section.Data;
                        if (videoData instanceof Array) {
                            for (var k = 0 ; k < videoData.length; k++) {
                                idleArray.push(videoData[k]);
                            }
                        }
                        else {
                            idleArray[0] = videoData;
                        }

                        // idleSwitchTimeout = timeout(onIdleTimeout, (3000));

                        onIdleTimeout = function () {
                            if (_isNavigationHandled)
                                _isAdaModeEnable == true ? content.setUnica("#DNC#Idle Play", "Activate Player", "ADA=On&Module=Idle Play") : content.setUnica("#DNC#Idle Play", "Activate Player", "ADA=Off&Module=Idle Play");
                            _isIdlePlayStarted = true;
                            _isNavigationHandled = false;
                            // Update media
                            // Start duration timer
                            interval.cancel(idleSwitchTimeout);
                            counter++;
                            // timeout.cancel(idleSwitchTimeout);
                            //  idleSwitchTimeout = timeout(onIdleTimeout, (duration * 1000));
                            // idleSwitchTimeout = interval(function() { onIdleTimeout(); },duration * 1000);

                            if (counter === (idleArray.length)) {
                                counter = 0;
                            }
                            idleItem(counter);

                        }


                    });
                }
                getIdlePlayContent();


                scope.$watch("load", function () {
                    ////console.log(scope.load, "Item Updated");

                    if (scope.load == 'true') {
                        videoData = [];
                        idleArray = [];
                        getIdlePlayContent();
                    }
                    else {
                        ////console.log("value not changed");
                    }
                });
                scope.$on('$idleTimeout', function () {
                    counter = -1;
                    idleSwitchTimeout = interval(function () { onIdleTimeout(); }, (duration - 5) * 1000);
                });

                scope.$on('$keepalive', function () {
                    scope.$apply(function () {
                        if (_isIdlePlayStarted) 
						//content.setUnica("Idle Play", "End Idle Play", "");
                        _isIdlePlayStarted = false;
                        interval.cancel(idleSwitchTimeout);
                        counter = 0;
                        ctVideo = 0;

                        var removeEle = $('.vd');
                        if (removeEle.is('video')) {
                            $(removeEle)[0].pause();
                            $(removeEle)[0].src = "";
                            $(removeEle)[0].load();
                            $(removeEle)[0].remove();
                        }

                        idlelement.html("");
                    });
                })
            }
        }
    }]);
