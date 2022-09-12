import { Coin } from '../types/coin';
import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class PriceStore {
    currentCoin: Coin | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    getLatestPrice = async (coin: Coin) => {
        // Fetch latest price from these endpoint:
        // https://api.coingecko.com/api/v3/simple/price?ids=evmos&vs_currencies=usd

        const latestPrice = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`);
        console.log(latestPrice.data);
        return latestPrice.data[coin.id]['usd'];
    }
}

export default PriceStore;