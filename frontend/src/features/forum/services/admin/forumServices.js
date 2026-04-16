import { baseApi } from "../../../../services/baseApi";

// here just created auth slice for core feature like home page about and contact page
const ISSUE_PREFIX = "/forum/admin";

export const adminForumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listReports: builder.query({
      query: ({
        page = 1,
        search = "",
        ordering = "",
        status = "",
        target_type = "",
      }) => {
        const params = { page };
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        if (status) params.status = status;
        if (target_type) params.target_type = target_type;
        return {
          url: `${ISSUE_PREFIX}/reports/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["Reports"],
      transformResponse: (response) => {
        return response;
      },
    }),
    reportDetails: builder.query({
      query: (id) => ({
        url: `${ISSUE_PREFIX}/reports/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["ReportDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    reportTakeAction: builder.mutation({
      query: ({ data, id }) => ({
        url: `${ISSUE_PREFIX}/reports/${id}/action/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["ReportDetails", "Reports"],
      transformResponse: (response) => {
        return response;
      },
    }),
    postsList: builder.query({
      query: ({ page = 1, search = "", ordering = "", status = "" }) => {
        const params = { page };
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        if (status) params.status = status;
        return {
          url: `${ISSUE_PREFIX}/posts-list/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminPosts"],
      transformResponse: (response) => {
        return response;
      },
    }),
    toggleHighlight: builder.mutation({
      query: (id) => ({
        url: `${ISSUE_PREFIX}/posts/${id}/highlight-toggle/`,
        method: "patch",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminPosts","PostDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    moderatePosts: builder.mutation({
      query: ({id,data}) => ({
        url: `${ISSUE_PREFIX}/posts/${id}/moderation/`,
        method: "post",
        meta: { skipAuth: false },
        data
      }),
      invalidatesTags: ["AdminPosts","PostDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminListCategory: builder.query({
      query: (search) => ({
        url: `${ISSUE_PREFIX}/categories/`,
        method: "get",
        meta: { skipAuth: false },
        params: { search },
      }),
      providesTags: ["AdminCategory"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminToggleCategory: builder.mutation({
      query: (id) => ({
        url: `${ISSUE_PREFIX}/categories/${id}/toggle-status/`,
        method: "patch",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminCategory"],
      transformResponse: (response) => {
        return response;
      },
    }),
    categoryCreate: builder.mutation({
      query: (data) => ({
        url: `${ISSUE_PREFIX}/categories/create/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminCategory"],
      transformResponse: (response) => {
        return response;
      },
    }),
    forumLogs: builder.query({
      query: ({ page = 1, search = "", ordering = "", target_type = "" }) => {
        const params = { page };
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        if (target_type) params.target_type = target_type;
        return {
          url: `${ISSUE_PREFIX}/moderation-logs/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["ModerationLogs"],
      transformResponse: (response) => {
        return response;
      },
    })
  }),
});

export const {
  useListReportsQuery,
  useReportDetailsQuery,
  useReportTakeActionMutation,
  usePostsListQuery,
  useToggleHighlightMutation,
  useModeratePostsMutation,
  useAdminListCategoryQuery,
  useAdminToggleCategoryMutation,
  useCategoryCreateMutation,
  useForumLogsQuery
} = adminForumApi;
