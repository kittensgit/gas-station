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
            state.totalCost =
                payload.payload.literQuantity * payload.payload.price;
            if (payload.payload.discount) {
                const discount = payload.payload.discount;
                const totalCost =
                    payload.payload.literQuantity * payload.payload.price;
                state.orderFuel.discount =
                    totalCost - totalCost * (discount / 100);
            }
        },
    },
});

export const { addOrderFuel } = refuelSlice.actions;

export const refuelReducer = refuelSlice.reducer;
