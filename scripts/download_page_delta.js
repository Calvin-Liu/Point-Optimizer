let cheerio = require('cheerio');
let delta_html = require('./puppet_request');

async function parseMoney() {
	var html = await delta_html.getUrl();
	var $ = cheerio.load(html);
	var results = [];
	$('.fiveCabinClass.fareClassBody ').each(function () {
		var metadata;
		var td = $(this);
		var cabinInfoHolder = td.children();
		var cabinTitle = cabinInfoHolder.children('div.cabinTitle');
		var priceHolder = cabinInfoHolder.children('div.priceHolder');
		var flightType = cabinTitle.children()
			.children('span.dl-modal-component-calling-element')
			.children("a.lnkCabinName")
			.children()
			.first().text();
		var price = priceHolder.children().children('span.priceBfrDec').text();

		if (cabinInfoHolder.hasClass('cabinNaPriceHolder')) {
			metadata = {
				airline: 'Delta',
				flightType: flightType,
				price: 'Sold Out'
			};
		} else if (cabinInfoHolder.hasClass('cabinDetailsHolder')) {

			metadata = {
				airline: 'Delta',
				flightType: flightType,
				price: parseInt(price)
			};
		} else {
			console.log('No cabinNaPriceHolder or cabinDetailsHolder class found');
		}

		results.push(metadata);

	});

	console.log(results)
	return results;
}

async function parseMiles() {
	let responseJSON = await delta_html.getUrlMiles();
	var pointsPerFlight = [];
	responseJSON.itinerary.forEach(function (itin) {
		itin.fare.forEach(function (fare) {
			if (!fare.soldOut) {
				pointsPerFlight.push(fare.basePrice.miles.miles);
			} else {
				pointsPerFlight.push('Sold Out');
			}
		})
	});
	console.log(pointsPerFlight);
	return pointsPerFlight;
}

var flightInfo = parseMoney();
var milesInfo = parseMiles();




