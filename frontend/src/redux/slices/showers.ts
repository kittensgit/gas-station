import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IShower, IShowers } from 'types/shower';

import axios from '../../axios';

export const fetchShowers = createAsyncThunk(
    'showers/fetchShowers',
    async () => {
        const { data } = await axios.get(`/showers`);
        return data;
    }
);

export const bookShower = createAsyncThunk(
    'showers/bookShower',
    async (params: IShower['_id']) => {
        const { data } = await axios.get(`/showers/${params}/book`);
        return data;
    }
);

export const releaseShower = createAsyncThunk(
    'showers/releaseShower',
    async (params: IShower['_id']) => {
        const { data } = await axios.get(`/showers/${params}/release`);
        return data;
    }
);

// params => quantity
export const addShower = createAsyncThunk(
    'showers/addShower',
    async (params: number) => {
        const { data } = await axios.post(`/showers/add`, {
            quantity: params,
        });
        return data;
    }
);

// params -> showerId
export const deleteShower = createAsyncThunk(
    'showers/deleteShower',
    async (params: IShower['_id']) => {
        const { data } = await axios.delete(`/showers/${params}`);
        return data;
    }
);

// params showerPrice
export const updateShowerPrice = createAsyncThunk(
    'showers/updateShowerPrice',
    async (params: number) => {
        const { data } = await axios.put('/showers/price/update', {
            price: params,
        });
        return data;
    }
);

interface IInitialState {
    showers: IShowers;
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    showers: {
        showers: [],
        price: 0,
    },
    status: 'loading',
};

const showersSlice = createSlice({
    name: 'showers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShowers.pending, (state) => {
                state.showers = {
                    showers: [],
                    price: 0,
                };
                state.status = 'loading';
            })
            .addCase(fetchShowers.fulfilled, (state, action) => {
                state.showers = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchShowers.rejected, (state) => {
                state.showers = {
                    showers: [],
                    price: 0,
                };
                state.status = 'error';
            });
    },
});

export const showersReducer = showersSlice.reducer;
