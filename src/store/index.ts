import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import eventSlice from './reducers/event';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        events: eventSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
