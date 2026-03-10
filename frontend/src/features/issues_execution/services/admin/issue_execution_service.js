
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
      invalidatesTags: ["IssuesToSolvers","Solvers"],
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
  useAssignSolverVerificationMutation
} = adminExecutionIssueApi;
