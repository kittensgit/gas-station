import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IShower } from 'types/shower';

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

interface IInitialState {
    showers: IShower[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    showers: [],
    status: 'loading',
};

const showersSlice = createSlice({
    name: 'showers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShowers.pending, (state) => {
                state.showers = [];
                state.status = 'loading';
            })
            .addCase(fetchShowers.fulfilled, (state, action) => {
                state.showers = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchShowers.rejected, (state) => {
                state.showers = [];
                state.status = 'error';
            });
    },
});

export const showersReducer = showersSlice.reducer;
