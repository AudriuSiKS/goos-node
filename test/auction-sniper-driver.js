import retry from 'qretry';
import {expect} from 'chai';

var webdriverio = require('webdriverio');

export default function AuctionSniperDriver(timeoutInMillis) {

    const options = { desiredCapabilities: { browserName: 'chrome', host: '127.0.0.1' } };
    let client = webdriverio.remote(options).init();

    this.showsSniperStatus = function (statusText) {
        return retry(() => client.url("http://localhost:3000/").getText('#sniper-status')
            .then(text => expect(text).to.equal(statusText, "Sniper Status")))
            .catch(e => { throw new Error(e.message)})
    }

    this.stop = function() {
        client.end();
        return client.close();
    }
}
