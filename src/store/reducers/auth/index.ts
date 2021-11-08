import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models';
import { fetchUsers } from './actionCreators';

interface AuthState {
    isAuth: boolean;
    user: User;
    isLoading: boolean;
    error: string;
}

const initialState: AuthState = {
    isAuth: false,
    user: {} as User,
    isLoading: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            state.user = {} as User;
        },
    },
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, { payload }: PayloadAction<User>) => {
            state.isAuth = true;
            state.isLoading = false;
            state.error = '';
            state.user = payload;
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
