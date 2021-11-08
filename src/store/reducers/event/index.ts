import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models';
import { fetchGuests } from './actionCreators';

interface EventState {
    guests: User[];
    isLoading: boolean;
    error: string;
}

const initialState: EventState = {
    guests: [],
    isLoading: false,
    error: '',
};

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGuests.fulfilled.type]: (state, { payload }: PayloadAction<User[]>) => {
            state.guests = payload;
            state.isLoading = false;
        },
        [fetchGuests.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchGuests.rejected.type]: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
            state.isLoading = false;
        },
    },
});

export default eventSlice.reducer;
