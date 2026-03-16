import { baseApi } from "../../../../services/baseApi";

const EXECUTION_PREFIX = "/civic/execute";
export const solverExecutionIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSolverTasks: builder.query({
      query: ({ page = 1, search = "", status }) => {
        const params = { page };
        if (search) params.search = search;
        if (status) params.status = status;
        return {
          url: `${EXECUTION_PREFIX}/solver/task-list/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["SolverTasks"],
      refetchOnMountOrArgChange: true,
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchSolverTaskDetail: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/solver/task/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["SolverTaskDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchDraftProgress: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/solver/task/${id}/verification-draft/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["DraftProgress"],
      transformResponse: (response) => {
        return response;
      },
    }),
    solverGroundStep1: builder.mutation({
      query: ({data,id}) => ({
        url: `${EXECUTION_PREFIX}/solver/verification-draft/${id}/ground/`,
        method: "patch",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["SolverTasks","SolverTaskDetail","DraftProgress"],
      transformResponse: (response) => {
        return response;
      },
    }),
    solverImpactStep2: builder.mutation({
      query: ({data,draft_id}) => ({
        url: `${EXECUTION_PREFIX}/solver/verification-draft/${draft_id}/impact/`,
        method: "patch",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["SolverTasks","SolverTaskDetail","DraftProgress"],
      transformResponse: (response) => {
        return response;
      },
    }),
    solverEstimateStep3: builder.mutation({
      query: ({data,draft_id}) => ({
        url: `${EXECUTION_PREFIX}/solver/verification-draft/${draft_id}/estimation/`,
        method: "patch",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["SolverTasks","SolverTaskDetail","DraftProgress"],
      transformResponse: (response) => {
        return response;
      },
    }), 
    solverVerificationEvidenceStep4: builder.mutation({
      query: ({req,draft_id}) => ({
        url: `${EXECUTION_PREFIX}/solver/verification-draft/${draft_id}/evidence/`,
        method: "post",
        meta: { skipAuth: false },
        data: req,
      }),
      invalidatesTags: ["SolverTasks","SolverTaskDetail","DraftProgress"],
      transformResponse: (response) => {
        return response;
      },
    }),
    draftDetail: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/solver/draft/${id}/get-draft/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["SolverDraftDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    solverSubmitVerification: builder.mutation({
      query: ({task_id}) => ({
        url: `${EXECUTION_PREFIX}/solver/tasks/${task_id}/submit-verification/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["SolverTasks","SolverTaskDetail","DraftProgress","SolverDashboard"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getPdfReport: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/solver/field-verification-report-pdf/${id}/`,
        method: "get",
        meta: { skipAuth: false },
        responseHandler: (response) => response.blob(),
        responseType: "blob",
      }),
      providesTags: ["ReportPdf"],
    }),
    solverStartExecution: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/solver/tasks/${id}/start-execution/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["SolverTasks","SolverTaskDetail","SolverDashboard"],
      transformResponse: (response) => {
        return response;
      },
    }),
    solverTaskUpdateList: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/solver/tasks/${id}/progress-updates-list/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["SolverTaskProgressUpdates"],
      transformResponse: (response) => {
        return response;
      },
    }),
    solverTaskUpdate: builder.mutation({
      query: ({data,task_id}) => ({
        url: `${EXECUTION_PREFIX}/solver/tasks/${task_id}/progress-updates/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["SolverTaskProgressUpdates","SolverDashboard"],
      transformResponse: (response) => {
        return response;
      },
    }),
    solverTaskComplete: builder.mutation({
      query: ({data,task_id}) => ({
        url: `${EXECUTION_PREFIX}/solver/tasks/${task_id}/submit-completion/`,
        method: "post",
        meta: { skipAuth: false },
        data
      }),
      invalidatesTags: ["SolverTasks","SolverTaskDetail","SolverDashboard"],
      transformResponse: (response) => {
        return response;
      },
    })
  }),
});

export const {
  useFetchSolverTasksQuery,
  useFetchSolverTaskDetailQuery,
  useFetchDraftProgressQuery,
  useSolverGroundStep1Mutation,
  useSolverImpactStep2Mutation,
  useSolverEstimateStep3Mutation,
  useSolverVerificationEvidenceStep4Mutation,
  useDraftDetailQuery,
  useSolverSubmitVerificationMutation,
  useLazyGetPdfReportQuery,
  useSolverStartExecutionMutation,
  useSolverTaskUpdateListQuery,
  useSolverTaskUpdateMutation,
  useSolverTaskCompleteMutation
} = solverExecutionIssueApi;
