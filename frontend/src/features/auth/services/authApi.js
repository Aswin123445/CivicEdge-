import { citizenLogin, googleLogin, refreshToken } from '../authSlice';
import { baseApi } from '../../../services/baseApi';
import { errorToast } from '../../../utils/Toaster';


const AUTH_PREFIX = '/user';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_PREFIX}/register/`,
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
    citizenLogin: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_PREFIX}/signin/`,
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
          errorToast({ title: "Unable to fetch user", description: "please login again" });
        }
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: `${AUTH_PREFIX}/refresh/`,
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
          errorToast({ title: "Unable to login", description: "Please try again" });
        }
      },
      transformResponse: (response) => {
        // save new access token to storage
        return response;
      }
    }),
    verifyEmail: builder.query({
      query: (params) => ({
        url: `${AUTH_PREFIX}/verify-email`,
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
        url: `${AUTH_PREFIX}/auth/google/login/`,
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
          errorToast({ title: "Unable to login", description: "Please try again" });
        }
      },
      transformResponse: (response) => {
        // saveToken(response.refresh);
        return response;
      },
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_PREFIX}/forgot-password/`,
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
        url: `${AUTH_PREFIX}/reset-password/${uid}/${token}/`,
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
  useCitizenLoginMutation , 
  useVerifyEmailQuery ,
  useGoogleLoginMutation, 
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshMutation,
} = authApi;
