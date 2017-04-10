describe("the auction sniper", () => {
    var application = new ApplicationRunner();
    var auction = new FakeAuctionServer("item-54321");

    after("stop the auction server", () => auction.stop());
    after("stop the application", () => application.stop());

    it("joins an auction until auction closes", () => {
        return auction.startSellingItem()                           //step1
            .then(() => application.startBiddingIn(auction))        //step2
            .then(() => auction.hasReceivedJoinRequestFromSniper()) //step3
            .then(() => auction.announceClosed())                   //step4
            .then(() => application.showsSniperHasLostAuction());   //step5
    });
});
