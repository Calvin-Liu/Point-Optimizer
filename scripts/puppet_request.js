const puppeteer = require('puppeteer');
const axios = require('axios');

const urlMoney = 'https://www.delta.com/flight-search/search?action=findFlights&tripType=ROUND_TRIP&priceSchedule=PRICE&originCity=SJC&destinationCity=LAX&departureDate=01%2F10%2F2019&departureTime=AT&returnDate=01%2F15%2F2019&returnTime=AT&paxCount=1&searchByCabin=true&cabinFareClass=BE&deltaOnlySearch=false&deltaOnly=off&Go=Find%20Flights&meetingEventCode=&refundableFlightsOnly=false&compareAirport=false&awardTravel=false&datesFlexible=undefined&flexAirport=false&paxCounts%5B0%5D=1';
const screenshot_options = {
    path: 'data/screenshot.png',
    fullPage: true
}
const request_config = {
    url: 'https://www.delta.com/shop/rt/search',
    headers: {
        'authority': 'www.delta.com',
        'scheme': 'https',
        'accept': 'application / json',
        'accept-language': 'en - US, en; q = 0.9',
        'user-agent': 'Mozilla / 5.0(Macintosh; Intel Mac OS X 10_14_0) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 71.0.3578.98 Safari / 537.36',
        'origin': 'https://www.delta.com',
        'Content-Type': 'application / json'
    },
    payload: {
        "bestFare": "BE",
        "action": "findFlights",
        "destinationAirportRadius": {
            "unit": "MI",
            "measure": 100
        },
        "deltaOnlySearch": false,
        "meetingEventCode": "",
        "originAirportRadius": {
            "unit": "MI",
            "measure": 100
        },
        "passengers": [
            {
                "type": "ADT",
                "count": 1
            }
        ],
        "searchType": "search",
        "segments": [
            {
                "returnDate": "2019-01-15",
                "departureDate": "2019-01-10",
                "destination": "LAX",
                "origin": "SJC"
            }
        ],
        "shopType": "MILES",
        "tripType": "ROUND_TRIP",
        "priceType": "Award",
        "priceSchedule": "PRICE",
        "awardTravel": false,
        "refundableFlightsOnly": false,
        "nonstopFlightsOnly": false,
        "datesFlexible": false,
        "flexCalendar": false,
        "flexAirport": false,
        "upgradeRequest": false,
        "pageName": "FLIGHT_SEARCH",
        "requestPageNum": "1",
        "selectedSolutions": [
            {
                "sliceIndex": 1
            }
        ],
        "actionType": "search",
        "initialSearchBy": {
            "fareFamily": "BE",
            "meetingEventCode": "",
            "refundable": false,
            "flexAirport": false,
            "flexDate": false
        },
        "vendorDetails": {}
    }
}

async function getUrl(paymentType) {
    return new Promise(function (resolve, reject) {
        puppeteer.launch().then(async browser => {
            try {
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36');
                switch (paymentType) {
                    case 'delta_money':
                        await page.goto(urlMoney);
                        break;
                    case 'delta_miles':
                        //await page.goto(urlMiles);
                        break;
                    default:
                        console.log('No known parameter');
                }
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

async function getUrlMiles() {
    try {
        var res = await axios.post(request_config.url, request_config.payload, request_config.headers);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}

getUrlMiles();

module.exports.getUrl = getUrl;