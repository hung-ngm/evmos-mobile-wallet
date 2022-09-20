// import { Percent } from 'evmoswap-sdkv2'
import { providers, Wallet, ethers } from 'ethers'
import {
    MNEMONIC,
    SWAP_ROUTER_ADDRESS,
    DEADLINE_IN_MINUTES
} from '@env';
import { SWAP_ROUTER_ABI } from './tokens';

export const getPrivKeyFromMnemonic = (mnemonic: any) => {
    try{
        const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
        const subNode = hdNode.derivePath(`m/44'/60'/0'/0/0`);
        const subNodeWallet = new ethers.Wallet(subNode);
        return subNodeWallet.privateKey;
    } catch(err){
        console.log('Impossible to load wallet. Make sure you entered a valid BIP-39 mnemonic.')
    }
}

export const WALLET_PRIVATE_KEY = getPrivKeyFromMnemonic(MNEMONIC) || '';
export const DEADLINE = Math.floor(
  (Date.now() / 1000) *
    (parseInt(DEADLINE_IN_MINUTES || '30') * 60),
)

export const provider = new providers.JsonRpcProvider("https://eth.bd.evmos.org:8545/");
export const signer = new Wallet(WALLET_PRIVATE_KEY, provider);

export const EvmoSwapRouter = new ethers.Contract(SWAP_ROUTER_ADDRESS, SWAP_ROUTER_ABI, provider);
