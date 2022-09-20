import { BigNumber, ethers, utils, Wallet, providers } from 'ethers';
import { 
    Route, 
    Fetcher, 
    Token, 
    Trade,
    TokenAmount,
    Percent,
    TradeType
} from 'evmoswap-sdkv2';
import { 
    WEVMOS, 
    EMO, 
} from '../utils/tokens';
import {
    signer,
    provider,
    EvmoSwapRouter,
} from '../utils/config'
import { SWAP_ROUTER_ADDRESS } from '@env';
import { TokenWithContract } from '../types/token';
import { get, makeAutoObservable, reaction, runInAction } from 'mobx';
import { getPrivKeyFromMnemonic } from '../utils/config';
import { MNEMONIC } from '@env';
import { store } from './store';
import { TxType } from '../types/params';
import "@ethersproject/shims";

interface IOptionsSwapTx {
    gasPrice: BigNumber;
    gasLimit: BigNumber;
}

class SwapStore {
    signer: Wallet;
    provider: ethers.providers.JsonRpcProvider;
    swapEvmoscan: string;

    constructor() {
        makeAutoObservable(this);
        this.provider = new providers.JsonRpcProvider("https://eth.bd.evmos.org:8545/");
        this.signer = new Wallet(getPrivKeyFromMnemonic(MNEMONIC), this.provider);
        reaction(
            () => this.signer, 
            (signer) => {

            }
        );
    }

    getTradeAmount = async (token1: Token, token2: Token, amount: any) => {
        const pair = await Fetcher.fetchPairData(token1, token2, this.provider)
        const route = new Route([pair], token1)
        let amountIn = ethers.utils.parseEther(amount.toString());
        const trade = new Trade(route, new TokenAmount(token1, amountIn.toString()), TradeType.EXACT_INPUT)
        const price = trade.executionPrice.toSignificant(6)
        const tradeAmount = (Number(price) * Number(amount)).toString();
        console.log('tradeAmount', tradeAmount);
        return tradeAmount;
    }

    swap = async (amount: string, from: TokenWithContract, to: TokenWithContract) => {
        console.log('in swap', provider);
        const tokenFrom = from.token
        const tokenFromContract = from.contract(provider)
        const tokenTo = to.token

        const walletAddress = await signer.getAddress()
        const amountIn = ethers.utils.parseUnits(amount, tokenFrom.decimals)
        const balance = await tokenFromContract.balanceOf(walletAddress)

        if (!(await WEVMOS.walletHas(signer, amountIn))) {
            throw new Error(
            `Not enough ${tokenFrom.symbol}. Needs ${amountIn}, but balance is ${balance}.`,
            )
            return false;
        }

        const allowance: BigNumber = await tokenFromContract.allowance(
            walletAddress,
            SWAP_ROUTER_ADDRESS,
        )
    
        if (allowance.lt(amountIn)) {
            console.log(`Requesting ${tokenFrom.symbol} approval…`)
        
            const approvalTx = await tokenFromContract
              .connect(signer)
              .approve(
                SWAP_ROUTER_ADDRESS,
                ethers.utils.parseUnits(amountIn.mul(1000).toString(), 18),
              )
        
            approvalTx.wait(3).then(() => {
                console.log('Approval confirmed')
                this.swapTokens(tokenFrom, tokenTo, amount)
                return true;
            })
        } else {
            console.log(
              `Sufficient ${tokenFrom.symbol} allowance, no need for approval.`,
            )
            this.swapTokens(tokenFrom, tokenTo, amount)
            return true;
        }
    }

    swapTokens =  async (token1: Token, token2: Token, amount: any, slippage = "50") => {
        console.log('in swapToken', provider);
        try {
            const pair = await Fetcher.fetchPairData(token1, token2, provider); //creating instances of a pair
            const route = new Route([pair], token1); // a fully specified path from input token to output token
            let amountIn = ethers.utils.parseEther(amount.toString()); //helper function to convert ETH to Wei

            const slippageTolerance = new Percent(slippage, "10000"); // 50 bips, or 0.50% - Slippage tolerance
        
            const trade = new Trade( //information necessary to create a swap transaction.
                route,
                new TokenAmount(token1, amountIn.toString()),
                TradeType.EXACT_INPUT
            );

            const inputAmount = trade.inputAmount.raw;
            const inputAmountHex: string = BigNumber.from(
                inputAmount.toString()
            ).toHexString();

            const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw; // needs to be converted to e.g. hex
            const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
            const path = [token1.address, token2.address]; //An array of token addresses
            const to = signer.address; // should be a checksummed recipient address
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
            const value = trade.inputAmount.raw; // // needs to be converted to e.g. hex
            console.log('value: ' + value);
            
            const optionsSwapTx: IOptionsSwapTx = {
                gasPrice: utils.parseUnits("20.0", "gwei"),
                gasLimit: utils.parseUnits("0.02", "gwei"),
            };

            //Return a copy of transactionRequest, The default implementation calls checkTransaction and resolves to if it is an ENS name, adds gasPrice, nonce, gasLimit and chainId based on the related operations on Signer.
            const rawTxn = await EvmoSwapRouter.populateTransaction.swapExactTokensForTokens(inputAmountHex, amountOutMinHex, path, to, deadline, optionsSwapTx);
        
            //Returns a Promise which resolves to the transaction.
            let sendTxn = await signer.sendTransaction(rawTxn)
            
            //Resolves to the TransactionReceipt once the transaction has been included in the chain for x confirms blocks.
            let reciept = await sendTxn.wait()
    
            //Logs the information about the transaction it has been mined.
            if (reciept) {
                console.log(" - Transaction is mined - " + '\n' 
                + "Transaction Hash:", await sendTxn.hash
                + '\n' + "Block Number: " 
                + await reciept.blockNumber + '\n' 
                + "Navigate to https://evm.evmos.org/tx/" 
                + await sendTxn.hash, "to see your transaction")
                runInAction(() => {
                    this.swapEvmoscan = "https://evm.evmos.org/tx/" + sendTxn.hash;
                    store.userStore.setLastTx(TxType.SWAP);
                })
            } else {
                console.log("Error submitting transaction")
            }
    
        } catch(e) {
            console.log(e)
        }
    }

}

export default SwapStore;