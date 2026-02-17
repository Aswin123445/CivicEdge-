import {createApi} from '@reduxjs/toolkit/query/react'; 
import baseQueryWithReauth from "../../../services/baseQueryWithReauth";
import { solverLogin } from "../authSlice";

export const solverAuthApi = createApi({
    reducerPath: 'solverAuthApi',
    baseQuery: baseQueryWithReauth({ baseUrl: '/api/v1/user/solver/' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login/',
                method: 'post',
                data: credentials,
                withCredentials: true,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(solverLogin(data));
                } catch (error) {
                    console.log(error);
                }
                
            },
            transformResponse: (response) => {
                return response;
            },
        }),
    }),
})

export const { useLoginMutation } = solverAuthApi