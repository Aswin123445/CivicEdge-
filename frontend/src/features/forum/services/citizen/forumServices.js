import { baseApi } from "../../../../services/baseApi";

// here just created auth slice for core feature like home page about and contact page
const ISSUE_PREFIX = "/forum/citizen";

export const forumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listPosts: builder.query({
      query: ({ page = 1, category = "", ordering = "" }) => {
        const params = { page };
        if (category) params.category__reference_id = category;
        if (ordering) params.ordering = ordering;
        return {
          url: `${ISSUE_PREFIX}/posts-list/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["Posts"],
      transformResponse: (response) => {
        return response;
      },
    }),
    listCategory: builder.query({
      query: () => ({
        url: `${ISSUE_PREFIX}/categories/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["Category"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `${ISSUE_PREFIX}/posts-create/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["Posts"],
      transformResponse: (response) => {
        return response;
      },
    }),
    postDetails: builder.query({
      query: (id) => ({
        url: `${ISSUE_PREFIX}/posts-list/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["PostDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    listComment: builder.query({
      query: ({id,page = 1}) => ({
        url: `${ISSUE_PREFIX}/posts-list/${id}/comments-list/`,
        method: "get",
        meta: { skipAuth: false },
        params:{page},
      }),
      providesTags: ["Comment"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createComment: builder.mutation({
      query: ({data,id}) => ({
        url: `${ISSUE_PREFIX}/posts-list//${id}/comments-create/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["Posts","PostDetails","Comment","MyActivity"],
      transformResponse: (response) => {
        return response;
      },
    }),
    postReact: builder.mutation({
      query: ({data,id}) => ({
        url: `${ISSUE_PREFIX}/posts-list/${id}/react/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["Posts","PostDetails","Comment","MyActivity"],
      transformResponse: (response) => {
        return response;
      },
    }),
    reportContent: builder.mutation({
      query: (data) => ({
        url: `${ISSUE_PREFIX}/reports/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["Posts","PostDetails","Comment"],
      transformResponse: (response) => {
        return response;
      },
    }),
    updatePost: builder.mutation({
      query: ({data,id}) => ({
        url: `${ISSUE_PREFIX}/posts-list/${id}/update/`,
        method: "patch",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["Posts","PostDetails","Comment","MyActivity"],
      transformResponse: (response) => {
        return response;
      },
    }),
    postDelete: builder.mutation({
      query: (id) => ({
        url: `${ISSUE_PREFIX}/posts-list/${id}/delete/`,
        method: "delete",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["Posts","PostDetails","Comment","MyActivity"],
      transformResponse: (response) => {
        return response;
      },
    }),
    commentsUpdate: builder.mutation({
      query: ({data,id}) => ({
        url: `${ISSUE_PREFIX}/comments-list/${id}/update/`,
        method: "patch",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["Posts","PostDetails","Comment","MyActivity"],
      transformResponse: (response) => {
        return response;
      },
    }),
    commentDelete: builder.mutation({
      query: (id) => ({
        url: `${ISSUE_PREFIX}/comments-list/${id}/delete/`,
        method: "delete",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["Posts","PostDetails","Comment","MyActivity"],
      transformResponse: (response) => {
        return response;
      },
    }),
    myActivity: builder.query({
      query: () => ({
        url: `${ISSUE_PREFIX}/users/posts/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["MyActivity"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useListPostsQuery,
  useListCategoryQuery,
  useCreatePostMutation,
  usePostDetailsQuery,
  useCreateCommentMutation,
  useListCommentQuery,
  usePostReactMutation,
  useReportContentMutation,
  useUpdatePostMutation,
  usePostDeleteMutation,
  useCommentsUpdateMutation,
  useCommentDeleteMutation,
  useMyActivityQuery
} = forumApi;
