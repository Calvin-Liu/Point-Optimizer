var cheerio = require('cheerio');
let delta_html = require('./puppet_request');

async function parse() {
	var html = await delta_html.getUrl();
	//console.log(html);
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
			price: parseInt(price),
			flightType: flightType
		};

		results.push(metadata);
	});

	console.log(results)
}

parse();


