import { createContext, useContext } from 'react';
import UserStore from './userStore';
import PriceStore from './priceStore';

interface Store {
    userStore: UserStore;
    priceStore: PriceStore;
}

export const store: Store = {
    userStore: new UserStore(),
    priceStore: new PriceStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}