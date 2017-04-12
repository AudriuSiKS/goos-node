require('source-map-support').install();
import ApplicationRunner from './application-runner';
import FakeAuctionServer from './fake-auction-server';

describe("the auction sniper", () => {
    const application = new ApplicationRunner();
    const auction = new FakeAuctionServer("item-54321");

    afterEach("stop the auction server", () => auction.stop());
    afterEach("stop the application", () => application.stop());

    it("joins an auction until auction closes", async () => {
        await auction.startSellingItem();                           //step1
        await application.startBiddingIn(auction);                  //step2
        await auction.hasReceivedJoinRequestFromSniper();           //step3
        await auction.announceClosed();                             //step4
        await application.showsSniperHasLostAuction();              //step5
    });
});
