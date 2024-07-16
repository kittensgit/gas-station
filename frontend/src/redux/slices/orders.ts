import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUserOrder, IUserOrderData } from 'types/order';

import axios from '../../axios';

// params -> userId
export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (params: string) => {
        const { data } = await axios.get(`/userOrders/${params}`);
        return data;
    }
);

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async () => {
        const { data } = await axios.get(`/orders`);
        return data;
    }
);

export const removeUserOrder = createAsyncThunk(
    'orders/removeUserOrder',
    async (params: IUserOrderData) => {
        const { data } = await axios.delete(
            `/userOrders/${params.userId}/${params.orderId}`
        );
        return data;
    }
);

interface IInitialState {
    orders: IUserOrder[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    orders: [],
    status: 'loading',
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.orders = [];
                state.status = 'loading';
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchUserOrders.rejected, (state) => {
                state.orders = [];
                state.status = 'error';
            });
    },
});

export const ordersReducer = ordersSlice.reducer;
