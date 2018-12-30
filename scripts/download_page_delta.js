let cheerio = require('cheerio');
let delta_html = require('./puppet_request');

async function parseMoney() {
	var html = await delta_html.getUrl();
	var $ = cheerio.load(html);
	var results = [];
	$('.priceBfrDec').each(function () {
		var price = $(this).text();
		var flightType = $(this).parent().parent().prev()
			.children()
			.children('span.dl-modal-component-calling-element')
			.children("a.lnkCabinName")
			.children()
			.first().text();

		var metadata = {
			airline: 'Delta',
			flightType: flightType,
			price: parseInt(price)
		};

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

var flightInfo = parseMoney();




