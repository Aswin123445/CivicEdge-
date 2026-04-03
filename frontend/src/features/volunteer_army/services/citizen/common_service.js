import { baseApi } from "../../../../services/baseApi";
const EXECUTION_PREFIX = "/army/citizen/volunteer";
export const solverExecutionIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchVolunteerSummary: builder.query({
      query: () => ({
        url: `${EXECUTION_PREFIX}/home/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["VolunteerSummary"],
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchMyRecognition: builder.query({
      query: ({ page = 1}) => ({
        url: `${EXECUTION_PREFIX}/my-recognitions/`,
        method: "get",
        meta: { skipAuth: false },
        params: { page },
      }),
      providesTags: ["MyRecognition"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useFetchVolunteerSummaryQuery,
  useFetchMyRecognitionQuery
} = solverExecutionIssueApi;