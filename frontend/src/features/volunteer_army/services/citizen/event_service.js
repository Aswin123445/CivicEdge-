import { baseApi } from "../../../../services/baseApi";
const EXECUTION_PREFIX = "/army/citizen/volunteer";
export const solverExecutionIssueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchEventList: builder.query({
      query: ({ page = 1, search = "", on_status,id }) => {
        const params = { page };
        if (search) params.search = search;
        if (on_status) params.on_status = on_status;
        return {
          url: `${EXECUTION_PREFIX}/${id}/events-list/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["EventList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    fetchEventDetails: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/events/${id}/details/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["EventDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    joinEvent: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/events/${id}/join/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["EventDetails", "EventList","VolunteerSummary"],
      transformResponse: (response) => {
        return response;
      },
    }),
    leaveEvent: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/participations/${id}/leave/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["EventDetails", "EventList","VolunteerSummary"],
      transformResponse: (response) => {
        return response;
      },
    }),
    uploadEventEvidence: builder.mutation({
      query: ({data,id}) => ({
        url: `${EXECUTION_PREFIX}/participations/${id}/submit-attendance/`,
        method: "post",
        meta: { skipAuth: false },
        data
      }),
      invalidatesTags: ["EventDetails", "EventList","MyParticipation"],
      transformResponse: (response) => {
        return response;
      },
    }),
    myPartcipation: builder.query({
      query: ({ page = 1, search = "", on_status}) => {
        const params = { page };
        if (search) params.search = search;
        if (on_status) params.on_status = on_status;
        return {
          url: `${EXECUTION_PREFIX}/my-participations/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        }
      },
      providesTags: ["MyParticipation"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getEventCertifiateVerify: builder.query({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/certificates/${id}/verify/`,
        method: "get",
        meta: { skipAuth: false },
      }),
      providesTags: ["EventDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useFetchEventListQuery,
  useFetchEventDetailsQuery,
  useJoinEventMutation,
  useLeaveEventMutation,
  useUploadEventEvidenceMutation,
  useMyPartcipationQuery,
  useGetEventCertifiateVerifyQuery
} = solverExecutionIssueApi;
