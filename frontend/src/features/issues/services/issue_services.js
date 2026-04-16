import { baseApi } from "../../../services/baseApi";

// here just created auth slice for core feature like home page about and contact page
const ISSUE_PREFIX = "/civic/issues";

export const issueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    issueSummary : builder.query({
      query: (data) => ({
        url: `${ISSUE_PREFIX}/summary`,
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
        url: `${ISSUE_PREFIX}/categories`,
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
        url: `${ISSUE_PREFIX}/`,
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
        url: `${ISSUE_PREFIX}/drafts/`,
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
        url: `${ISSUE_PREFIX}/${id}/draft/delete/`,
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
        url: `${ISSUE_PREFIX}/${data.id}/location/`,
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
        url: `${ISSUE_PREFIX}/${data.id}/evidence/`,
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
        url: `${ISSUE_PREFIX}/${id}/behavioral-prompts/`,
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
        url: `${ISSUE_PREFIX}/${data.id}/behavioral-response/`,
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
        url: `${ISSUE_PREFIX}/${id}/review/`,
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
        url: `${ISSUE_PREFIX}/${data.id}/submit/`,
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
          url: `${ISSUE_PREFIX}/complaints/list/`,
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
        url: `${ISSUE_PREFIX}/complaints/${id}/detail/`,
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