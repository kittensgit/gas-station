import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser } from 'types/user';

interface IInitialState {
    fuel: string;
    quantity: number | null;
    cost: number | null;
}

const initialState: IInitialState = {
    fuel: '',
    cost: null,
    quantity: null,
};

const refuelSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addFuel: (state, payload) => {
            state.cost = payload.payload.cost;
            state.fuel = payload.payload.fuel;
            state.quantity = payload.payload.quantity;
        },
    },
});

export const refuelReducer = refuelSlice.reducer;
