import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../services/baseQueryWithReauth';
import { role,logout_user } from '../authSlice';
import { baseApi } from '../../../services/baseApi';
import { errorToast } from '../../../utils/Toaster';

export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        role: builder.query({
            query: () => {
                return {
                    url: '/user/common/me/',
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
                    errorToast({ title: "Unable to fetch user", description: "please login again" });
                }
            },
            transformResponse: (response) => {
                return response;
            },
        }),
        logout: builder.mutation({
          query: () => ({
            url: '/user/common/logout/',
            method: 'post',
            withCredentials: true,
            meta: { skipAuth: false },
          }),
          onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
            try {
              const { data } = await queryFulfilled;
              dispatch(logout_user(data));
            } catch (error) {
              errorToast({ title: "Unable to fetch user", description: "please login again" });
            }
          },
          transformResponse: (response) => {
            return response;
          },
        }),
        changePassword: builder.mutation({
          query: (credentials) => ({
            url: '/user/common/change-password/',
            method: 'post',
            withCredentials: true,
            meta: { skipAuth: false },
            data: credentials,
          }),
          transformResponse: (response) => {
            return response;
          },
        }),
    }),
});

export const { useRoleQuery,useLazyRoleQuery,useLogoutMutation,useChangePasswordMutation } = commonApi;