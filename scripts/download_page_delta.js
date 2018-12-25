var cheerio = require('cheerio');
let delta_html = require('./puppet_request');

async function parse() {
	var html = await delta_html.getUrl();
	//console.log(html);
	var $ = cheerio.load(html);
	var results = [];
	$('.priceBfrDec').each(function () {
		var price = $(this).text();
		var metadata = {
			price: parseInt(price)
		};

		results.push(metadata);
	});

	console.log(results)
}

parse();


