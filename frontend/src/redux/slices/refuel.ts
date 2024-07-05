import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IOrderFuel, IRefuelData } from 'types/fuel';

import axios from '../../axios';

export const fetchRefuel = createAsyncThunk(
    'auth/fetchRefuel',
    async (params: IRefuelData) => {
        const { data } = await axios.post('/refuel', params);
        return data;
    }
);

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
        scores: null,
    },
    totalCost: null,
};

const refuelSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addOrderFuel: (state, action) => {
            state.orderFuel.price = action.payload.price;
            state.orderFuel.name = action.payload.name;
            state.orderFuel.color = action.payload.color;
            state.orderFuel.literQuantity = action.payload.literQuantity;
            state.orderFuel.scores = action.payload.scores;
            state.totalCost =
                action.payload.literQuantity * action.payload.price;
            if (action.payload.discount) {
                const discount = action.payload.discount;
                const totalCost =
                    action.payload.literQuantity * action.payload.price;
                state.orderFuel.discount = +(
                    totalCost *
                    (discount / 100)
                ).toFixed(2);
            }
        },
        removeOrderFuel: (state) => {
            state.orderFuel.price = null;
            state.orderFuel.name = '';
            state.orderFuel.color = '';
            state.orderFuel.literQuantity = null;
            state.orderFuel.scores = null;
            state.orderFuel.discount = null;
            state.totalCost = null;
        },
    },
});

export const { addOrderFuel, removeOrderFuel } = refuelSlice.actions;

export const refuelReducer = refuelSlice.reducer;
