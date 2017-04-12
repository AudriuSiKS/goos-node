import Main from '../src/main';
import AuctionSniperDriver from './auction-sniper-driver';

export default function ApplicationRunner() {
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
