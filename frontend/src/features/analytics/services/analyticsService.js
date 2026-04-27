import { baseApi } from "../../../services/baseApi";

const EXECUTION_PREFIX = "/analytics";
export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    issueanalytics: builder.query({
      query: ({ range = "30d", date_from, date_to }) => {
        const params = { range };
        if (date_from) params.date_from = date_from;
        if (date_to) params.date_to = date_to;
        return {
          url: `${EXECUTION_PREFIX}/issues-dashboard/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["IssueAnalytics"],
      transformResponse: (response) => {
        return response;
      },
    }),
    issueExport: builder.mutation({
      query: ({ range = "30d", date_from, date_to }) => {
        const params = { range };
        if (date_from) params.date_from = date_from;
        if (date_to) params.date_to = date_to;
        return {
          url: `${EXECUTION_PREFIX}/issues-export/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["IssueAnalyticsExport"],
      transformResponse: (response) => {
        return response;
      },
    }),
    userAnalytics: builder.query({
      query: ({ range = "30d", date_from, date_to }) => {
        const params = { range };
        if (date_from) params.date_from = date_from;
        if (date_to) params.date_to = date_to;
        return {
          url: `${EXECUTION_PREFIX}/users-dashboard/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["UserAnalytics"],
      transformResponse: (response) => {
        return response;
      },
    }),
    volunteerAnalytics: builder.query({
      query: ({ range = "30d", date_from, date_to }) => {
        const params = { range };
        if (date_from) params.date_from = date_from;
        if (date_to) params.date_to = date_to;
        return {
          url: `${EXECUTION_PREFIX}/volunteer-dashboard/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["VolunteerAnalytics"],
      transformResponse: (response) => {
        return response;
      },
    }),
    pollAnalytics: builder.query({
      query: ({ range = "30d", date_from, date_to }) => {
        const params = { range };
        if (date_from) params.date_from = date_from;
        if (date_to) params.date_to = date_to;
        return {
          url: `${EXECUTION_PREFIX}/poll-dashboard/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["PollAnalytics"],
      transformResponse: (response) => {
        return response;
      },
    }),
    forumAnalytics: builder.query({
      query: ({ range = "30d", date_from, date_to }) => {
        const params = { range };
        if (date_from) params.date_from = date_from;
        if (date_to) params.date_to = date_to;
        return {
          url: `${EXECUTION_PREFIX}/forum-dashboard/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["ForumAnalytics"],
      transformResponse: (response) => {
        return response;
      },
    })
  }),
});

export const {
  useIssueanalyticsQuery,
  useIssueExportMutation,
  useUserAnalyticsQuery,
  useVolunteerAnalyticsQuery,
  usePollAnalyticsQuery,
  useForumAnalyticsQuery
} = analyticsApi;
