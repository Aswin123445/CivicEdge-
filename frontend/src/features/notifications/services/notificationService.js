import { baseApi } from "../../../services/baseApi";

const EXECUTION_PREFIX = "/notifications";
export const adminNotificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationCount: builder.query({
      query: () => ({
        url: `${EXECUTION_PREFIX}/unread-count/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["NotificationCount"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getNotificationList: builder.query({
      query: ({ page = 1 }) => {
        const params = { page };
        return {
          url: `${EXECUTION_PREFIX}/list/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["NotificationList"],
      transformResponse: (response) => {
        console.log(response);
        return response;
      },
    }),
    batchMarkNotificationAsRead: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/mark-read-bulk/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["NotificationCount"],
      transformResponse: (response) => {
        return response;
      },
    }),
    markAllNotificationAsRead: builder.mutation({
      query: () => ({
        url: `${EXECUTION_PREFIX}/mark-all-read/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["NotificationCount"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetNotificationCountQuery,
  useGetNotificationListQuery,
  useBatchMarkNotificationAsReadMutation,
  useMarkAllNotificationAsReadMutation,
} = adminNotificationApi;
