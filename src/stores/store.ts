import { createContext, useContext } from 'react';
import UserStore from './userStore';
import PriceStore from './priceStore';
import ValidatorStore from './validatorStore';
import SwapStore from './swapStore';

interface Store {
    userStore: UserStore;
    priceStore: PriceStore;
    validatorStore: ValidatorStore;
    swapStore: SwapStore;
}

export const store: Store = {
    userStore: new UserStore(),
    priceStore: new PriceStore(),
    validatorStore: new ValidatorStore(),
    swapStore: new SwapStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}