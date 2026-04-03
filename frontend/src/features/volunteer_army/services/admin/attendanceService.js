import { baseApi } from "../../../../services/baseApi";
import RejectAttendanceModal from "../../components/admin_event_pending_attendance/RejectAttendanceModal";

const EXECUTION_PREFIX = "/army/admin/volunteer";
export const AdminEventAttendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAdminEventAttendance: builder.query({
      query: ({ page = 1, search = "" }) => {
        const params = { page };
        if (search) params.search = search;
        return {
          url: `${EXECUTION_PREFIX}/attendance/pending/`,
          method: "get",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminEventAttendance"],
      transformResponse: (response) => {
        return response;
      },
    }),
    approvePendingAttendance: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/attendance/${id}/approve/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminEventAttendance"],
      transformResponse: (response) => {
        return response;
      },
    }),
    RejectPendingAttendance: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/attendance/${id}/reject/`,
        method: "post",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminEventAttendance"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useFetchAdminEventAttendanceQuery,
  useApprovePendingAttendanceMutation,
  useRejectPendingAttendanceMutation,
} = AdminEventAttendanceApi;
