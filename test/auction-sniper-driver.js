import retry from 'qretry';
import {expect} from 'chai';

var webdriverio = require('webdriverio');

export default function AuctionSniperDriver(timeoutInMillis) {

    const RETRY_INTERVAL = 200;
    const MAX_RETRY_COUNT = Math.floor((timeoutInMillis / RETRY_INTERVAL));

    const options = { desiredCapabilities: { browserName: 'chrome', host: '127.0.0.1' } };
    let client = webdriverio.remote(options).init();

    this.showsSniperStatus = function (statusText) {
        return retry(() => client.url("http://localhost:3000/").getText('#sniper-status')
            .then(text => expect(text).to.equal(statusText, "Sniper Status")), { interval: RETRY_INTERVAL, maxRetry: MAX_RETRY_COUNT })
            .catch(e => { throw new Error(e.message)})
    };

    this.stop = function() {
        client.end();
        return client.close();
    }
}
