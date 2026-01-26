import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../../services/axiosBaseQuery';

export const commonApi = createApi({
    reducerPath: 'commonApi',
    baseQuery: axiosBaseQuery({ baseUrl: '/api/v1/user' }),

    endpoints: (builder) => ({
        role: builder.query({
            query: () => {
                return {
                    url: '/common/me/',
                    method: 'get',
                    withCredentials: false,
                    meta : { skipAuth: false },
                };
            },
            transformResponse: (response) => {
                return response;
            },
        }),
    }),
});

export const { useRoleQuery,useLazyRoleQuery } = commonApi;