import { Token } from 'evmoswap-sdkv2';
import { Signer, BigNumberish, Contract, providers } from 'ethers'

export type Coin = {
    id: string;
}

export type TokenWithContract = {
    contract: (provider: providers.JsonRpcProvider) => Contract
    walletHas: (signer: Signer, requiredAmount: BigNumberish) => Promise<boolean>
    token: Token
}