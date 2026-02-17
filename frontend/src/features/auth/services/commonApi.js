import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../services/baseQueryWithReauth';
import { role,logout_user } from '../authSlice';

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: baseQueryWithReauth({ baseUrl: '/api/v1/user/common/' }),

    endpoints: (builder) => ({
        role: builder.query({
            query: () => {
                return {
                    url: 'me/',
                    method: 'get',
                    withCredentials: false,
                    meta : { skipAuth: false },
                };
            },
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(role(data));
                } catch (error) {
                    console.log(error);
                }
            },
            transformResponse: (response) => {
                return response;
            },
        }),
        logout: builder.mutation({
          query: () => ({
            url: '/logout/',
            method: 'post',
            withCredentials: true,
            meta: { skipAuth: false },
          }),
          onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
            try {
              const { data } = await queryFulfilled;
              dispatch(logout_user(data));
            } catch (error) {
              console.log(error);
            }
          },
          transformResponse: (response) => {
            return response;
          },
        }),
    }),
});

export const { useRoleQuery,useLazyRoleQuery,useLogoutMutation } = commonApi;