import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from './../models/User';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
    }),
    endpoints: (builder) => ({
        fetchAllUsers: builder.query<User[], void>({
            query: () => 'users',
        }),
    }),
});

export const { useFetchAllUsersQuery } = userApi;
