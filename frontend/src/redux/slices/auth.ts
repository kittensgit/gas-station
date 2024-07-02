import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IUser } from 'types/user';
import { ISignInData } from 'types/auth';

import axios from '../../axios';

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (params: ISignInData) => {
        const { data } = await axios.post('/auth/login', params);
        return data;
    }
);

interface IInitialState {
    data: IUser | null;
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.data = null;
                state.status = 'loading';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.data = null;
                state.status = 'error';
            });
    },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
