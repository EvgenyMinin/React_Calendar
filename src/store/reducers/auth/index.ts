import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models';

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
        login: (state, { payload }: PayloadAction<User>) => {
            state.isAuth = true;
            state.error = '';
            state.user = payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = {} as User;
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        },
    },
});

export const { login, logout, setError } = authSlice.actions;

export default authSlice.reducer;
