import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IMachine } from 'types/machine';

import axios from '../../axios';

export const fetchMachines = createAsyncThunk(
    'machines/fetchMachines',
    async () => {
        const { data } = await axios.get(`/machines`);
        return data;
    }
);

export const bookMachine = createAsyncThunk(
    'machines/bookMachine',
    async (params: IMachine['_id']) => {
        const { data } = await axios.get(`/machines/${params}/book`);
        return data;
    }
);
export const releaseMachine = createAsyncThunk(
    'machines/releaseMachine',
    async (params: IMachine['_id']) => {
        const { data } = await axios.get(`/machines/${params}/release`);
        return data;
    }
);

interface IInitialState {
    machines: IMachine[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    machines: [],
    status: 'loading',
};

const machinesSlice = createSlice({
    name: 'machines',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMachines.pending, (state) => {
                state.machines = [];
                state.status = 'loading';
            })
            .addCase(fetchMachines.fulfilled, (state, action) => {
                state.machines = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchMachines.rejected, (state) => {
                state.machines = [];
                state.status = 'error';
            });
    },
});

export const machinesReducer = machinesSlice.reducer;
