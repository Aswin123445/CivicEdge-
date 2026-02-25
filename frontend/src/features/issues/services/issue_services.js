import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../services/baseQueryWithReauth";

// here just created auth slice for core feature like home page about and contact page
export const issueApi = createApi({
  reducerPath: 'issueApi',
  baseQuery: baseQueryWithReauth({ baseUrl: '/api/v1/civic/issues' }),
  tagTypes: ['Summary','Category','IssueStep1','Drafts'],
  endpoints: (builder) => ({
    issueSummary : builder.query({
      query: (data) => ({
        url: '/summary',
        method: 'get',
        data,
        meta: { skipAuth: false },  
      }),
      providesTags: ["Summary"],
      transformResponse: (response) => {
        return response;
      },  
    }),
    issueCategory : builder.query({
      query: (data) => ({
        url: '/categories',
        method: 'get',
        data,
        meta: { skipAuth: false },  
      }),
      providesTags: ["Category"],      
      transformResponse: (response) => {
        return response;
      },  
    }),
    issueStep1 : builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'post',
        data,
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ["Summary","Drafts"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getDrafts: builder.query({
      query: ({page = 1,search = ""}) => ({
        url: '/drafts/',
        method: 'get',
        meta: { skipAuth: false },  
        params: {page,search},
      }),
      providesTags: ["Drafts"],  
      refetchOnMountOrArgChange: true,    
      transformResponse: (response) => {
        console.log(response);
        return response;
      },  
    }),
    deleteDraft: builder.mutation({
      query: (id) => ({
        url: `/${id}/draft/delete/`,
        method: 'delete',
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ["Drafts"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});
export const { 
  useIssueSummaryQuery,
  useIssueCategoryQuery,
  useIssueStep1Mutation,
  useGetDraftsQuery,
  useDeleteDraftMutation
} = issueApi