import express from 'express';
import bluebird from 'bluebird';
import Redis from 'redis';
bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);
var debug = require('debug')('goos');

export const SniperStatus = {Joining: 'Joining', Lost: 'Lost'};

export function main(itemId) {
    const Topic = `auction-${itemId}`;
    const app = express();
    let status = SniperStatus.Joining;

    let publisher = Redis.createClient();

    debug("Sniper: subscribing to auction", Topic);
    publisher.publish(Topic, "Join");

    app.get('/', function (req, res) {
      res.send(`<html><body><span id="sniper-status">${status}</span></body></html>`);
    });

    var server = app.listen(3000, 'localhost', function () {
      const host = server.address().address;
      const port = server.address().port;

      console.log('Auction Sniper listening at http://%s:%s', host, port);
    });
}

export default {
    main,
    SniperStatus
}
