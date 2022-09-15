import { createContext, useContext } from 'react';
import UserStore from './userStore';
import PriceStore from './priceStore';
import ValidatorStore from './validatorStore';

interface Store {
    userStore: UserStore;
    priceStore: PriceStore;
    validatorStore: ValidatorStore;
}

export const store: Store = {
    userStore: new UserStore(),
    priceStore: new PriceStore(),
    validatorStore: new ValidatorStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}