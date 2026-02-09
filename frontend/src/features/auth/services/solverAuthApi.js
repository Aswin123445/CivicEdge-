import axiosBaseQuery from "../../../services/axiosBaseQuery";
import {createApi} from '@reduxjs/toolkit/query/react'; 

export const solverAuthApi = createApi({
    reducerPath: 'solverAuthApi',
    baseQuery: axiosBaseQuery({ baseUrl: '/api/v1/user/solver/' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login/',
                method: 'post',
                data: credentials,
                withCredentials: true,
            }),
            transformResponse: (response) => {
                return response;
            },
        }),
    }),
})

export const { useLoginMutation } = solverAuthApi