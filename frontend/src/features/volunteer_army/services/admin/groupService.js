import { baseApi } from "../../../../services/baseApi";

const EXECUTION_PREFIX = "/army/admin/volunteer";
export const AdminGroupListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdminGroupList: builder.query({
      query: ({ page = 1, search = "", status = "" }) => {
        const params = { page };
        if (search) params.search = search;
        if (status) params.status = status;
        return {
          url: `${EXECUTION_PREFIX}/groups-list/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminGroupList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createAdminGroup: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/groups/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminGroupList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    activateAdminGroup: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/groups/${id}/activate/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminGroupList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    archiveAdminGroup: builder.mutation({
      query:(id) => ({
        url: `${EXECUTION_PREFIX}/groups/${id}/archive/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminGroupList"],
      transformResponse: (response) => {
        return response;
      },
    })
  }),
});

export const {
  useFetchAdminGroupListQuery,
  useCreateAdminGroupMutation,
  useActivateAdminGroupMutation,
  useArchiveAdminGroupMutation
} = AdminGroupListApi;
