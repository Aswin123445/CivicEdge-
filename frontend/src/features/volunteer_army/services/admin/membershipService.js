import { baseApi } from "../../../../services/baseApi";

const EXECUTION_PREFIX = "/army/admin/volunteer";
export const AdminMembershipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdminPendingMembership: builder.query({
      query: ({ page = 1, search = "", ordering }) => {
        const params = { page };
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        return {
          url: `${EXECUTION_PREFIX}/memberships/pending/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminPendingMembership"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminApproveMembership: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/approve/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminPendingMembership","AdminMembershipPendingDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminRejectMembership: builder.mutation({
      query: ({ data, id }) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/reject/`,
        method: "post",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminPendingMembership","AdminMembershipPendingDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    adminMembershipPendingDetails: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["AdminMembershipPendingDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});
export const {
  useFetchAdminPendingMembershipQuery,
  useAdminApproveMembershipMutation,
  useAdminRejectMembershipMutation,
  useAdminMembershipPendingDetailsQuery,
} = AdminMembershipApi;
