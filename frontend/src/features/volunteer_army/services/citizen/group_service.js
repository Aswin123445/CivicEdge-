import { use } from "react";
import { baseApi } from "../../../../services/baseApi";
const EXECUTION_PREFIX = "/army/citizen/volunteer";
export const solverExecutionIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchGroupList: builder.query({
      query: ({ page = 1, search = "",membership_type}) => {
        const params = { page };
        if (search) params.search = search;
        if (membership_type) params.membership_type = membership_type;
        return {
          url: `${EXECUTION_PREFIX}/groups/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        }
      },
      providesTags: ["VolunteerGroupList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchGroupDetail: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/groups/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["VolunteerGroupDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    applyGroupJoin: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/groups/${id}/join/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["VolunteerGroupDetail"],
    }),
    fetchMembershipDetail: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["VolunteerMembershipDetail"],
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchMembershipEvidenceList: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/evidences/list/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["VolunteerMembershipEvidenceList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    uploadEvidence: builder.mutation({
      query: ({data,id}) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/evidences/`,
        method: "post",
        data,
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["VolunteerMembershipEvidenceList"],
    }), 
    deleteEvidence: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/evidences/${id}/delete/`,
        method: "delete",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["VolunteerMembershipEvidenceList"],
    }),
    submitEvidence: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/submit/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["VolunteerMembershipEvidenceList","VolunteerMembershipDetail","VolunteerGroupDetail"],
    }),
    leavegroup: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/memberships/${id}/leave/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["VolunteerMembershipEvidenceList","VolunteerMembershipDetail","VolunteerGroupDetail"],
    }),
    myGroups: builder.query({
      query: ({ page = 1}) => ({
        url: `${EXECUTION_PREFIX}/my-groups/`,
        method: "get",
        meta: { skipAuth: false },
        params: { page },
      }),
      providesTags: ["MyGroups"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useFetchGroupListQuery,
  useFetchGroupDetailQuery,
  useApplyGroupJoinMutation,
  useFetchMembershipDetailQuery,
  useFetchMembershipEvidenceListQuery,
  useUploadEvidenceMutation,
  useDeleteEvidenceMutation,
  useSubmitEvidenceMutation,
  useLeavegroupMutation,
  useMyGroupsQuery
} = solverExecutionIssueApi;