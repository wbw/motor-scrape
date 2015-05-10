/// <reference path="typings/node/node.d.ts"/>
var scrape = require("scrape-url");
var fs = require("fs");

var startUrl = "http://www.motorcycle-usa.com/11/motorcycles/buyers-guide.aspx";
var bikes = [];

process.on('exit', function () {
	// write result to disk
	fs.writeFileSync("bikes.json", JSON.stringify(bikes, null, "\t"));
	console.log("done");	
});

// Get all brands
scrape(startUrl, ".bikeguidebikeyearinnercontainer a", scrapeBrands);

function scrapeBrands(error, brandElements) {
	if (error) throw error;
	brandElements.forEach(function(brandElement, index) {
		var brandUrl = brandElement.attr("href");

		// Get the year 2015 page for the brand
		scrape(brandUrl, ".bikeguidebikeyearinnercontainer a:contains('2015')", function scrape2015(error, elements) {
			if (error) throw error;
			// Should be only 1 entry
			elements.forEach(function(element, index) {
				var brandModels2015Url = elements[0].attr("href");

				// Get the year 2015 models for the brand
				scrape(brandModels2015Url, ".buyersguidelistviewcolumn1 a", function scrapeModels(error, modelElements) {
					if (error) throw error;
					
					modelElements.forEach(function(modelElement, index) {
						var smallImageUrl = modelElement.children(0).attr("src");
						// Skip models that dont have small image
						if (smallImageUrl != "http://images.motorcycle-usa.com/bg_noimage_100.jpg") {
							var modelUrl = modelElement.attr("href");

							// Get the model specs
							scrape(modelUrl, [".buyersguideimgandcomentcontlftimg img", ".buyersguideleftdatacnt > div", ".buyersguiderightdatacnt > div"], function scrapeModel(error, image, specNames, specValues) {
								if (error) throw error;
								var modelImageUrl = image[0].attr("src");
								var bike = {
									LargeImage: modelImageUrl,
									SmallImage: smallImageUrl
								};
								for(var i=0; i<specNames.length; i++) {
									var specName = specNames[i].text().trim().replace(/ +/g, '').replace(/&/g, 'And').replace(/RakeandTrail/g,'RakeAndTrail');
									var specValue = specValues[i].text().trim();
									bike[specName] = specValue;
								}
								bikes.push(bike);
								console.log("%s-%s", bike.Manufacturer, bike.Model);
							});
						}
					});
				});
			});
		});
	});
}



