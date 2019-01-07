let cheerio = require('cheerio');
let delta_html = require('./puppet_request');
const constants = require('../constants/constants');

async function parseMoney() {
	var html = await delta_html.getUrl();
	var $ = cheerio.load(html);
	return new Promise(resolve => {
		resolve($);
	})

}

function getFlightType($) {
	var results = [];
	$('.fiveCabinClass.fareClassBody ').each(function () {
		var td = $(this);
		var cabinInfoHolder = td.children();
		var cabinTitle = cabinInfoHolder.children('div.cabinTitle');
		var flightType = cabinTitle.children()
			.children('span.dl-modal-component-calling-element')
			.children("a.lnkCabinName")
			.children()
			.first().text();

		if (cabinInfoHolder.hasClass('cabinNaPriceHolder')) {
			results.push("Sold Out");
		} else if (cabinInfoHolder.hasClass('cabinDetailsHolder')) {
			results.push(flightType);
		} else {
			console.log('No cabinNaPriceHolder or cabinDetailsHolder class found');
		}
	});

	//console.log(results);
	return new Promise(resolve => {
		resolve(results);
	});
}

function getPrices($) {
	var results = [];
	$('.fiveCabinClass.fareClassBody ').each(function () {
		var td = $(this);
		var cabinInfoHolder = td.children();
		var priceHolder = cabinInfoHolder.children('div.priceHolder');
		var price = priceHolder.children().children('span.priceBfrDec').text();

		if (cabinInfoHolder.hasClass('cabinNaPriceHolder')) {
			results.push("Sold Out");
		} else if (cabinInfoHolder.hasClass('cabinDetailsHolder')) {
			results.push(price);
		} else {
			console.log('No cabinNaPriceHolder or cabinDetailsHolder class found');
		}
	});

	//console.log(results);
	return new Promise(resolve => {
		resolve(results);
	});
}

async function parseMiles() {
	let responseJSON = await delta_html.getUrlMiles();
	var pointsPerFlight = [];
	responseJSON.itinerary.forEach(function (itin) {
		itin.fare.forEach(function (fare) {
			if (!fare.soldOut) {
				pointsPerFlight.push(fare.basePrice.miles.miles);
			} else {
				pointsPerFlight.push("Sold Out");
			}
		})
	});
	//console.log(pointsPerFlight);

	return new Promise(resolve => {
		resolve(pointsPerFlight);
	});
}

async function compareResults() {
	let flightInfo = await parseMoney();
	let flightTypes = await getFlightType(flightInfo);
	let prices = await getPrices(flightInfo);
	//milesInfo does not include BASIC option
	let milesInfo = await parseMiles();
	for (var i = 0; i < flightTypes.length; i += 4) {
		milesInfo.splice(i, 0, "Unavailable");
	}
	const flightOptions = prices.length;
	var results = [];

	for (var i = 0; i < flightOptions; i++) {
		var metaData;
		var tripPrice = parseFloat(prices[i]);
		var tripMiles = parseFloat(milesInfo[i]);
		if (flightTypes[i] === "Sold Out") {
			metaData = {
				airline: 'Delta',
				flightType: "Sold Out",
				price: "Sold Out",
				miles: "Sold Out",
				pointValue: "Sold Out"
			}
		} else if (flightTypes[i] === 'Basic') {
			metaData = {
				airline: 'Delta',
				flightType: flightTypes[i],
				price: tripPrice,
				miles: 'Unavailable',
				pointValue: 'Unavailable'
			}
		} else {
			metaData = {
				airline: 'Delta',
				flightType: flightTypes[i],
				price: tripPrice,
				miles: tripMiles,
				pointValue: tripPrice / tripMiles
			}
		}

		// console.log(tripPrice);
		// console.log(tripMiles);
		results.push(metaData);
	}

	console.log(results);
	// console.log(flightTypes);
	// console.log(prices);
	// console.log(milesInfo);

}

compareResults();




