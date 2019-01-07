const puppeteer = require('puppeteer');
const request = require("request");

const urlMoney = 'https://www.delta.com/flight-search/search?action=findFlights&tripType=ROUND_TRIP&priceSchedule=PRICE&originCity=SJC&destinationCity=LAX&departureDate=01%2F10%2F2019&departureTime=AT&returnDate=01%2F15%2F2019&returnTime=AT&paxCount=1&searchByCabin=true&cabinFareClass=BE&deltaOnlySearch=false&deltaOnly=off&Go=Find%20Flights&meetingEventCode=&refundableFlightsOnly=false&compareAirport=false&awardTravel=false&datesFlexible=undefined&flexAirport=false&paxCounts%5B0%5D=1';
const screenshot_options = {
    path: 'data/screenshot.png',
    fullPage: true
}
var options = {
    method: 'POST',
    url: 'https://www.delta.com/shop/rt/search',
    headers:
    {
        'Postman-Token': '83c0cea2-88eb-4aa1-afed-fcb09d115c2b',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        origin: 'https://www.delta.com',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        'accept-language': 'en-US,en;q=0.9',
        accept: 'application/json',
        scheme: 'https',
        authority: 'www.delta.com'
    },
    body:
    {
        bestFare: 'BE',
        action: 'findFlights',
        destinationAirportRadius: { unit: 'MI', measure: 100 },
        deltaOnlySearch: false,
        meetingEventCode: '',
        originAirportRadius: { unit: 'MI', measure: 100 },
        passengers: [{ type: 'ADT', count: 1 }],
        searchType: 'search',
        segments:
            [{
                returnDate: '2019-01-15',
                departureDate: '2019-01-10',
                destination: 'LAX',
                origin: 'SJC'
            }],
        shopType: 'MILES',
        tripType: 'ROUND_TRIP',
        priceType: 'Award',
        priceSchedule: 'PRICE',
        awardTravel: false,
        refundableFlightsOnly: false,
        nonstopFlightsOnly: false,
        datesFlexible: false,
        flexCalendar: false,
        flexAirport: false,
        upgradeRequest: false,
        pageName: 'FLIGHT_SEARCH',
        requestPageNum: '1',
        selectedSolutions: [{ sliceIndex: 1 }],
        actionType: 'search',
        initialSearchBy:
        {
            fareFamily: 'BE',
            meetingEventCode: '',
            refundable: false,
            flexAirport: false,
            flexDate: false
        },
        vendorDetails: {}
    },
    json: true
};

function getUrl() {
    return new Promise(function (resolve, reject) {
        puppeteer.launch().then(async browser => {
            try {
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');
                await page.goto(urlMoney);
                await page.waitForSelector('span.priceBfrDec');
                await page.screenshot(screenshot_options);
                var html = await page.content();
                await browser.close();
                resolve(html);
            } catch (error) {
                console.log("Error getting webpage or executing JS on webpage", error);
                return reject;
            }
        });
    })

}

function getUrlMiles() {
    return new Promise(function (resolve, reject) {
        try {
            var res = request(options, function (error, response, body) {
                if (error) throw new Error(error);
                resolve(body);
            });
        } catch (error) {
            console.error(error);
            return reject;
        }
    })
}

module.exports.getUrl = getUrl;
module.exports.getUrlMiles = getUrlMiles;