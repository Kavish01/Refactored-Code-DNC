angular
    .module("IONOS")
    .directive('vendorModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
		 var counter = 0,
		 vendorVideoSwitchTimeout=0,
		 vendorShowCounter = 0,
		 assetTimer,
		 counterAsset = 0;
		 var vendorTimer,
		 assetFlag=false,
		 duration = 15000,
		 element = null,
		 videoUrls = [] ,
		 dataArray = [];
		 onVendorTimeout=null;	
		 vendorPageSize=0;
		 var vendorDataObj=null;
		var  vendorElement='';
		 var vendorDataArr=[];
		 length=0;
		 html='';
		var  dataItem=[];
		var  rightArr=[];
		 var leftArr=[];
		 var c1=0;
		 var c2=0;
		 var index=0;
		 var leftLength=0;
		 var rightLength=0;
		 var loopsize=0;
		
        return {
            restrict: 'A',
          	template: '<div class = "VendorModule clearfix" ><div id="VendorContainer" class="clearfix"></div></div>',
            scope: {
            load: '='
		  },
           link: function(scope, elem, attrs) {
      


			      function hideBrokenImg(img)
			      {
			  		$(img).parent().hide();
				}

            	getVendorListingContent = function(playVendorItem){
	                content.getModuleData("vendor").then(function(response)
	                	{
							response = angular.copy(response);
							//to check whether vendors are available or not		
							if(!response.Sections.Section.hasOwnProperty('Data'))
								{
									//alert("no vendors are available");
									$('#VendorContainer').html("NO Vendors are available");
								}
							else
								{
									// stores dataobj
									vendorDataObj=response.Sections.Section.Data;
									if(vendorDataObj instanceof Array)
										{
											for(var i=0;i<vendorDataObj.length;i++)
												{
													if(vendorDataObj[i]._Direction=="Right")
													{
														rightArr.push(vendorDataObj[i]);
													}
													else if(vendorDataObj[i]._Direction=="Left")
													{
														leftArr.push(vendorDataObj[i])
													}
													else
													{

													}
													
												}
												leftLength=leftArr.length;
												rightLength=rightArr.length;

										}
								    else
										{

											vendorDataArr[0]=vendorDataObj;

										}
								 }
								 if(leftLength>rightLength &&(leftLength/rightLength)%1==0)
								 {
								 	loopsize=leftLength;
								 }
								 else if(rightLength>leftLength &&(rightLength/leftLength)%1==0)
								 {
								 	loopsize=rightLength;
								 }
								 else
								 {
								 	
								 	loopsize=leftLength*rightLength;
								 }

								 if(leftLength>0 && rightLength>0)
								 {
									 for(var l=leftArr.length;l<loopsize;l++)
									 {
									 	
									 	if(index==leftLength)
										 	{
										 		index=0;
										 	}
									 
										 	leftArr[l]=leftArr[index];
										 	index++;

										 
									 	
									 	
									 }

									 index=0;

									 for(var r=rightArr.length;r<loopsize;r++)
									 {
									 	
									 	if(index==rightLength)
										 	{
										 		index=0;
										 	}
									 	
										 
										 	rightArr[r]=rightArr[index];
										 	index++;

										
									 	
									 }
									 
								}

								
								 while(c1 < leftArr.length || c2 < rightArr.length) 
								 {
									        if(c1 < leftArr.length)
									            vendorDataArr.push(leftArr[c1]);
									        c1++;
									        if(c2 < rightArr.length)
									            vendorDataArr.push(rightArr[c2]);
									        c2++;
								}
						
							 playVendorItem(vendorShowCounter);
	});
			   		
			   }

			playVendorItem=function(counter)
			{
				vendorElement=angular.element( document.querySelector( '#VendorContainer' ) );
				
						
						dataItem=vendorDataArr[counter];
						

						if(dataItem._VT.toUpperCase()=="SERVICE")
												{
													switch(dataItem._VTC)
													{
														case "Restroom":
														
														dataItem._VT="restroom";
														
														break;
														case "AED":
														dataItem._VT="icon_defibrilator";
														break;
														case "Transportation":
														dataItem._VT="icon_gettingAround";
														break;
														case "First Aid Office":
														dataItem._VT="icon_safety";
														break;
														case "Water Fountain":
														dataItem._VT="icon_waterFountain";
														break;
														case "ATM":
														dataItem._VT="icon_TDBank_ATM";
														break;
														default:
														dataItem._VT="icon_more";
														break;
													}
												}
									
												scope.imgLen=dataItem._VImage.length;
						if(dataItem._PromoText==undefined)
						{
							dataItem._PromoText='';
						}
						if(dataItem.VL==undefined)
						{
							dataItem.VL='';
						}

						if(dataItem._Direction.toUpperCase()=="RIGHT" )
							{
								html='<div class="Row"><div id="vendorData" class="rightVendorData"><div id="vendorName" >'+dataItem._VendorName.toUpperCase()+'</div><div id="vendorTitle">'+dataItem._PromoText+'</div><div id="vendorDescription">'+dataItem.VL+'</div></div><div  id="rightVendorImage" ><img  id="vendorimages" onerror="hideBrokenImg(this);" src="../Data/Vendor Listings/'+dataItem._VImage+'" /></div><div class="rightvendorLogo" ><img  id="vendorimages" src="assets/imgs/icons/'+dataItem._VT+'_off.svg" /></div><div id="rightVendorDirection"><img id="vendorimages" src="assets/imgs/icons/'+dataItem._Direction+'.svg" /></div></div>';
							}
						else if(dataItem._Direction.toUpperCase()=="LEFT") 
							{
								html='<div class="Row"><div id="leftVendorDirection"><img id="vendorimages" src="assets/imgs/icons/'+dataItem._Direction+'.svg" /></div><div class="leftvendorLogo" ><img  id="vendorimages" src="assets/imgs/icons/'+dataItem._VT+'_off.svg" /></div><div   id="leftVendorImage" ><img  id="vendorimages" onerror="hideBrokenImg(this);"  src="../Data/Vendor Listings/'+dataItem._VImage+'" /></div><div id="vendorData" class="leftVendorData"><div id="vendorName" >'+dataItem._VendorName.toUpperCase()+'</div><div id="vendorTitle">'+dataItem._PromoText+'</div><div id="vendorDescription">'+dataItem.VL+'</div></div></div>';
							
							}
						else
							{
								
								//$('#VendorContainer').html("OOPS! Vendor is not Available right now");
								//console.log("Something wrong with the code")
							}

					  			vendorElement.append(html);
					  			compile(vendorElement)(scope);
						if($("#VendorContainer").children().length>1)
							  {
								  	var leftFirstComp = $(".Row:first-child");
								  	var leftSecondComp = $(".Row:last-child");
								   	
								  	
								 
									leftSecondComp.css("opacity",0);
									leftFirstComp.animate({ opacity: 0 },{duration: 2000,easing: 'swing',complete: function(){
										$(this).remove();
																										
																										}}); 


									leftSecondComp.animate({ opacity: 1 },{duration: 2000,easing: 'swing',complete: function(){
																										//leftFourthComp.css("zIndex", 999 );
																										}});


									
								}

					
				vendorTimer = interval(function() { updateVendorData(); }, 15000);

	
			}

			updateVendorData=function()
			{
				interval.cancel(vendorTimer);
				vendorShowCounter++;
				if(vendorShowCounter==vendorDataArr.length)
					{
						if(vendorDataArr[vendorShowCounter-1]._Direction==vendorDataArr[0]._Direction)
						{
							vendorShowCounter=1;
						}
						else
						{
						vendorShowCounter=0;
						}
						playVendorItem(vendorShowCounter);
					}
				else
					{
						playVendorItem(vendorShowCounter);
					}
				

			}

			   getVendorListingContent(playVendorItem);	


			    scope.$watch("load", function(){

			    if(scope.load.toUpperCase()=='TRUE')
                   {
					    interval.cancel(vendorTimer); 
						interval.cancel(assetTimer);
						rightArr=[];
						leftArr=[];
						index=0;
						leftLength=0;
						rightLength=0;
						loopsize=0;
						c1=0;
						c2=0;
						dataItem=[];
						vendorDataArr=[];
						vendorDataObj=null;
						vendorElement='';
						$(".Row").remove();
						getVendorListingContent(playVendorItem);
					}
				else
					{

					}
		   });


		  }
			   
	        }
	    }]);

	// JavaScript Document