import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrder, IUserOrder, IUserOrderData } from 'types/order';

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

type OrderUnion = IUserOrder | IOrder;

interface IInitialState {
    orders: OrderUnion[];
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
            // загрузка заказов юзера
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
            })
            // загрузка всех заказов
            .addCase(fetchAllOrders.pending, (state) => {
                state.orders = [];
                state.status = 'loading';
            })
            .addCase(
                fetchAllOrders.fulfilled,
                (state, action: PayloadAction<IOrder[]>) => {
                    state.orders = action.payload;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchAllOrders.rejected, (state) => {
                state.orders = [];
                state.status = 'error';
            })
            // удаление заказа
            .addCase(removeUserOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(removeUserOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(
                    (item) => item._id !== action.meta.arg.orderId
                );
                state.status = 'loaded';
            })
            .addCase(removeUserOrder.rejected, (state) => {
                state.status = 'error';
            });
    },
});

export const ordersReducer = ordersSlice.reducer;
