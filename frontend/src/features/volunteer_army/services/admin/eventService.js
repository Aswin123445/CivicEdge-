import { baseApi } from "../../../../services/baseApi";

const EXECUTION_PREFIX = "/army/admin/volunteer";
export const AdminEventListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdminEventList: builder.query({
      query: ({ page = 1, search = "", status }) => {
        const params = { page };
        if (search) params.search = search;
        if (status) params.status = status;
        return {
          url: `${EXECUTION_PREFIX}/events-list/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminEventList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/events-create/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminEventList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchGroupEventList: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/events/groups-list`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["ActiveGroupEventList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    publishEvent: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/events/${id}/publish/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminEventList","AdminEventDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    cancelEvent: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/events/${id}/cancel/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminEventList","AdminEventDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    AdminEventDetails: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/events/${id}/details/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["AdminEventDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminUpdateEvent: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/events/${data.id}/update/`,
        method: "patch",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminEventList","AdminEventDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminParcipantList: builder.query({
      query: ({id, page = 1, search = "",status}) => {
        const params = { page }; 
        if (search) params.search = search;
        if (status) params.status = status;
        return {
          url: `${EXECUTION_PREFIX}/events/${id}/participants/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminParcipantList"],
      transformResponse: (response) => {
        return response;
      },
    })
  }),
});
export const {
  useFetchAdminEventListQuery,
  useCreateEventMutation,
  useFetchGroupEventListQuery,
  usePublishEventMutation,
  useCancelEventMutation,
  useAdminEventDetailsQuery,
  useAdminUpdateEventMutation,
  useAdminParcipantListQuery
} = AdminEventListApi;
