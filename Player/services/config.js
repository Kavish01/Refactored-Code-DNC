angular
.module("IONOS")
.factory("configService",["ENVIRONMENT", function(ENVIRONMENT){

	var config = {

			// URLS
			settingModuleXMLPath : 'Settings/Data.xml',
			videoModuleXMLPath : 'Video/Data.xml',
			bannerModuleXMLPath : 'Banner/Data.xml',
			idleModuleXMLPath : 'Idle Play/Data.xml',
			operationModuleXMLPath : 'OperationAlert/Data.xml',
			weatherModuleXMLPath : 'Weather/Data.xml',
			videoModuleInterval : 10000,
			bannerModuleInterval : 15000,
			terminalModuleXMLPath:'Terminal Directions/Data.xml',	
			transparentAdModuleXMLPath:'Transparent Ad/Data.xml',
			didyouknowModuleXMLPath : 'Did You Know/Data.xml',
			rssReaderModuleXMLPath : 'Rss Reader/Data.xml',
			dateModuleXMLPath: 'Date/Data.xml',
			genericModuleXMLPath: 'GenericModules/Data.xml',
			dynamicModuleXMLPath: 'Dynamic Map/Data.xml',
			seatfinderModuleXMLPath: 'GenericModules/Assets/Seatfinder/Seatfinder.xml',
			eventModuleXMLPath: 'Event/Data.xml',
			staticModuleXMLPath: 'Static Map/Data.xml',
			vendorModuleXMLPath:'Vendor Listings/Data.xml',
			InfoCategoryModuleXMLPath:'InfoCategory/Data.xml',
		exitModuleXMLPath:'Transit/Data.xml',

			// DEVELOPMENT
			DEV : {
				
				videoModuleInterval : 20000
				
			}

		}

	return {
		get : function(item){

			if(config[ENVIRONMENT] && config[ENVIRONMENT][item])
				{
					return config[ENVIRONMENT][item];
				}
			else if (config[item])
				{
					return config[item];
				}
			else
				{
					return undefined;
				}

		}
	}


}])
