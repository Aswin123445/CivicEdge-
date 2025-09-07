import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { saveToken, getToken } from './tokenStorage';


const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params ,meta }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: true,
        headers: {
          ...(meta?.skipAuth ? {} :{ ...getAuthHeaders()}), 
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: axiosError.response
          ? {
              status: axiosError.response.status,
              data: axiosError.response.data,
            }
          : { status: 500, data: axiosError.message },
      };
    }
  };

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api/v1/user' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/register/',
        method: 'post',
        data: credentials,
        meta: { skipAuth: true },
      }),
      transformResponse: (response) => {
        return {
          user: response.user,
          message: response.message,
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/signin/',
        method: 'post',
        withCredentials: true,
        data: credentials,
        meta: { skipAuth: true },

      }),
      transformResponse: (response) => {
        console.log(response)
        return response;
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh/',
        method: 'post',
        withCredentials: true,
        meta: { skipAuth: true },
      }),
      transformResponse: (response) => {
        // save new access token to storage
        return response;
      }
    }),
    verifyEmail: builder.query({
      query: (params) => ({
        url: '/verify-email',
        method: 'get',
        params
      }),
      transformResponse :(response) =>{
        return response
      }
    }), 
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: '/auth/google/login/',
        method: 'post',
        data: credentials,
        meta: { skipAuth: true },
      }),
      transformResponse: (response) => {
        saveToken(response.refresh);
        return response;
      },
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: '/forgot-password/',
        method: 'post',
        data: credentials,
        meta: { skipAuth: true },
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
    resetPassword: builder.mutation({
      query: ({uid,token,credentials}) => ({
        url: `/reset-password/${uid}/${token}/`,
        method: 'post',
        data: credentials,
        meta: { skipAuth: true },
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});
export const { 
  useSignupMutation, 
  useLoginMutation , 
  useVerifyEmailQuery ,
  useGoogleLoginMutation, 
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshMutation
} = authApi;
