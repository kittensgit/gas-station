import { createSlice } from '@reduxjs/toolkit';

import { IOrderFuel } from 'types/fuel';

interface IInitialState {
    orderFuel: IOrderFuel;
    totalCost: number | null;
}

const initialState: IInitialState = {
    orderFuel: {
        name: '',
        color: '',
        price: null,
        literQuantity: null,
    },
    totalCost: null,
};

const refuelSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addOrderFuel: (state, payload) => {
            state.orderFuel.price = payload.payload.price;
            state.orderFuel.name = payload.payload.name;
            state.orderFuel.color = payload.payload.color;
            state.orderFuel.literQuantity = payload.payload.literQuantity;
            if (payload.payload.discount) {
                state.totalCost =
                    payload.payload.literQuantity *
                    payload.payload.price *
                    (payload.payload.discount / 100);
            } else {
                state.totalCost =
                    payload.payload.literQuantity * payload.payload.price;
            }
        },
    },
});

export const { addOrderFuel } = refuelSlice.actions;

export const refuelReducer = refuelSlice.reducer;
