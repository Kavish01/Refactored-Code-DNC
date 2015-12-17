
angular
.module('IONOS')
.controller('pagesController', ['$scope', '$http', "$sce", "$timeout", "$routeParams", "pagesService", "$idle", "$location", '$rootScope', '$interval', '$compile',"unica",
    function($scope, $http, $sce, $timeout, $routeParams, pagesService, $idle, $location, $rootScope, interval, compile , unica) {

console.log("in pages controller");

function initPage(){
   var resData = pagesService.getContentPages("dynamic");
            resData.then(function() {
             pagesService.setCurrentFilterValue($location.path());
             
                 
                showList();
            });

}
function showList(){
$scope.resData=pagesService.getDataObject();

}
initPage();


        $scope.callWalkPath = function($event, crspd) {
           


            if (crspd.toLowerCase() == "legends") {

                esclatorWalkPath($rootScope.nearEscId, "Take Escalator down to Level 3. ");
            } else {

                showWalkPathByID(crspd);
                //_isAdaModeEnable == true ? content.setUnica("#DNC#Food & Drinks_" + $scope.foodDrinkDataArray[showIndex]._VN, "View Menu", "ADA=On&Module=Category List") : content.setUnica("#DNC#Food & Drinks_" + $scope.foodDrinkDataArray[showIndex]._VN, "View Menu", "ADA=Off&Module=Category List");
            }
    



        }


// $scope.openRestrauntDetail = function($event, crspd, nearbyIndex) {

//             if ($event != undefined) {

//                 $event.stopPropagation();

//             }

//             $(".vdDesc").hide();
//             $(".adsDivLegends").hide();

//             $('.button').css('display', 'block');

//             if (nearbyIndex != null && nearbyIndex >= 0) {

//                 ind = nearbyIndex;

//             } else {

//                 ind = $("." + crspd).closest("li").index();

//             }


//             $('.nearbyRow').css({

//                 'background-color': '#ffffff',

//                 'border-bottom': '0px'

//             });



//             // $('#thelist li').each(function() {

//             //     var getSrc = $('img', $(this)).eq(1).attr('src').replace('Eat_on.', 'Eat.');

//             //     $('img', $(this)).eq(1).attr('src', getSrc);



//             // });




//             // var $this = $('#thelist li').eq(ind);

//             // var getSrc = $("img", $this).eq(1).attr("src").replace('Eat.', 'Eat_on.');

//             // $("img", $this).eq(1).attr("src", getSrc);



//             $('#thelist li').find('.vendorDetail').css('display', 'none');

//             $('#thelist li').find('.nearbyRow').css('backgroundColor', '#ffffff');

//             // $('#thelist li').eq(ind).find('.nearbyRow').css({

//             //     'background-color': '#f9f9f9',

//             //     'border-bottom': setBorderBottom

//             // });

//             // if ($scope.resData[ind].FMenu != undefined ) {

//             //     $('#thelist li').eq(ind).find('.vendorDetail').css('display', 'block');

//             //     if ($scope.resData[ind].FMenu.length > 4) {

//             //         //$scope.menuDisable=false;

//             //     } else {

//             //         //$scope.menuDisable=true;

//             //         $('.button').css('display', 'none');

//             //     }

//             // }
//             if (crspd != null && crspd.toLowerCase() == "legends") {
//                 $("#vendorDetailContent div").hide();
//                 $(".vdDesc").show();

//                 $('.adsDivLegends').show();
//                 $('.button').css('display', 'none');
//                 $('#thelist li').eq(ind).find('.vendorDetail').css('display', 'block');
//             } else {
//                 $("#vendorDetailContent div").show();
//                 $(".vdDesc").hide();

//                 $('.adsDivLegends').hide();
//             }

//             var tmr = setInterval(function() {

//                 nearbyScroll.refresh();

//                 clearInterval(tmr);

//                 var nitem = "li:nth-child(" + ind + ")";

//                 var parentpos = $("#wrapper").position().top;

//                 var childpos = $("#wrapper li:nth-child(" + (ind + 1) + ")").position().top;

//                 nearbyScroll.scrollTo(0, parentpos - childpos, 800);

//                 //nearbyScroll.scrollToElement(nitem, 500);



//             }, 100);



//         }



 }]);

   