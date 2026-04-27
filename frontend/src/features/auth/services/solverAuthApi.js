import {createApi} from '@reduxjs/toolkit/query/react'; 
import baseQueryWithReauth from "../../../services/baseQueryWithReauth";
import { solverLogin } from "../authSlice";
import { baseApi } from '../../../services/baseApi';
import { errorToast } from '../../../utils/Toaster';

export const solverAuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        solverLogin: builder.mutation({
            query: (credentials) => ({
                url: '/user/solver/login/',
                method: 'post',
                data: credentials,
                withCredentials: true,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(solverLogin(data));
                } catch (error) {
                    errorToast({ title: "Unable to login", description: "Please try again" });
                }
                
            },
            transformResponse: (response) => {
                return response;
            },
        }),
    }),
})

export const { useSolverLoginMutation } = solverAuthApi