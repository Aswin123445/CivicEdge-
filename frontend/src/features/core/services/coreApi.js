import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../services/baseQueryWithReauth";
import { baseApi } from "../../../services/baseApi";
const PROFILE_PREFIX = "/me";
// here just created auth slice for core feature like home page about and contact page
export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    home: builder.query({
      query: () => ({
        url: `${PROFILE_PREFIX}/home`,
        method: 'get',
        meta: { skipAuth: false },  
      }),
      providesTags: ['Home'],
      transformResponse: (response) => {
        return response;
      },
    }),
    uploadAvatar: builder.mutation({
      query: (file) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return {
        url: `${PROFILE_PREFIX}/profile/avatar/`,
        method: 'post',
        data: formData,
        meta: { skipAuth: false },  
      }},
      invalidatesTags: ['Home','Avatar'],
      transformResponse: (response) => {
        return response;
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${PROFILE_PREFIX}/profile/`,
        method: 'patch',
        data,
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ['Home'],
      transformResponse: (response) => {
        return response;
      },
    }), 
    solverWorkToggle : builder.mutation({
      query: (data) => ({
        url: `${PROFILE_PREFIX}/work/toggle/`,
        method: 'post',
        data,
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ['Home'],
      transformResponse: (response) => {
        return response;
      },  
    })
  }),
});
export const { useHomeQuery,useUploadAvatarMutation,useUpdateProfileMutation,useSolverWorkToggleMutation} = profileApi