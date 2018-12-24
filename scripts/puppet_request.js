const puppeteer = require('puppeteer');
const url = 'https://www.delta.com/flight-search/search?action=findFlights&tripType=ROUND_TRIP&priceSchedule=PRICE&originCity=SJC&destinationCity=LAX&departureDate=01%2F10%2F2019&departureTime=AT&returnDate=01%2F15%2F2019&returnTime=AT&paxCount=1&searchByCabin=true&cabinFareClass=BE&deltaOnlySearch=false&deltaOnly=off&Go=Find%20Flights&meetingEventCode=&refundableFlightsOnly=false&compareAirport=false&awardTravel=false&datesFlexible=undefined&flexAirport=false&paxCounts%5B0%5D=1';
const screenshot_options = {
    path: 'data/screenshot.png',
    fullPage: true
}

async function getUrl() {
    return new Promise(function(resolve, reject) {
        puppeteer.launch().then(async browser => {
            try {
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');
                await page.goto(url);
                await page.waitForSelector('span.priceBfrDec');
                await page.screenshot(screenshot_options);
                var html = await page.content(); 
                await browser.close();
                resolve(html);
            } catch(error) {
                console.log("Error getting webpage or executing JS on webpage", error);
            }
        });
    })
    
}
    
module.exports.getUrl = getUrl;

    