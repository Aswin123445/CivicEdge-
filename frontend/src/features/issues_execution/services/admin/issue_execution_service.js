import { baseApi } from "../../../../services/baseApi";

const EXECUTION_PREFIX = "/civic/execute";
export const adminExecutionIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchIssues: builder.query({
      query: ({ page = 1, search = "", category, ordering }) => {
        const params = { page };
        if (search) params.search = search;
        if (category) params.category__reference_id = category;
        if (ordering) params.ordering = ordering;
        return {
          url: `${EXECUTION_PREFIX}/admin/in-review/issues/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["PendingIssues"],
      refetchOnMountOrArgChange: true,
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchIssueDetails: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/admin/in-review/${id}/issue/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["PendingIssueDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminInReviewDecition: builder.mutation({
      query: ({ data, id }) => ({
        url: `${EXECUTION_PREFIX}/admin/in-review/${id}/decision/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: [
        "PendingIssues",
        "PendingIssueDetails",
        "IssuesToSolvers",
        "AdminTask",
      ],
      transformResponse: (response) => {
        return response;
      },
    }),
    getPendingIssueToSolvers: builder.query({
      query: ({ page = 1, search = "", ordering, category }) => {
        const params = { page };
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        if (category) params.category__reference_id = category;
        return {
          url: `${EXECUTION_PREFIX}/admin/in-review/issues/solver-assignment/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["IssuesToSolvers"],
      transformResponse: (response) => {
        return response;
      },
    }),
    assignSolverVerification: builder.mutation({
      query: ({ data, id }) => ({
        url: `${EXECUTION_PREFIX}/admin/in-review/issues/${id}/assign-solver/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["IssuesToSolvers", "Solvers"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getPostPonedVerification: builder.query({
      query: ({ page = 1, search = "" }) => {
        const params = { page };
        if (search) params.search = search;
        return {
          url: `${EXECUTION_PREFIX}/admin/postponed-verification-reports/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["PostponedVerification"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getPendingVerification: builder.query({
      query: ({ page = 1, search = "" }) => {
        const params = { page };
        if (search) params.search = search;
        return {
          url: `${EXECUTION_PREFIX}/admin/verification-reports/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["PendingVerification"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getPendingVerificationDetail: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/admin/verification-reports/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["PendingVerificationDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getContractors: builder.query({
      query: () => ({
        url: `${EXECUTION_PREFIX}/admin/contractor-list/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["Contractors"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminDecisionTask: builder.mutation({
      query: ({ data, id }) => ({
        url: `${EXECUTION_PREFIX}/admin/verification-reports/${id}/approve/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: [
        "PendingVerification",
        "PendingVerificationDetail",
        "AdminTask",
        "PostponedVerification",
      ],
      transformResponse: (response) => {
        return response;
      },
    }),
    getAdminFinalReport: builder.query({
      query: () => ({
        url: `${EXECUTION_PREFIX}/admin/execution-proofs/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["AdminFinalReport"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getAdminFinalReportDetail: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/admin/execution-proof/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["AdminFinalReportDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    AdminSubmitFinalReportDecision: builder.mutation({
      query: ({ data, id }) => ({
        url: `${EXECUTION_PREFIX}/admin/execution-proofs/${id}/decision/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: [
        "AdminFinalReport",
        "AdminFinalReportDetail",
        "AdminTask",
      ],
      transformResponse: (response) => {
        return response;
      },
    }),
    AdminTaskFetch: builder.query({
      query: ({ search = "", page = 1, status, ordering }) => {
        const params = { page };
        if (search) params.search = search;
        if (status) params.status = status;
        if (ordering) params.ordering = ordering;
        return {
          url: `${EXECUTION_PREFIX}/admin/solver-tasks/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminTask"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useFetchIssuesQuery,
  useFetchIssueDetailsQuery,
  useAdminInReviewDecitionMutation,
  useGetPendingIssueToSolversQuery,
  useAssignSolverVerificationMutation,
  useGetPendingVerificationQuery,
  useGetPendingVerificationDetailQuery,
  useGetContractorsQuery,
  useAdminDecisionTaskMutation,
  useGetAdminFinalReportQuery,
  useGetAdminFinalReportDetailQuery,
  useAdminSubmitFinalReportDecisionMutation,
  useAdminTaskFetchQuery,
  useGetPostPonedVerificationQuery
} = adminExecutionIssueApi;
