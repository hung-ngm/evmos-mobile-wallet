export type SendParams = {
    destinationAddress: string;
    amount: string;
    denom: string;
}

export type Fee = {
    amount: string;
    denom: string;
    gas: string;
}

export enum TxType {
    SEND = 'send',
    STAKE = 'stake',
    SWAP = 'swap',
}

