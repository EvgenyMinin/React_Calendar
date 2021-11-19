import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Event, User } from '../models';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
    }),
    tagTypes: ['User', 'Event'],
    endpoints: (builder) => ({
        fetchAllUsers: builder.query<User[], void>({
            query: () => 'users',
            providesTags: ['User'],
        }),

        fetchAllEvents: builder.query<Event[], void>({
            query: () => 'events',
            providesTags: () => ['Event'],
        }),

        createEvent: builder.mutation<Event, Event>({
            query: (event: Event) => ({
                url: '/events',
                method: 'POST',
                body: event,
            }),
            invalidatesTags: ['Event'],
        }),

        deleteEvent: builder.mutation<Event, Event>({
            query: (event: Event) => ({
                url: `/events/${event.id}`,
                method: 'DELETE',
                body: event,
            }),
            invalidatesTags: ['Event'],
        }),
    }),
});

export const { useFetchAllUsersQuery, useCreateEventMutation, useFetchAllEventsQuery, useDeleteEventMutation } = api;
