
(function ( $, window, document, undefined ) {

var inst;
var spd;
var setMapContentHeight;
setMapContentHeight = $('#mapContent').height();
    var pluginName = 'DrawPath',
        defaults = {
          data : {},
          selectors : {
            btn : '.hit'
          },
          dimSpace : '0.5',
          noDimSpace : "1",
          events : {
            'selectedSpaceIDEvent' : 'selectedSpace.mapChart',
            'changedSpaceIDEvent' : 'changedSpace.ControlPannel',
            'filterdSpaceIDEvent' : 'filterdSpace.mapChart',
            'clearFilteredSpaceIDEvent' : 'clearFilteredSpace.mapChart'
          },
          cache : {
            'hitTarget' : {}
          },
          active : true
        };


    // The actual plugin constructor
    function mapChart( element, options ) {
        this.element = element;
        this.options = $.extend( true, {}, defaults, options) ;
        this.$el = $(element);
        this.spaceId = this.$el.attr('id');
        this._defaults = defaults;
        this._name = pluginName;

        this.init();

    }

    mapChart.prototype.init = function () {
		 this.options.cache.hitTarget = this.$el.siblings(this.options.selectors.btn);
    this.attachEvents();
	
    };

    mapChart.prototype.attachEvents = function(){
 		var that = this;
		var strId = "g[id="+this.spaceId+"]";
		$(strId).off('tap');
 		$(strId).on('touchstart mousedown', function(e,stat){
			e.stopImmediatePropagation();
			clearSeatFinderWalkPath();
			isPopUpShowing = false;
			hidePopUP();
			walkPathEleArray.splice(0,walkPathEleArray.length);
			angular.element(document.body).scope().resetIdlePlay();
			console.log("event is " + e.type);
			
			if($(this).css("opacity") != 1){
				return;
			}
			
			//console.log(stat);
			if(currentSpaceID != this.id  && jQuery.type( stat ) === "undefined"){
			
		$(window).trigger('sendSpaceID');
			}
		//	$('#'+currentSpaceID).children().lazylinepainter('erase')
		//	$('#'+currentSpaceID).children().lazylinepainter('destroy');
			
			currentSpaceID = this.id;
 			e.preventDefault();
	        that.clickCapture();
	    });

      // Called on Window trigger to animate path
      $(window).on(this.options.events.changedSpaceIDEvent, function(e, vendorID){
          if (that.spaceId === vendorID){
            that.animPath(vendorID);
          }
          else {
              clearSeatFinderWalkPath()
            //that.erasePath(vendorID);
          }
      });

      // Call the Erase Path Function on Windows event
       $(window).on(this.options.events.selectedSpaceIDEvent, function(e, vendorID){
          that.erasePath(vendorID);
      });
       // Filter Space
       $(window).on(this.options.events.filterdSpaceIDEvent, function(e, vendorID){
        var i, len = vendorID.data.length;
        that.options.active = false;
        for (i = 0; i<len; i++){
          if (vendorID.data[i] === that.spaceId){
            that.options.active = true;
            that.makeActive();
          }
        }
        // if not found
        if (that.options.active === false){
          that.makeInactive();
        }
       });

       // Clear Filters
       $(window).on(this.options.events.clearFilteredSpaceIDEvent, function(e){
        that.options.active = true;
        that.options.cache.hitTarget.css({
          opacity: that.options.noDimSpace
        });

       });

 	}
  //Used with Filtered Space
  mapChart.prototype.makeInactive = function(){
    //console.log('inside makeInactive')
    this.options.cache.hitTarget.css({
            opacity: this.options.dimSpace
          });
  };
  mapChart.prototype.makeActive = function(){
    //console.log('inside makeActive');
    this.options.cache.hitTarget.css({
            opacity: this.options.noDimSpace
          });
  };
  // Capture Click
	mapChart.prototype.clickCapture = function() {
		
    if (this.options.active === true){
		currentSpaceID =  this.spaceId;
		$("[stroke-width=6]").removeAttr("stroke");
		$("[stroke-width=6]").removeAttr("stroke-width");
		
		
		
		$("#"+this.spaceId).find("g").children().eq(0).attr("stroke","black");
		$("#"+this.spaceId).find("g").children().eq(0).attr("stroke","black");
		$("#"+this.spaceId).find("g").children().eq(0).attr("stroke-width",6);
		this.handleZoom(this.spaceId);
     
    }
  };

	// Animate Path
  mapChart.prototype.animPath = function(SpaceID){
	  
	 var elem = SpaceID+"_walkPath";
	  this.options.data[elem].strokepath[0].duration= walkPathSpeed;
	var layerToApped =   document.getElementById("walkPathLayer");
	  var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'g'); //Create a path in SVG's namespace
	 
newElement.setAttribute("id",elem);

layerToApped.appendChild(newElement);
	
	  walkPathEleArray.push($("#"+elem));
     	$("#"+elem).lazylinepainter({
  			"svgData": this.options.data,
  			"strokeWidth": 5 ,
  			"strokeColor": "#f15a25",
  			"stroke-dasharray":5,
  			"stroke-miterlimit":10
  		}).lazylinepainter('paint');

      
   };

  //Erase Path
  mapChart.prototype.erasePath = function(vendorID){
      //console.log('in erasePath');

      if (this.spaceId !== vendorID){
          //$('#'+that.spaceId).lazylinepainter('erase');
          clearSeatFinderWalkPath()
      }
  }

	mapChart.prototype.callContPanel = function(){
		  clearSeatFinderWalkPath();
//   $(window).trigger(this.options.events.selectedSpaceIDEvent, this.spaceId);
  };
  mapChart.prototype.getZoomLevel = function(dst){
	  var zm = 2;
	  console.log(dst);
	  if(dst < 199 ){
		  zm = 2;
	  }if(dst >= 200 && dst < 299){
		  zm = 1.8;
	  }
	  else if(dst >= 300 && dst < 499){
		   zm = 1.7;
	  }else if(dst >= 500 && dst < 799){
		   zm = 1.6;
	  }else if(dst >= 800 && dst < 899){
		   zm = 1.5;
	  }
	  else if(dst >= 900 && dst < 999){
		   zm = 1.3;
	  }
	   else if(dst >= 1000 && dst < 1099){
		   zm = 1.2;
	  }
	  else if(dst >= 1100 && dst < 1299){
		   zm = 1;
	  }
	   else if(dst >= 1100){
		   zm = .8;
	  }
	  return zm;
  };
  mapChart.prototype.determineRestingPoint = function(){
      var restingPointX,
          restingPointY;

      restingPointX = ($("#svg-container").width() / 4) * 3;
      restingPointY = ($("#svg-container").height() / 16);
      //console.log("resting point: ", restingPointX, restingPointY);

      return [restingPointX, restingPointY];

  };
  mapChart.prototype.locateYouAreHere = function(n){
	  
	 var defaultZoomLevel = $("#svg-container").panzoom("getMatrix")[0];
	
	 var xps,yps,rpointX,ypointY;
			 xps = ($("#svg-container").width()) /2  ;
     
	  rpointX = xps - ($("#YouAreHere").position().left )  ;
	
	 if(n){
		$("#svg-container").panzoom("pan",rpointX, 1600, { relative: false, animate: true});
	 }else{
		 
		 $("#svg-container").panzoom("pan",-1 *(Math.abs(250/defaultZoomLevel)+1500), 1600, { relative: true, animate: true});
	 }
		//$("#svg-container").panzoom("pan",-1000, 1600, { relative: false, animate: true});
  }

  // handleZoom Functionality
  mapChart.prototype.handleZoom = function(spaceID){
	//  $(window).trigger("filterdSpace.mapChart", [{data: ['_x34_01', 'ServiceElevator']}])
var panVal = 1.5;
 var txtIp = spaceID;
 var youHerePX = $("#YouAreHere").position().left;
	  var youHerePY = $("#YouAreHere").position().top;
 var crtzm =  panZoomEle.panzoom("getMatrix")[0];
  	var targetX = $("#"+txtIp).first().find("g").position().left/crtzm;// Get X value of target
	var targetY = $("#"+txtIp).first().find("g").position().top/crtzm;// Get Y value of target
		var yrherex = youHerePX/crtzm;// Get X value of source
		var yrherey = youHerePY/crtzm;// Get y value of source
		var distance = Math.sqrt(((targetX-yrherex)*(targetX-yrherex))+((targetY-yrherey)*(targetY-yrherey)));
		
		if(targetX>yrherex){
			panVal = 1.9;
 }else{
	 panVal = 1.1;
 }
 
setTimeout(function(){
   var ob = $("#" + txtIp+"_walkPath").lazylinepainter('get');
    var el = ob.paths[0].el;         
 var totalLen = Math.ceil(el.getTotalLength());
   
    var arrLen = [];
    for (var m = 0; m < totalLen; m++) {
        var position = el.getPointAtLength(m);
        arrLen.push({
            x: position.x,
            y: position.y
        });

    }

    var avg = Math.ceil(arrLen.length / 2);
    var spotPoint = arrLen[avg];

 if((spotPoint.x/crtzm) < ($("#YouAreHere").offset().left/crtzm) ){
	  panVal = 1.1;
	 intW = panZoomEle.width()/panVal; 
	 mtr = panZoomEle.panzoom("getMatrix");
var differX = intW - $("#YouAreHere").offset().left;
 xp = parseInt(mtr[4])+ differX;
	  panZoomEle.panzoom("pan",xp, yp, { relative: false, animate: true });
 }
 
},1200);
 
 var zl = this.getZoomLevel(distance);
	//var zl =   Math.min(2,1300/distance);

    panZoomEle.panzoom('zoom', zl, {
        // increment: 2,

        animate: true,
        focal: {
            clientX: $("#YouAreHere").offset() == undefined ? 100 : $("#YouAreHere").offset().left,
            clientY: $("#YouAreHere").offset() == undefined ? 100 : $("#YouAreHere").offset().top
        }

    });

    var intW = panZoomEle.width()/panVal;
var intH = panZoomEle.height()/2;
var mtr = panZoomEle.panzoom("getMatrix");
var differX = intW - $("#YouAreHere").offset().left;
var differY = intH - $("#YouAreHere").offset().top;
var xp = parseInt(mtr[4])+ differX;
var yp = parseInt(mtr[5])+ differY;
panZoomEle.panzoom("pan",xp, yp, { relative: false, animate: true });
	this.animPath(spaceID);	
		
  };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new mapChart( this, options ));
            }
        });
    }

})( jQuery, window, document );
//Get the spaceID
//$(window).on('changedSpace.ControlPannel', function(e, spaceid){ //console.log(e, spaceid)});
//Trigger the path
//$(window).trigger('changedSpace.ControlPannel', 'path_1');
//Trigger Filters
//$(window).trigger("filterdSpace.mapChart", [{data: ['path_2', 'path_3']}])
//Trigger Clear Filters
//$(window).trigger("clearFilteredSpace.mapChart")