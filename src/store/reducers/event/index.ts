import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Event } from '../../../models';

interface EventState {
    guests: User[];
    events: Event[];
    isLoading: boolean;
    error: string;
}

const initialState: EventState = {
    guests: [],
    events: [],
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

        setEvents: (state, { payload }: PayloadAction<Event[]>) => {
            state.events = payload;
        },
    },
});

export const { setGuests, setEvents } = eventSlice.actions;

export default eventSlice.reducer;
