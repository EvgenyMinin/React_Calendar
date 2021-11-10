import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../models';

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
    reducers: {
        setGuests: (state, { payload }: PayloadAction<User[]>) => {
            state.guests = payload;
            state.error = '';
        },
    },
});

export const { setGuests } = eventSlice.actions;

export default eventSlice.reducer;
