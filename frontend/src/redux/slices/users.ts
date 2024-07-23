import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, IUserRoleData } from 'types/user';

import axios from '../../axios';

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
    const { data } = await axios.get('/users');
    return data;
});

// params => userId and role
export const setUserRole = createAsyncThunk(
    'auth/setUserRole',
    async (params: IUserRoleData) => {
        const { data } = await axios.post(`/users/${params.userId}/setRole`, {
            role: params.role,
        });
        return data;
    }
);
interface IInitialState {
    users: IUser[];
    status: 'loading' | 'loaded' | 'error';
}

const initialState: IInitialState = {
    users: [],
    status: 'loading',
};

const usersSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.users = [];
                state.status = 'loading';
            })
            .addCase(
                fetchUsers.fulfilled,
                (state, action: PayloadAction<IUser[]>) => {
                    state.users = action.payload;
                    state.status = 'loaded';
                }
            )
            .addCase(fetchUsers.rejected, (state) => {
                state.users = [];
                state.status = 'error';
            });
    },
});

export const usersReducer = usersSlice.reducer;
