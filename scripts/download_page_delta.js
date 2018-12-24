var request = require('request');
var cheerio = require('cheerio');
let delta_html = require('./puppet_request');

async function parse() {
  var html = await delta_html.getUrl();
  console.log(html);
  //var $ = cherrio.load(html);
  //var parseResults = [];
  //$('span.tblCntBigTxt').each(function(i, element) {
  //  var spanOfDollar = $(this).children('priceBfrDec').text();
  //})
}

parse();


