const puppeteer = require('puppeteer');
const url = 'https://www.delta.com/flight-search/search-results?cacheKeySuffix=9ee449d8-f7c0-49ba-b32f-975adbc74381';

puppeteer
    .launch()
    .then(function(browser) {
        return browser.newPage();
    })
    .then(function(page) {
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');
        
        return page.goto(url).then(function() {
            page.screenshot({path: '../data/screenshot.png'});
            return page.content();
        });
    })
    .then(function(html) {
        console.log(html);
    })
    .catch(function(err) {
        console.log("Error getting webpage or executing JS on webpage");
    });