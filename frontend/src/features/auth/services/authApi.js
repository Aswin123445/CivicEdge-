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
  baseQuery: axiosBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/v1/user' }),
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
        url: '/login',
        method: 'post',
        data: credentials,
      }),
      transformResponse: (response) => {
        saveToken(response.token);
        return response;
      },
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
  }),
});

export const { useSignupMutation, useLoginMutation , useVerifyEmailQuery } = authApi;
