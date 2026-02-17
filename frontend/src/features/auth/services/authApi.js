import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../services/baseQueryWithReauth';
import { citizenLogin, googleLogin, refreshToken } from '../authSlice';
// import { saveToken, getToken } from './tokenStorage';


// const getAuthHeaders = () => {
//   const token = getToken();
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth({ baseUrl: '/api/v1/user' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/register/',
        method: 'post',
        data: credentials,
        meta: { skipAuth: true },
        withCredentials: false
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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(citizenLogin(data));
        } catch (error) {
          console.log(error);
        }
      },
      transformResponse: (response) => {
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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(refreshToken({access:null,loading:true}));
        try {
          const { data } = await queryFulfilled;
          dispatch(refreshToken({...data,loading:false}));
        } catch (error) {
          dispatch(refreshToken({access:null,loading:false}));
          console.log(error);
        }
      },
      transformResponse: (response) => {
        // save new access token to storage
        return response;
      }
    }),
    verifyEmail: builder.query({
      query: (params) => ({
        url: '/verify-email',
        method: 'get',
        params,
        withCredentials: false,
        meta: { skipAuth: true },
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
        withCredentials: false
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(googleLogin(data));
        } catch (error) {
          console.log(error);
        }
      },
      transformResponse: (response) => {
        // saveToken(response.refresh);
        return response;
      },
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: '/forgot-password/',
        method: 'post',
        data: credentials,
        withCredentials: false,
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
        withCredentials: false
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
  useRefreshMutation,
} = authApi;
