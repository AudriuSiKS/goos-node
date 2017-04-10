import Redis from 'redis';
import Promise from 'promise';
import retry from 'qretry';
import { SniperStatus } from '../src/main';
var debug = require('debug')('goos');

export default function FakeAuctionServer(_itemId) {
    this.itemId = _itemId;

    const subscriber = Redis.createClient();
    const publisher = Redis.createClient();

    let topic;

    let messageCount = 0;
    subscriber.on('message', (channel, message) => {    //Something like SingleMessageListener
        debug("Auction: received a message on channel", channel, message);
        if (channel === topic) messageCount++;
    });

    this.startSellingItem = function() {
        topic = `auction-${this.itemId}`;
        debug("Auction: start selling", topic);
        return subscriber.subscribeAsync(topic);
    }

    this.announceClosed = function() {    //2
        debug("Auction: announcing closed", topic);
        return publisher.publishAsync(topic, SniperStatus.Lost);
    }

    this.hasReceivedJoinRequestFromSniper = function() {    //1
        return retry(() => new Promise(function(resolve, reject) {
            if (!messageCount)
                reject(new Error("Join request was not received"));
            else
                resolve();
        }));
    }

    this.stop = function() {      //3
        return Promise.all([subscriber.quit(), publisher.quit()]);
    }
}
