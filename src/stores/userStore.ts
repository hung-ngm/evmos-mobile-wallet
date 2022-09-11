import { User } from '../types/user';
import { makeAutoObservable, runInAction, reaction } from 'mobx';
import { ethers } from 'ethers';
import { store } from './store';

class UserStore {
    user: User | null = null;

    constructor() {
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
                // privateKey: subNodeWallet.privateKey,
                publicKey: subNodeWallet.publicKey
            }
            this.setUser(unencryptedState);
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }
}

export default UserStore;