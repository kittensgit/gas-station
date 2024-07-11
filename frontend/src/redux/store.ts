import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { refuelReducer } from './slices/refuel';
import { productsReducer } from './slices/products';
import { ordersReducer } from './slices/orders';
import { machinesReducer } from './slices/machines';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        refuel: refuelReducer,
        products: productsReducer,
        orders: ordersReducer,
        machines: machinesReducer,
    },
});
