var startIcon = null;
var mapContent = null;
var lst = null;
var currentSpaceID = "";
var MapPath = "";
var _result = "";
var _operationAlertMsg = "";
var _isAdaModeEnable = false;
var today;
var todayUtcDate;
var previousMapPath = "";
var menuScroll = null;
var walkPathSpeed = 2000;
var serviceArray = [];
var _walkPathFileName = null;
var _isNonTouchReload = false;
var _onPageLoad = true;
var _isIdlePlayStarted = false;
var _isClickedFromNearby = false;
var _isNavigationHandled = false;
var _isMapClicked = false;
var getMapContentHeight;
var popUpBox;
var panZoomEle = null;
var popUPXpos = 0;
var popUPYpos = 0;
var targetClip = null;
var walkPathEleArray = [];
var isPopUpShowing = false;
var popUPMsg = [{
    key: "seatmsg",
    msg: "Add your Row and Seat Numbers to recommend directions"
}, {
    key: "escmsg",
    msg: "Take Escalator up to Level"
}];

Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
}



function convertTime(tm) {
    var time = tm;
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var amPM = time.match(/\S(.*)$/)[1]
    var AMPM = amPM.substr(amPM.length - 2, amPM.length);
    if (AMPM.toUpperCase() == "PM" && hours < 12) hours = hours + 12;
    if (AMPM.toUpperCase() == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return sHours + ":" + sMinutes;
}


function getEventData(d) {
    var allDateArray = [];
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    datetoday = mm + '.' + dd + '.' + yyyy;
    var dt = yyyy + '-' + mm + '-' + dd;
    var ind = 0;
    var currentMin = (today.getMinutes().toString().length == 1) ? ("0" + today.getMinutes()) : today.getMinutes();
    var str = dt + "T" + (today.getHours()) + ":" + (currentMin) + ":00Z";
    todayUtcDate = new Date().toUTCString();

    $(d).find("DataNode").each(function() {

        var tm = convertTime($(this).attr("ETime"));
        var endTm = convertTime($(this).attr("EETime"));
        var startDate = $(this).attr("EDate").split(".");
        var startDateStr = (startDate[2] + "-" + startDate[0] + "-" + startDate[1]) + " " + tm;
        var startDate = ((new Date(startDateStr)).toUTCString());

        var endUtcDate = $(this).attr("EEDate").split(".");
        var endStr = (endUtcDate[2] + "-" + endUtcDate[0] + "-" + endUtcDate[1]) + " " + endTm;

        endUtcDate = (new Date(endStr)).toUTCString();



        if (new Date(endUtcDate).addHours(1).valueOf() >= new Date(todayUtcDate).valueOf()) {

            allDateArray.push({
                fileName: $(this).attr("EMIA"),
                Value: (new Date(startDateStr).addHours(-2)).toUTCString()
            });
            //console.log("Date:" + startDateStr + "  UTC: " + (new Date(startDateStr)).toUTCString());
        }
        ind++;
    });


    allDateArray.push({
        fileName: "Default.svg",
        Value: todayUtcDate
    });
    currentDate = allDateArray[allDateArray.length - 1];

    allDateArray.sort(function(a, b) {
        // Sort by proximity
        var value = new Date(a.Value).valueOf() - new Date(b.Value).valueOf()
        if (value)
            return value;
        else
            return 0;
    });

return allDateArray;

}

function loadEventMap() { // load Event Data and Map Confirgured
    if (previousMapPath == MapPath)
        return;

    $.get('../Data/Event/data.xml', function(d) {

        var allDateArray = getEventData(d);

        for (var chk = 0; chk < allDateArray.length; chk++) {
            var startDate = allDateArray[chk].Value;
            if (new Date(todayUtcDate).valueOf() >= new Date(startDate).valueOf()) {
                if (chk == 0) {
                    MapPath = "../Data/Dynamic%20Map/assets/Default.svg";
                } else {
                    MapPath = "../Data/Event/" + allDateArray[chk - 1].fileName
                }
            }
        }
        if (MapPath.toString().indexOf(".svg") == -1) {
            MapPath = "../Data/Dynamic%20Map/assets/Default.svg";
        }

        previousMapPath = MapPath;
        loadSvgMap();

    });

    function loadSvgMap() {
        panZoomEle.load(MapPath, function(responseText, status, req) {
            if (status == "error") {
                MapPath = "../Data/Dynamic%20Map/assets/Default.svg";
                panZoomEle.load(MapPath, function() {
                    handleMapLoad();
                    loadWalkPath();
                    loadDynamicMapXML();
                });

            } else {
                handleMapLoad();
                loadWalkPath();
                loadDynamicMapXML();
            }
        });
    }


    function loadWalkPath() {
        setTimeout(function() {
            $.getJSON("../Data/Dynamic Map/" + _walkPathFileName, function(result) {

                _result = result;
                $('.g-spot').DrawPath({
                    'data': result
                });
            });
        }, 800);
    }

    function loadDynamicMapXML() {
        $.get('../Data/Dynamic Map/data.xml', function(d) {
            $(d).find("DNode").each(function() {
                var sId = $(this).attr("SI");
                var strId = "g[id=" + sId + "]";

                if (panZoomEle.find(strId).prop("class") != undefined && panZoomEle.find(strId).prop("class").animVal != "") {

                    panZoomEle.find(strId).removeAttr("data-val").css("opacity", 1);

                }

            });

            $("[data-val=hd]").remove();
            applyPanZoom();
        });
    }

    function handleMapLoad() {
        startIcon = $("#YouAreHere");
        $("#svg-container  svg>g").attr("class", "hit g-spot");
        $("#mainmap").removeAttr("class");
        startIcon.removeAttr("class");
        panZoomEle.find(".hit").attr("data-val", "hd");
        panZoomEle.find("g[id=Escalator11]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Escalator12]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Escalator13]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Escalator9]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Escalator10]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Elevator3]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Elevator4]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=ServiceElevator]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");

        panZoomEle.find("g[id=Stair1]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Stair2]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Stair3]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");
        panZoomEle.find("g[id=Stair4]").removeAttr("data-val").css("opacity", 1).attr("class", "hit g-spot noDelete");

    }
    // init();
    // //Call json and Initiate the DrawPath



    $(window).on('sendSpaceID', function(e, spaceid) {

        $.get('../Data/Dynamic Map/data.xml', function(d) {
            $(d).find("DNode").each(function() {

                if ($(this).attr("SI") == currentSpaceID) {
                    //  alert($(this).attr("VT"));
                    //alert($("#navigationContainer figcaption:contains('Seats')").index());
                    var buttonSelected;
                    openId = $(this).attr("PI");
                    if ($(this).attr("VT") == "Services" && $(this).attr("VTC") == "Restroom") {
                        buttonSelected = "Restroom";
                    } else if ($(this).attr("VT") == "Services" && $(this).attr("VTC") == "First Aid Office") {
                        openId = "icon_safety";
                        buttonSelected = "MoreSer";
                    } else if ($(this).attr("VT") == "Services" && $(this).attr("VTC") == "ATM" || $(this).attr("VTC") == "Water Fountain") {
                        openId = "icon_TDBank_ATM";
                        buttonSelected = "MoreSer";
                    } else if ($(this).attr("VT") == "Services") {
                        openId = "icon_guestRelations";
                        buttonSelected = "MoreSer";
                    } else {
                        buttonSelected = $(this).attr("VT");
                    }



                    $("#" + buttonSelected).trigger("click");

                }


            })


        });
        //console.log(e, spaceid)
    });

    // $(".hit").on("click touchstart", function(e){
    //   var path = $(this).parent('g').attr('relPath');

    //     $("#svg-container").panzoom('zoom', {
    //       increment: -1.5,
    //       animate: true,
    //       duration: 400,
    //       focal: {
    //         clientX: $("#Layer_2").position().left,
    //         clientY: $("#Layer_2").position().top
    //       }
    //     });
    //   });

    //   //console.log("container size: ", $("#svg-container").width(), $("#svg-container").height("1338"));

}

function sortBy(key, reverse) {

    // Move smaller items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    var moveSmaller = reverse ? 1 : -1;

    // Move larger items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    var moveLarger = reverse ? -1 : 1;

    /**
     * @param  {*} a
     * @param  {*} b
     * @return {Number}
     */
    return function(a, b) {
        if (a[key] < b[key]) {
            return moveSmaller;
        }
        if (a[key] > b[key]) {
            return moveLarger;
        }
        return 0;
    };

}

function showIconByCatagories(arr) {
    // clearSeatFinderWalkPath();
    /*if(currentSpaceID != ""){
    $('#'+currentSpaceID).children('svg').empty();
    }*/

    $("#svg-container .hit").css("opacity", .5);
    $("#svg-container .noDelete").css("opacity", 1);

    for (var i = 0; i < arr.length; i++) {

        $("#svg-container").find("#" + arr[i]._SI).css("opacity", 1);
    }

}

function clearSeatFinderWalkPath() {
    for (var m = 0; m < walkPathEleArray.length; m++) {
        walkPathEleArray[m].lazylinepainter('destroy');
        $(walkPathEleArray[m]).remove();
    }
    walkPathEleArray.splice(0, walkPathEleArray.length);
}

function getZoomLevelSeatFinder(dst) {
    var zm = 2;
    console.log(dst);
    if (dst < 199) {
        zm = 2;
    }
    if (dst >= 200 && dst < 299) {
        zm = 1.8;
    } else if (dst >= 300 && dst < 499) {
        zm = 1.7;
    } else if (dst >= 500 && dst < 799) {
        zm = 1.6;
    } else if (dst >= 800 && dst < 899) {
        zm = 1.3;
    } else if (dst >= 900 && dst < 999) {
        zm = 1.2;
    } else if (dst >= 1000 && dst < 1099) {
        zm = 1.1;
    } else if (dst >= 1100 && dst < 1299) {
        zm = 1;
    } else if (dst >= 1100) {
        zm = .8;
    }
    return zm;
}

function esclatorWalkPath(ele, msg) {
    clearSeatFinderWalkPath();
    var elem = ele + "_walkPath";
    //  this.options.data[SpaceID].strokepath[0].duration= walkPathSpeed;
    var layerToApped = document.getElementById("walkPathLayer");
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'g'); //Create a path in SVG's namespace

    newElement.setAttribute("id", elem);

    layerToApped.appendChild(newElement);

    walkPathEleArray.push($("#" + elem));
    $("#" + elem).lazylinepainter({
        'svgData': _result,
        'strokeWidth': 5,
        'strokeColor': '#f15a25',
        'onComplete': function() {
            $(this).animate({
                'marginTop': 60
            }, 500);
        }
    }).lazylinepainter('paint');

    var panVal = 1.5;


    var crtzm = panZoomEle.panzoom("getMatrix")[0];
    var targetX = $("#" + ele).offset().left / crtzm; // Get X value of target
    var targetY = $("#" + ele).offset().top / crtzm; // Get Y value of target
    var yrherex = startIcon.offset().left / crtzm; // Get X value of source
    var yrherey = startIcon.offset().top / crtzm; // Get y value of source
    var distance = Math.sqrt(((targetX - yrherex) * (targetX - yrherex)) + ((targetY - yrherey) * (targetY - yrherey)));

    if (targetX > yrherex) {
        panVal = 1.9;
    } else {
        panVal = 1.1;
    }
    var zl = getZoomLevelSeatFinder(distance);
    panZoomEle.panzoom('zoom', zl, {
        // increment: 2,

        animate: true,
        focal: {
            clientX: startIcon.offset() == undefined ? 100 : startIcon.offset().left,
            clientY: startIcon.offset() == undefined ? 100 : startIcon.offset().top
        }

    });

    var intW = panZoomEle.width() / panVal;
    var intH = panZoomEle.height() / 2;
    var mtr = panZoomEle.panzoom("getMatrix");
    var differX = intW - startIcon.offset().left;
    var differY = intH - startIcon.offset().top;
    var xp = parseInt(mtr[4]) + differX;
    var yp = parseInt(mtr[5]) + differY;
    panZoomEle.panzoom("pan", xp, yp, {
        relative: false,
        animate: true
    });
    hidePopUP();
    setTimeout(function() {
        var tgt = $("#" + ele).find("g")[0];
        targetClip = $(tgt);
        var px = targetClip.offset().left + targetClip.width() / 2 + 20;
        var py = targetClip.offset().top + targetClip.height() / 2;
        popUPXpos = px;
        popUPYpos = py;
        showPopUp(msg)
    }, 800);
}

function seatfinderShowWalkPath(walkPathArr, isshow) {

    clearSeatFinderWalkPath();
    hidePopUP();
    var arr = walkPathArr.split(",");
    var layerToApped = document.getElementById("walkPathLayer");
    for (var j = 0; j < arr.length; j++) {
        var elem = arr[j] + "_walkPath";

        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'g'); //Create a path in SVG's namespace

        newElement.setAttribute("id", elem);

        layerToApped.appendChild(newElement);
        //console.log(_result[arr[j]].strokepath[0].path);
        var aniPathArr = _result[elem].strokepath[0].path.split(",");
        walkPathEleArray.push($("#" + elem))
        $("#" + elem).lazylinepainter({
            'svgData': _result,
            'strokeWidth': 5,
            "stroke-miterlimit": 10,
            'strokeColor': '#f15a25',
            'onComplete': function() {
                $(this).animate({
                    'marginTop': 60
                }, 500);
            }
        })
    }

    for (var k = 0; k < arr.length; k++) {
        $("#" + arr[k] + "_walkPath").lazylinepainter('paint');
    }
    var ob = $("#" + arr[0] + "_walkPath").lazylinepainter('get');
    var el = ob.paths[0].el;
    var totalLen = Math.ceil(el.getTotalLength());
    console.log(totalLen)
    var popUPPos = [];
    for (var m = 0; m < totalLen; m++) {
        var position = el.getPointAtLength(m);
        popUPPos.push({
            x: position.x,
            y: position.y
        });

    }

    /// Get Direction 
    //var pt = el.getPointAtLength(totalLen);
    var avg = Math.ceil(popUPPos.length / 2);
    var spotPoint = popUPPos[avg];
    var seatOffSet = getSeatPosition(spotPoint.x, spotPoint.y)

    var panVal = 1.5;
    if (seatOffSet.direction.toLowerCase() == "left") {
        panVal = 1.9;
    }
    if (seatOffSet.direction.toLowerCase() == "right") {
        panVal = 1.1;
    }
    if (arr.length > 1) {
        var m1 = $("#" + arr[0] + "_walkPath").lazylinepainter('get').paths[0].el;
        var m2 = $("#" + arr[1] + "_walkPath").lazylinepainter('get').paths[0].el;
        var m1Len = m1.getTotalLength() / 2;
        var m2Len = m2.getTotalLength() / 2;
        var m1pt = m1.getPointAtLength(m1Len).x;
        var m2pt = m2.getPointAtLength(m2Len).x;
        if (Math.abs(m1pt - m2pt) > 100) {
            panVal = 1.5;
        }

    }

    var zl = Math.min(2, 1500 / totalLen);
    console.log(zl + "   ------- ");
    panZoomEle.panzoom('zoom', zl, {
        // increment: 2,

        animate: true,
        focal: {
            clientX: startIcon.offset() == undefined ? 100 : startIcon.offset().left,
            clientY: startIcon.offset() == undefined ? 100 : startIcon.offset().top
        }

    });

    var intW = panZoomEle.width() / panVal;
    var intH = panZoomEle.height() / 2;
    var mtr = panZoomEle.panzoom("getMatrix");
    var differX = intW - startIcon.offset().left;
    var differY = intH - startIcon.offset().top;
    var xp = parseInt(mtr[4]) + differX;
    var yp = parseInt(mtr[5]) + differY;
    panZoomEle.panzoom("pan", xp, yp, {
        relative: false,
        animate: true
    });
    if (isshow) {
        seatWalkPathPopUP(popUPPos);
    }




}

function getSeatPosition(x, y) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rect.setAttribute('cx', x);
    rect.setAttribute('cy', y);
    rect.setAttribute('r', 20);

    rect.setAttribute('fill', '#95B3D7');
    //rect.setAttribute('opacity',0);
    var sbg = $("#svg-container >svg");
    sbg.append(rect);
    var obj = new Object();
    obj.zoomLevel = getWalkPathZoomLevel(rect);;
    obj.direction = getDirection(rect);
    $(rect).remove();
    return obj;
}

function getWalkPathZoomLevel(ele) {
    var targetX = ele.getBBox().x;
    var targetY = ele.getBBox().y;
    var yrherex = $("#YouAreHere").get(0).getBBox().x;
    var yrherey = $("#YouAreHere").get(0).getBBox().y;
    var distance = Math.sqrt(((targetX - yrherex) * (targetX - yrherex)) + ((targetY - yrherey) * (targetY - yrherey)));
    console.log(distance);
    return distance;
}

function getDirection(ele) {
    var direction = "left";
    var targetX = $(ele).offset().left;

    var yrherex = startIcon.offset().left;

    if (yrherex > targetX) {
        direction = "Right";
    }
    return direction;
}

function seatWalkPathPopUP(arr) {
    if (targetClip != null) {
        $("#dummyRect").remove();
        targetClip = null;
    }
    var avg = Math.ceil(arr.length / 2);
    var spotPoint = arr[avg];
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    console.log(rect);
    rect.setAttribute('x', spotPoint.x);
    rect.setAttribute('y', spotPoint.y);
    rect.setAttribute('id', 'dummyRect');
    rect.setAttribute('width', 20);
    rect.setAttribute('height', 20);
    rect.setAttribute('fill', '#95B3D7');
    rect.setAttribute('opacity', 0);
    var sbg = $("#svg-container >svg");
    sbg.append(rect);
    setTimeout(function() {
        var ps = $(rect).offset();
        targetClip = $(rect);
        popUPXpos = ps.left;
        popUPYpos = ps.top;
        showPopUp(PopMsg)

    }, 800);
}

function showPopUp(msg) {
    popUpBox.find('div').html(msg);
    popUpBox.css("left", (popUPXpos - $(".pop_box").width() / 2));
    popUpBox.css("top", (popUPYpos - $(".pop_box").height()));
    popUpBox.css("opacity", 1);
    isPopUpShowing = true;
    popUpBox.show(300);
}

function hidePopUP() {
    popUpBox.hide(300);
}

function defaultMapState() {
    //if(currentSpaceID!='' && currentSpaceID!=undefined && currentSpaceID!=null)
    clearSeatFinderWalkPath();
    $("[stroke-width=6]").removeAttr("stroke");
    $("[stroke-width=6]").removeAttr("stroke-width");
    currentSpaceID = "";
    isPopUpShowing = false;
    hidePopUP();
    panZoomEle.panzoom('zoom', 1.9, {
        // increment: 2,

        animate: true,
        focal: {
            clientX: startIcon.offset() == undefined ? 100 : startIcon.offset().left,
            clientY: startIcon.offset() == undefined ? 100 : startIcon.offset().top
        }

    });
    var intW = panZoomEle.width() / 1.5;
    var intH = panZoomEle.height() / 2;
    var mtr = panZoomEle.panzoom("getMatrix");
    var differX = intW - startIcon.offset().left;
    var differY = intH - startIcon.offset().top;
    var xp = parseInt(mtr[4]) + differX;
    var yp = parseInt(mtr[5]) + differY;
    panZoomEle.panzoom("pan", xp, yp, {
        relative: false,
        animate: true
    });


}

function showWalkPathByID(spd) {

    $("#" + spd).trigger("mousedown", "endofEra");
}

function hideBrokenImg(img) {
    $(img).parent().hide();
}

function hideBrokenEventImg(img) {
    $(img).hide();
}

function attachPanZoomEvent() {
    panZoomEle.on('panzoomstart', function(e, panzoom, event, touches) {
        hidePopUP()

    });
    panZoomEle.on('panzoomend', function(e, panzoom, matrix, changed) {
        if (changed) {
            if (targetClip == null) {
                return;
            }
            var px = targetClip.offset().left + targetClip.width() / 2;
            var py = targetClip.offset().top + targetClip.height() / 2;
            popUPXpos = px;
            popUPYpos = py;


        } else {

            // deal with clicks or taps
        }
        if (isPopUpShowing)
            showPopUp(popUpBox.find("div").html());
        else
            hidePopUP()
    });
    panZoomEle.on('panzoompan', function(e, panzoom, x, y) {

        var wd = mapContent.width() / 2;
        var hd = mapContent.offset().top + (mapContent.height() / 3);
        mtr = panZoomEle.panzoom("getMatrix");
        var gap;
        var xp;
        var yp;
        if (panZoomEle.offset().left > wd) {

            gap = mtr[4] - (panZoomEle.offset().left + panZoomEle.width() / 2);
            xp = (wd + panZoomEle.width() / 2) + gap;
            mtr[4] = Math.min(mtr[4], xp);
            panZoomEle.panzoom("setMatrix", mtr);
        } else if (panZoomEle.offset().left + panZoomEle.width() < wd) {
            console.log(" ----- ");
        }
        if (panZoomEle.offset().top > hd) {
            gap = mtr[5] - (panZoomEle.offset().top + panZoomEle.height() / 2);
            yp = (hd + panZoomEle.height() / 2) + gap;
            mtr[5] = Math.min(mtr[5], yp);
            panZoomEle.panzoom("setMatrix", mtr);
        }

    });
}

function applyPanZoom() {
    var defaultZoomLevel = 1.9;
    getMapContentHeight = mapContent.height();
    panZoomEle.panzoom({
        duration: 400,
        scale: 0.1,
        increment: 0.5,
        minScale: .8,
        maxScale: 2.5,
        easing: "ease-out",
        focal: {
            clientX: startIcon.offset().left,
            clientY: startIcon.offset().top
        }
    });

    // zoom in on the you are here
    panZoomEle.panzoom('zoom', defaultZoomLevel, {
        // increment: 2,
        animate: true,
        silent: true

    });
    var intW = panZoomEle.width() / 1.5;
    var intH = panZoomEle.height() / 2;
    var mtr = panZoomEle.panzoom("getMatrix");
    var differX = intW - startIcon.offset().left;
    var differY = intH - startIcon.offset().top;
    var xp = parseInt(mtr[4]) + differX;
    var yp = parseInt(mtr[5]) + differY;
    panZoomEle.panzoom("pan", xp, yp, {
        relative: false,
        animate: true
    });
    attachPanZoomEvent();

}

$(document).ready(function() {

    popUpBox = $(".pop_box");
    panZoomEle = $("#svg-container");
    MapPath = "../Data/Dynamic%20Map/assets/Default.svg";
    mapContent = $('#mapContent');
    loadEventMap()

});