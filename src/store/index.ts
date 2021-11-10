import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import eventSlice from './reducers/event';
import { userApi } from '../api/UserService';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice,
        events: eventSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
