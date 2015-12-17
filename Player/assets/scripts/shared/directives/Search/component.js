angular
    .module("IONOS")
    .directive('searchModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
		
		
        return {
            restrict: 'A',
            templateUrl: 'assets/scripts/shared/directives/Search/Search.html',
          	template: '',
            scope: {
            load: '='
		  },
           link: function(scope, elem, attrs) 
           {
      			scope.nearbyDataArray=[];
      			 



      			  $(function(){
    var $write = $('#write'),
        shift = false,
        capslock = false;
     
    $('#keyboard li, .delete').click(function(){
    	$('#wrapper').css('opacity','1');
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
         
        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();
             
            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }
         
        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }
         
        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.html();
             
            $write.html(html.substr(0, html.length - 1));

            var search_text = $('#write').val();
		var rg = new RegExp(search_text,'i');
		$('#scroller #thelist li').each(function(){
 			if($.trim($(this).html()).search(rg) == -1) {
				//$(this).parent().css('display', 'none');
 				$(this).css('display', 'none');
				//$(this).next().css('display', 'none');
				//$(this).next().next().css('display', 'none');
			}	
			else {
				$(this).parent().css('display', '');
				$(this).css('display', '');
				$(this).next().css('display', '');
				$(this).next().next().css('display', '');
			}
		});


            return false;
        }
         
        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";
         
        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();
         
        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');
             
            shift = false;
        }
         
        // Add the character
        $write.html($write.html() + character);


        var search_text = $('#write').val();
		var rg = new RegExp(search_text,'i');
		$('#scroller #thelist li').each(function(){
 			if($.trim($(this).html()).search(rg) == -1) {
				//$(this).parent().css('display', 'none');
 				$(this).css('display', 'none');
				//$(this).next().css('display', 'none');
				//$(this).next().next().css('display', 'none');
			}	
			else {
				$(this).parent().css('display', '');
				$(this).css('display', '');
				$(this).next().css('display', '');
				$(this).next().next().css('display', '');
			}
		});


    });
});




	searchHandler=function()
	      			{
						$('#searchWrapper').css("display","block");
	      				$('#searchWrapper').css("z-index","100");	
	      					$('#wrapper').animate({
								     opacity: '0'
								     
								    
								   },
								   {
								     easing: 'swing',
								     duration: 1000,
								     complete: function(){
								     
								    }
								});

	      					if(searchClickedCounter==0)
	      					{

	      					$('#containerSearch').animate({
								     opacity: '1',
								     
								     bottom: '900px'
								   },
								   {
								     easing: 'swing',
								     duration: 2000,
								     complete: function(){
								     $('#searchUI').css('display','none');
								    // $('#containerSearch').css('display','block');
								    // $('#keyboard').css('display','block');
								    }
								});
	      					}
	      					else
	      					{
	      						$('#containerSearch').css('display','block');
								 $('#keyboard').css('display','block');
								 $('#containerSearch').css('bottom','0px');
								 $('#write').html('');
								    $('#containerSearch').animate({
								     opacity: '1',
								     
								     bottom: '900px'
								   },
								   {
								     easing: 'swing',
								     duration: 2000,
								     complete: function(){
								     $('#searchUI').css('display','none');
								    // $('#containerSearch').css('display','block');
								    // $('#keyboard').css('display','block');
								    }
								});

	      					}
	      			};


	      			$('.right-shift').click(function(){

	      				$('#containerSearch').animate({
								     bottom: '300px'
								   },
								   {
								     easing: 'swing',
								     duration: 2000,
								     complete: function(){
								     $('#keyboard').css('display','none');
								    }
								});

	      			});
	      			$('#headerClose').click(function(){

	      				$('#containerSearch').css('display','none');
	      				 $('#searchUI').css('display','block');
	      			});
	      			




	      			scope.$watch('searchClicked',function(){
	      				if(scope.searchClicked==0)
	      					{
	      						//console.log("on page load");
	      					}
	      				else
	      					{
	      						
	      						searchHandler();
	      						searchClickedCounter=1;
	      				//$scope.searchClicked=false;
							}
	      			});





		   }
		}



	    }]);

	// JavaScript Document