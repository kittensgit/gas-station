import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { refuelReducer } from './slices/refuel';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        refuel: refuelReducer,
    },
});
