angular
    .module("IONOS")
    .service('pagesService', ["$http", "$q", "configService","httpService",
        function(http, q, configService, pagesService) {
        var dataObj;
        var currentFilterValue;
         var filteredValue;

            return {
                getContentPages: function() { // Get content and send data to controller
                    var res = q.defer();
                   pagesService.sendRequest("dynamic").then(function(response) {
                        dataObj = response.Sections.Section;
                        for(i=0;i<dataObj.length;i++)
                            {
                                if(dataObj[i]._ID.toLowerCase() == "dynamic map")
                                        dynamicDataObj=dataObj[i].DNode; 
                            }
                        if (dynamicDataObj.length === undefined) {
                            dynamicDataObj = [dynamicDataObj];
                        }
                        
                        res.resolve();


                    });
                    return res.promise;
                },
                getTotalLength:function(){
                    return dynamicDataObj.length;
                },
                setCurrentFilterValue:function(path){
                    currentFilterValue=path;
                   currentFilterValue = currentFilterValue.substring(1,path.lastIndexOf("/"));
                    

             },
             removeFilteredValue:function(){
                filteredValue = dynamicDataObj.filter(function(val) {

                 ((val._VT.toUpperCase() == "EAT" || val._VT.toUpperCase() == "SHOPS") ? ( val.icon = val._VT ) :  (val.icon = val._VTC  ) );
                    return true;
                 
                    
                });
                        return filteredValue;
             },
                applyFilterValue:function(){
                     filteredValue = dynamicDataObj.filter(function(val) {
                       return ((currentFilterValue.toUpperCase() == "EAT" || currentFilterValue.toUpperCase() == "SHOPS") ? ( val.icon = val._VT , val._VT.toLowerCase() == currentFilterValue.toLowerCase()) :  (val.icon = val._VTC  , val._VTC.toLowerCase() == currentFilterValue.toLowerCase()) );

                    
                });
                        return filteredValue;
                },

                sortFilteredValue:function(){
                     filteredValue.sort(function(a, b) {

                    // Sort by proximity

                    var proximity = parseInt(a._PxT) - parseInt(b._PxT)

                    if (proximity)

                        return proximity;

                    // If there is a tie, sort by year

                    if (a._VN < b._VN)

                        return -1;

                    if (a._VN > b._VN)

                        return 1;

                });
                return filteredValue;
                },
                getDataObject:function(){
                    if(currentFilterValue.length>2)
                    {
                       dynamicDataObj= this.applyFilterValue();
                       //dynamicDataObj=this.sortFilteredValue();
                    }
                    else
                    {
                        dynamicDataObj= this.removeFilteredValue();
                        //dynamicDataObj=this.sortFilteredValue();
                    }
                    
                    return dynamicDataObj;
                }

            };
        }
    ]);