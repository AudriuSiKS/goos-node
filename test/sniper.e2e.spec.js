require('source-map-support').install();
import Main from '../src/main';
import AuctionSniperDriver from './auction-sniper-driver';
import FakeAuctionServer from './fake-auction-server';

describe("the auction sniper", () => {
    var application = new ApplicationRunner();
    var auction = new FakeAuctionServer("item-54321");

    after("stop the auction server", () => auction.stop());
    after("stop the application", () => application.stop());

    it("joins an auction until auction closes", async () => {
        await auction.startSellingItem();                           //step1
        await application.startBiddingIn(auction);                  //step2
        await auction.hasReceivedJoinRequestFromSniper();           //step3
        await auction.announceClosed();                             //step4
        await application.showsSniperHasLostAuction();              //step5
    });
});

function ApplicationRunner() {
    let driver;

    this.startBiddingIn = function(auction) {
        Main.main(auction.itemId); //1,2
        driver = new AuctionSniperDriver(1000);  //4
        return driver.showsSniperStatus(Main.SniperStatus.Joining); //5
    };

    this.showsSniperHasLostAuction = function () {
        return driver.showsSniperStatus(Main.SniperStatus.Lost); //6
    };

    this.stop = function () {
        driver && driver.stop(); //7
    }
}
