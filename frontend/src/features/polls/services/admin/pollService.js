import { baseApi } from "../../../../services/baseApi";
const EXECUTION_PREFIX = "/polls/admin";
export const PollAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminFetchPolls: builder.query({
      query: ({ page = 1, search = "", status = "" }) => {
        const params = { page };
        if (search) params.search = search;
        if (status) params.status = status;
        return {
          url: `${EXECUTION_PREFIX}/polls/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminFetchPolls", "AdminPollDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminCreatePoll: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/polls/create/`,
        method: "POST",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminFetchPolls"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminEditPoll: builder.mutation({
      query: ({ data, id }) => ({
        url: `${EXECUTION_PREFIX}/polls/edit/${id}/`,
        method: "PATCH",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminFetchPolls", "AdminPollDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminClosePoll: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/polls/${id}/close/`,
        method: "PATCH",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminFetchPolls", "AdminPollDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminPollDetail: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/polls/${id}/`,
        method: "GET",
        meta: { skipAuth: false },
      }),
      providesTags: ["AdminPollDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminPollDistribution: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/polls/${id}/distribution/`,
        method: "GET",
        meta: { skipAuth: false },
      }),
      providesTags: ["AdminPollDetailDistribution"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminPollsTimeLine: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/polls/${id}/timeline/`,
        method: "GET",
        meta: { skipAuth: false },
      }),
      providesTags: ["AdminPollsDetailTimeLine"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useAdminFetchPollsQuery,
  useAdminCreatePollMutation,
  useAdminClosePollMutation,
  useAdminPollDetailQuery,
  useAdminPollDistributionQuery,
  useAdminPollsTimeLineQuery,
  useAdminEditPollMutation

} = PollAdminApi;
