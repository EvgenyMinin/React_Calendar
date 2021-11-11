import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import eventSlice from './reducers/event';
import { api } from '../api/UserService';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authSlice,
        events: eventSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
