import { createApi } from '@reduxjs/toolkit/query/react';
import {adminLogin} from '../authSlice'
import baseQueryWithReauth from '../../../services/baseQueryWithReauth';
export const adminAuthApi = createApi({
    reducerPath: 'adminAuthApi',
    baseQuery: baseQueryWithReauth({ baseUrl: '/api/v1/user/admin' }),
    tagTypes: ['Citizens', 'Solvers', 'Admins', 'Zones'], 
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: '/login/',
          method: 'post',
          withCredentials: false,
          data: credentials,
          meta: { skipAuth: true },
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            dispatch(adminLogin(data));
          } catch (error) {
            console.log(error);
          }
        }
      }),
      fetchZones: builder.query({
        query: () => ({
          url: '/zones/',
          method: 'get',
          withCredentials: true ,
          meta: { skipAuth: false },  
        }),
        providesTags: ['Zones'],
        transformResponse: (response) => {
          return response;
        }
      }),
      getCitizens: builder.query({
        query: ({page = 1,search = ""} ) => ({
          url: '/citizens/',
          method: 'get',
          params: { page,search },
          withCredentials: false ,
          meta: { skipAuth: false },  
        }),
        providesTags: ['Citizens'],
      }),

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
        query: ({page = 1,search = ""}) => ({
          url: '/solvers/',
          params: { search , page},
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
          withCredentials: true,
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
        query: ({page = 1 ,search = ""}) => ({
          url: '/admins/',
          params: { search , page},
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
  useListAdminsQuery,
  useFetchZonesQuery
 } = adminAuthApi;