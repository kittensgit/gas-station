import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IProduct } from 'types/product';

import axios from '../../axios';

// params -> filterType ('all', 'dessert', 'main', 'drinks')
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: string) => {
        const { data } = await axios.get(`/products/${params}`);
        return data;
    }
);

interface IInitialState {
    products: IProduct[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    products: [],
    status: 'loading',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products = [];
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.products = [];
                state.status = 'error';
            });
    },
});

export const productsReducer = productsSlice.reducer;
