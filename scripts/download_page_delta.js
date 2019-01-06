let cheerio = require('cheerio');
let delta_html = require('./puppet_request');

async function parseMoney() {
	var html = await delta_html.getUrl();
	var $ = cheerio.load(html);
	var results = [];
	$('.fiveCabinClass.fareClassBody ').each(function () {
		// var price = $(this).text();


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
	var html = await delta_html.getUrl('delta_miles');
	var $ = cheerio.load(html);
	var results = [];
	$('.tblCntMileBigTxt').each(function () {
		var miles = $(this).text();

	});

}

//var flightInfo = parseMoney();
parseMoney();




