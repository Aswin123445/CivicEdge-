import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../../../services/baseQueryWithReauth";

// here just created auth slice for core feature like home page about and contact page
export const issueApi = createApi({
  reducerPath: 'issueApi',
  baseQuery: baseQueryWithReauth({ baseUrl: '/api/v1/civic/issues' }),
  tagTypes: ['Summary','Category','IssueStep1','Drafts','Question','Review','Complaints','Detail'],
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
    addLocation: builder.mutation({
      query: (data) => ({
        url: `/${data.id}/location/`,
        method: 'post',
        data: data.req,
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ["Summary","Drafts"],
      transformResponse: (response) => {
        return response;
      },
    }),
    addEvidence: builder.mutation({
      query: (data) => ({
        url: `/${data.id}/evidence/`,
        method: 'post',
        data: data.req,
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ["Summary","Drafts"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getBehaviorals: builder.query({
      query: (id) => ({
        url: `/${id}/behavioral-prompts/`,
        method: 'get',
        meta: { skipAuth: false },  
      }),
      providesTags: ["Question"],
      transformResponse: (response) => {
        return response;
      },  
    }),
    getBehavioralsResponse : builder.mutation({
      query: (data) => ({
        url: `/${data.id}/behavioral-response/`,
        method: 'post',
        data: data.req,
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ["Summary","Drafts","Review"],
      transformResponse: (response) => {
        return response;
      },
    }),
    finalReview : builder.query({
      query: (id) => ({
        url: `/${id}/review/`,
        method: 'get',
        meta: { skipAuth: false },  
      }),
      providesTags: ["Review"],
      transformResponse: (response) => {
        return response;
      },  
    }),
    issueSubmit: builder.mutation({
      query: (data) => ({
        url: `/${data.id}/submit/`,
        method: 'post',
        data: data.req,
        meta: { skipAuth: false },  
      }),
      invalidatesTags: ["Summary","Drafts","Complaints"],
      transformResponse: (response) => {
        return response;
      },
    }),
    listComplaints: builder.query({
      query: ({page = 1,search = "",status}) => {
        const params = {page};
        if(search) params.search = search;
        if(status) params.status = status;
        return {
          url: '/complaints/list/',
          method: 'get',
          meta: { skipAuth: false },  
          params
        }
      },
      providesTags: ["Complaints"],
      refetchOnMountOrArgChange: true,    
      transformResponse: (response) => {
        return response;
      },
    }),
    complaintDetail: builder.query({
      query: (id) => ({
        url: `/complaints/${id}/detail/`,
        method: 'get',
        meta: { skipAuth: false },  
      }),
      providesTags: ["Detail"],
      transformResponse: (response) => {
        return response;
      },  
    }),
  })
})
export const { 
  useIssueSummaryQuery,
  useIssueCategoryQuery,
  useIssueStep1Mutation,
  useGetDraftsQuery,
  useDeleteDraftMutation,
  useAddLocationMutation,
  useAddEvidenceMutation,
  useGetBehavioralsQuery,
  useGetBehavioralsResponseMutation,
  useFinalReviewQuery,
  useIssueSubmitMutation,
  useListComplaintsQuery,
  useComplaintDetailQuery
} = issueApi