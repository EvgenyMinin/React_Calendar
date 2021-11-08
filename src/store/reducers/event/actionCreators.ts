import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../../api/UserService';

export const fetchGuests = createAsyncThunk('events/fetchGuests', async (_, { rejectWithValue }) => {
    try {
        const { data } = await UserService.getUsers();

        return data;
    } catch (error) {
        const result = (error as Error).message;
        return rejectWithValue(result);
    }
});
