import { User } from '../types/user';
import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { ethers } from 'ethers';
import { generateEndpointAccount } from '@tharsis/provider';
import { StargateClient, SigningStargateClient, GasPrice } from '@cosmjs-rn/stargate';
import { DirectSecp256k1HdWallet, OfflineDirectSigner } from "@cosmjs-rn/proto-signing";
import { createMessageSend, createTxMsgDelegate } from '@evmos/transactions';
import { 
    getSender, 
    signTransaction,
    broadcast,
    MAINNET_CHAIN,
} from '@hanchon/evmos-ts-wallet';
import { Wallet } from "@ethersproject/wallet"
import { Validator } from '../types/validator';
import { MNEMONIC } from '@env';
import { TxType } from '../types/params';

class UserStore {
    user: User | null = null;
    sendMintscan : string;
    stakeMintscan: string;
    lastTx: TxType | null = null;

    constructor() {
        // Test only
        this.user = {
            address: "evmos1uquzlv7fgv3lrx2swz43vympd3t3qn33p9n8mr",
            publicKey: "",
            mnemonic: MNEMONIC,
            balance: 0,
        }
        makeAutoObservable(this);

        reaction(
            () => this.user,
            (user) => {

            }
        )
    }

    setUser = (user: User | null) => {
        this.user = user;
    }

    signInWithMnemonic = (mnemonic: any): boolean => {
        try{
            const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
            const subNode = hdNode.derivePath(`m/44'/60'/0'/0/0`);
            const subNodeWallet = new ethers.Wallet(subNode);

            const unencryptedState = {
                address: subNodeWallet.address,
                publicKey: subNodeWallet.publicKey,
                mnemonic: mnemonic,
                balance: 0,
            }
            this.setUser(unencryptedState);
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }

    getAccountDetails = async (user: User) => {
        const endpoint = generateEndpointAccount(user.address);
        const response = await fetch(`https://rest.bd.evmos.org:1317${endpoint}`);
        const data = await response.json();
        console.log(data);
        return data;
    }

    getMessageSend = (chain: any, sender: any, fee: any, memo: any, params: any) => {
        const messageSend = createMessageSend(
            chain,
            sender,
            fee,
            memo,
            params
        );
        return messageSend;
    }

    sendToRecipient = async (user: User, recipient: string, amount: string) => {
        try {
            const wallet = Wallet.fromMnemonic(user.mnemonic);
            const sender = await getSender(wallet, "https://rest.bd.evmos.org:1317");
            const txSend = createMessageSend(
                MAINNET_CHAIN,
                sender,
                {
                    amount: '12000000000000000',
                    denom: 'aevmos',
                    gas: '600000',
                },
                '',
                {
                    destinationAddress: recipient,
                    amount: amount,
                    denom: 'aevmos',
                },
            )
            const resKeplr = await signTransaction(wallet, txSend)
            const broadcastRes = await broadcast(resKeplr, "https://rest.bd.evmos.org:1317")
            console.log(broadcastRes);
            if (broadcastRes.tx_response.code === 0) {
                console.log('Success')
                runInAction(() => {
                    this.sendMintscan = `https://mintscan.io/evmos/txs/${broadcastRes.tx_response.txhash}`;
                    this.lastTx = TxType.SEND;
                })
                return true;
            } else {
                return false;
                console.log('Failed')
            }
            
        } catch (err) {
            console.log('sendToRecipient err', err);
        }
    }

    getSignerFromMnemonic = async (user: User): Promise<OfflineDirectSigner> => {
        const signer = DirectSecp256k1HdWallet.fromMnemonic(user.mnemonic, {
            prefix: 'evmos'
        })
        return signer;
    }

    getUserEvmosBalance = async (user: User) => {
        const rpcEndpoint = 'https://tendermint.bd.evmos.org:26657';
        const client = await StargateClient.connect(rpcEndpoint);
        const balance = await client.getBalance(user.address, 'aevmos');
        const amount = Number(balance.amount)/1000000000000000000;
        runInAction(() => {
            user.balance = amount;
        })
    }

    setLastTx = (tx: TxType) => {
        this.lastTx = tx;
    }

    stake = async (user: User, validator: Validator, amount: string) => {
        try {
            const wallet = Wallet.fromMnemonic(user.mnemonic);
            const sender = await getSender(wallet, "https://rest.bd.evmos.org:1317");
            const txDelegate = createTxMsgDelegate(
                MAINNET_CHAIN,
                sender,
                {
                    amount: '12000000000000000',
                    denom: 'aevmos',
                    gas: '600000',
                },
                '',
                {
                    validatorAddress: validator.operatorAddress,
                    amount: amount,
                    denom: 'aevmos'
                }    
            )
            const resKeplr = await signTransaction(wallet, txDelegate)
            const broadcastRes = await broadcast(resKeplr, "https://rest.bd.evmos.org:1317")
            console.log(broadcastRes);
            if (broadcastRes.tx_response.code === 0) {
                console.log('Success')
                runInAction(() => {
                    this.stakeMintscan = `https://mintscan.io/evmos/txs/${broadcastRes.tx_response.txhash}`;
                    this.lastTx = TxType.STAKE;
                })
                return true;
            } else {
                console.log('Failed')
                return false;
            }
            
        } catch (err) {
            console.log('err stake', err);
            return false;
        }  
    }
}

export default UserStore;