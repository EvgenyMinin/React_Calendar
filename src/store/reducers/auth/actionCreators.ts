import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../../models';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async ({ username, password }: User, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<User[]>('./users.json');

        const mockUser = data.find((u) => u.username === username && u.password === password);

        if (mockUser) {
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', mockUser.username);
            return mockUser;
        } else {
            return rejectWithValue('Вы ввели неправильный логин или пароль');
        }
    } catch (error) {
        const result = (error as Error).message;
        return rejectWithValue(result);
    }
});
