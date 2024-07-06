import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { refuelReducer } from './slices/refuel';
import { productsReducer } from './slices/products';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        refuel: refuelReducer,
        products: productsReducer,
    },
});
