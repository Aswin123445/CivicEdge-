import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../services/baseQueryWithReauth";

// here just created auth slice for core feature like home page about and contact page
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQueryWithReauth({ baseUrl: '/api/v1/me' }),
  tagTypes: ['Home','Avatar'],
  endpoints: (builder) => ({
    home: builder.query({
      query: () => ({
        url: '/home',
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
        url: '/profile/avatar/',
        method: 'post',
        data: formData,
        meta: { skipAuth: false },  
      }},
      invalidatesTags: ['Home','Avatar'],
      transformResponse: (response) => {
        console.log(response);
        return response;
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/profile/',
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
        url: '/work/toggle/',
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