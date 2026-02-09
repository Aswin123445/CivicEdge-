import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../../services/axiosBaseQuery';

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: axiosBaseQuery({ baseUrl: '/api/v1/user/common/' }),

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
          transformResponse: (response) => {
            return response;
          },
        }),
    }),
});

export const { useRoleQuery,useLazyRoleQuery,useLogoutMutation } = commonApi;