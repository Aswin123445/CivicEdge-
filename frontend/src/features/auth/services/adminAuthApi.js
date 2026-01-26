import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../../services/axiosBaseQuery'; 

export const adminAuthApi = createApi({
    reducerPath: 'adminAuthApi',
    baseQuery: axiosBaseQuery({ baseUrl: '/api/v1/user/admin' }),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: '/login/',
          method: 'post',
          withCredentials: false,
          data: credentials,
          meta: { skipAuth: true },
        }),
        // transformResponse: (response) => {
        //   console.log(response)
        //   return {
        //     access: response.access,
        //     user: response.user.email
        //   };
        // },
      }),
      getCitizens: builder.query({
        query: (page = 1 ) => ({
          url: `/citizens/?page=${page} `,
          method: 'get',
          withCredentials: false ,
          meta: { skipAuth: false },  
        }),
        providesTags: ['Citizens'],
      }),
      transformResponse: (response) => {
        return response;
      },
      roleChange: builder.mutation({
        query: (credentials) => ({
          url: `/citizens/${credentials.id}/`,
          method: 'patch',
          withCredentials: false,
          data: credentials,
          meta: { skipAuth: false },
        }),
        invalidatesTags: ['Citizens','Solvers'],
        transformResponse: (response) => {
          return response;
        },
      }),
      flagCitizen: builder.mutation({
        query: (credentials) => ({
          url: `/citizens/${credentials.id}/`,
          method: 'patch',
          withCredentials: false,
          data: credentials,
          meta: { skipAuth: false },
        }),
        invalidatesTags: ['Citizens'],
        transformResponse: (response) => {
          return response;
        },
      }),
      listSolvers: builder.query({
        query: () => ({
          url: '/solvers/',
          method: 'get',
          withCredentials: false,
          meta: { skipAuth: false },
        }),
        providesTags: ['Solvers'],
        transformResponse: (response) => {
          return response;
        },
      }),
      createSolver: builder.mutation({
        query: (credentials) => ({
          url: '/create-solver/',
          method: 'post',
          withCredentials: false,
          data: credentials,
          meta: { skipAuth: false },
        }),
        invalidatesTags: ['Solvers'],
        transformResponse: (response) => {
          return response;
        },
      }),
      updateSolver: builder.mutation({
        query: (credentials) => ({
          url: `/solvers/${credentials.id}/`,
          method: 'patch',
          withCredentials: false,
          data: credentials,
          meta: { skipAuth: false },
        }),
        invalidatesTags: ['Solvers','Admins'],
        transformResponse: (response) => {
          return response;
        },
      }),
      listAdmins: builder.query({
        query: () => ({
          url: '/admins/',
          method: 'get',
          withCredentials: false,
          meta: { skipAuth: false },
        }),
        providesTags: ['Admins'],
        transformResponse: (response) => {
          return response;
        },
      }),
    }),
});
export const { 
  useLoginMutation,
  useGetCitizensQuery,
  useRoleChangeMutation,
  useFlagCitizenMutation,
  useListSolversQuery,
  useCreateSolverMutation,
  useUpdateSolverMutation,
  useListAdminsQuery
 } = adminAuthApi;