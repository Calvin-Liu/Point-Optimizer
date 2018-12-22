var request = require('request');
var cheerio = require('cheerio');

var customHeaderRequest = request.defaults({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
  }
})

customHeaderRequest.get('https://www.delta.com/flight-search/search-results?cacheKeySuffix=48ec75db-3522-41bc-972d-f2c1b738c7aa', function (error, response, html) {
  console.log("Fetching webpage...");
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    console.log(html);
    var parsedResults = [];
    $('span.priceBfrDec').each(function(i, element)  {
      console.log($(this).prev().text);
    });
  } else {
    console.log("Could not fetch webpage");
  }
});