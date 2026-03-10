import { createApi } from "@reduxjs/toolkit/query/react";
import { adminLogin } from "../authSlice";
import baseQueryWithReauth from "../../../services/baseQueryWithReauth";
import { baseApi } from "../../../services/baseApi";


const ADMINAUTH_PREFIX = "/user/admin";
export const adminAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: `${ADMINAUTH_PREFIX}/login/`,
        method: "post",
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
      },
    }),
    fetchZones: builder.query({
      query: () => ({
        url: `${ADMINAUTH_PREFIX}/zones/`,
        method: "get",
        withCredentials: true,
        meta: { skipAuth: false },
      }),
      providesTags: ["Zones"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getCitizens: builder.query({
      query: ({ page = 1, search = "" }) => ({
        url: `${ADMINAUTH_PREFIX}/citizens/`,
        method: "get",
        params: { page, search },
        withCredentials: false,
        meta: { skipAuth: false },
      }),
      providesTags: ["Citizens"],
    }),

    roleChange: builder.mutation({
      query: (credentials) => ({
        url: `${ADMINAUTH_PREFIX}/citizens/${credentials.id}/`,
        method: "patch",
        withCredentials: false,
        data: credentials,
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["Citizens", "Solvers"],
      transformResponse: (response) => {
        return response;
      },
    }),
    flagCitizen: builder.mutation({
      query: (credentials) => ({
        url: `${ADMINAUTH_PREFIX}/citizens/${credentials.id}/`,
        method: "patch",
        withCredentials: false,
        data: credentials,
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["Citizens"],
      transformResponse: (response) => {
        return response;
      },
    }),
    listSolvers: builder.query({
      query: ({ page = 1, search = "",location }) => {
        const params = { page };
        if (search) params.search = search;
        if (location) params.profile__zone = location;
        return {
          url: `${ADMINAUTH_PREFIX}/solvers/`,
          params,
          method: "get",
          withCredentials: false,
          meta: { skipAuth: false },
        };
      },
      providesTags: ["Solvers"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createSolver: builder.mutation({
      query: (credentials) => ({
        url: `${ADMINAUTH_PREFIX}/create-solver/`,
        method: "post",
        withCredentials: true,
        data: credentials,
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["Solvers"],
      transformResponse: (response) => {
        return response;
      },
    }),
    updateSolver: builder.mutation({
      query: (credentials) => ({
        url: `${ADMINAUTH_PREFIX}/solvers/${credentials.id}/`,
        method: "patch",
        withCredentials: false,
        data: credentials,
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["Solvers", "Admins"],
      transformResponse: (response) => {
        return response;
      },
    }),
    listAdmins: builder.query({
      query: ({ page = 1, search = "" }) => ({
        url: `${ADMINAUTH_PREFIX}/admins/`,
        params: { search, page },
        method: "get",
        withCredentials: false,
        meta: { skipAuth: false },
      }),
      providesTags: ["Admins"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});
export const {
  useAdminLoginMutation,
  useGetCitizensQuery,
  useRoleChangeMutation,
  useFlagCitizenMutation,
  useListSolversQuery,
  useCreateSolverMutation,
  useUpdateSolverMutation,
  useListAdminsQuery,
  useFetchZonesQuery,
} = adminAuthApi;
