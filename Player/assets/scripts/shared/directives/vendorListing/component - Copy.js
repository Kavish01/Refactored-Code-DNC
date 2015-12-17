angular
    .module("IONOS")
    .directive('vendorModule', ['$compile', "$sce","$interval", "content", "configService",  function(compile, sce, interval, content, configService) 
	{
		// Counter
		 var counter = 0,
		 vendorShowCounter = 0,
		 assetTimer,
		 counterAsset = 0,
		 vendorTimer,
		 assetFlag=false,
		 duration = 15000,
		  element = null,
		 videoUrls = [] ,
		 dataArray = []; // for filling data in array
		 
		 playAssetItem = function(item)
            {
				////console.log(duration + " -------------- ");
                var html = "";
                if(videoUrls.length > 0 && videoUrls[item])
                    {
                        item = videoUrls[item];

                        switch(item._VideoType)
                            {
                                case "Video":
								
                                    html = '<video  src="'+ item._FilePath +'"  poster="assets/imgs/loader.gif" autoplay></video>';

                                    element.html(html);

                                    var videoElement = element.find("video")[0];
									

                                    // Load and Play video
                                    videoElement.load();
                                    videoElement.play();
									
										
                                break;
                                case "Image":
                                    html = '<img  src="'+ item._FilePath +'" />';
									
                                    element.html(html);
                                break
                                case "URL":
                                    html = '<iframe src="'+ item._FilePath +'"></iframe>';
									
                                    element.html(html);
                                break
                            }
                    }

                //element.html(html);
            }
		
		
        return {
            restrict: 'A',
          	template: '<div class = "VendorModule" > <div class="moduleHeaderStyle" ng-show="headerText.length>0" > {{headerText}}</div><div class="vendorContent" ng-show="vendorVisible"> <div  class ="vendorRow repeat-item"  ng-repeat="item in itemArray track by $index"><div class="col1"  ><img ng-show="item._Direction.length>0"id="dyk1" ng-src="assets/imgs/icons/{{item._Direction}}.png" /></div><div class="col2" ><img ng-show="item._AssetPath.length>0" id="dyk1" ng-src="assets/imgs/icons/{{item._AssetPath}}.png" /></div><div class="col1 vendorcol"   style="width:800px">{{item._VendorName}}<p ng-if="item._Description.length>0 && item._Description.length<135">{{item._Description}}</p><marquee ng-if="item._Description.length>=135">{{item._Description}}</marquee></div><div class="col4">{{item._Proximity}}</div></div></div><div ng-show="assetVisible" id="assetComp" class="vendorContainer">Loading...</div></div>',
            scope: {
            load: '='
		  },
           link: function(scope, elem, attrs) {
            getVendorListingContent = function(){
                content.getModuleData("vendor").then(function(response){
					
					scope.vendorVisible = true;
					scope.assetVisible = false;
				    element = angular.element( document.querySelector( '#assetComp' ) );
					
					// If data is blank , return it
					if(response.Sections.hasOwnProperty('AssetSection')){
					
					if(response.Sections.AssetSection.hasOwnProperty('Data'))

                              {

                                     var videoData = response.Sections.AssetSection.Data;

                        

													for(var k = 0 ; k < videoData.length;k++)

														{

															videoUrls.push(videoData[k]);

														}  

							}

}
					
					if(!response.Sections.Section.hasOwnProperty('Data'))
					{
					if(response.Sections.AssetSection.hasOwnProperty('Data'))
					{
					assetFlag=true;
					 showAsset(assetFlag);
					} 
					else
					{
						return;
					}
					}
					
					
					
					
					 if(response.Sections.Section.Data instanceof Array)
					 {
						 totalLen = response.Sections.Section.Data.length;
					 }
					
					 else
					 {
						 totalLen = 1;
					 }
					 
					 
					 // Sot
					 /* var videoData = response.Sections.AssetSection.Data;
                        
                        for(var k = 0 ; k < videoData.length;k++)
                            {
                                videoUrls.push(videoData[k]);
                            }   */
					
					// Header Text
					  scope.headerText = response.Sections.Section._Label;
					 
					 
					 // stores page size
					 var itemPageSize =  parseInt(response.Sections.Section._PageSize);
					 
					 // stores dataobj
					 var dataObj = response.Sections.Section.Data;
					 
					 
				 	 
					 // modify data
					for (var i = 0; i < totalLen*itemPageSize-totalLen; i++) 
					{
						if(totalLen == 1)
						{
							var objarr = [];
							for (var i = 0; i < itemPageSize; i++) 
							{
								objarr.push(dataObj);
							}
							dataObj = null;
							dataObj = angular.copy(objarr);;
						}
						else
						{
							dataObj[totalLen + i] = dataObj[i];
						}
			  		  
					}
					
					
					dataArray = dataObj;
					scope.itemArray = [];
					
					counter = parseInt(itemPageSize);
					
					 scope.itemArray = dataArray.slice(0,itemPageSize);
					 vendorShowCounter = 1;
				
				
				if(totalLen != 1)
				{
					 vendorTimer = interval(function() { updateDidYouKnowData(); }, 15000);
				}
					
					 
					function updateDidYouKnowData()
				    {
						
					   scope.itemArray = dataArray.slice(counter,counter+itemPageSize);
					   
					
					   vendorShowCounter++;
				  
					 if(vendorShowCounter == 4)
					 {
						 vendorShowCounter = 0;
						 counter = counter +itemPageSize;
						 interval.cancel(vendorTimer); 
						 if(response.Sections.hasOwnProperty('AssetSection')){
						 
						 if(response.Sections.AssetSection.hasOwnProperty('Data'))
						 {
						 assetFlag=false;
						 showAsset(assetFlag);
						 }
							}
						 else
						 {
						 
						 }
						 
						 
						 //show asset list
						 
						 						 
						 		 
					 }else
					 {
						 counter = counter +itemPageSize;
					 }
					
					// if counter reaches data length, set it to 0
					 if(counter>=dataArray.length)
					 {
						counter = 0; 
					 }
					 
					
				  }
				  
				   
				  // This shows vendor listing
				  function showVendor()
				  {
					   interval.cancel(assetTimer); 
					   scope.vendorVisible = true;
					  scope.assetVisible = false;
						// start vendor timer
						vendorTimer = interval(function() { updateDidYouKnowData(); }, 15000);
				  }
				  
				  
				   // This shows Assets listing
				   function showAsset(flag)
				  {
					    interval.cancel(assetTimer); 
					    playAssetItem(counterAsset);
					  	scope.vendorVisible = false;
						scope.assetVisible = true; 
						 // add a timer of 15 seconds
						 counterAsset++;
						
						 
						  if(counterAsset >= videoUrls.length)
						  {
							  counterAsset = 0;
						  }
						  
						  if(flag==true)
						  {
						  assetTimer = interval(function() { showAsset(flag); }, 15000);
						  }
						  else
						  {
						 assetTimer = interval(function() { showVendor(); }, 15000);
						}
				  }
				
				  
		
});
		   }
		   getVendorListingContent();
		   scope.$watch("load", function(){
			    interval.cancel(vendorTimer); 
				interval.cancel(assetTimer);
				counter = 0;
		 vendorShowCounter = 0;
		 assetTimer = null;
		 counterAsset = 0;
		 vendorTimer = null;
		 duration = 15000;
		  element = null;
		 videoUrls = [];
		 dataArray = [];
		 assetflag=false;
		 scope.itemArray =[];
				getVendorListingContent();
		   });
				
	  }
		   
        }
    }]);

// JavaScript Document