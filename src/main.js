import express from 'express';
var debug = require('debug')('goos');

export const SniperStatus = {Joining: 'Joining', Lost: 'Lost'};

function main(itemId) {
    const app = express();

    app.get('/', function (req, res) {
      res.send(`<html><body></body></html>`);
    });

    var server = app.listen(3000, 'localhost', function () {
      const host = server.address().address;
      const port = server.address().port;

      console.log('Auction Sniper listening at http://%s:%s', host, port);
    });
}

export default main;
