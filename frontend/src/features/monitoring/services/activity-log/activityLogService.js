import { baseApi } from "../../../../services/baseApi";

const EXECUTION_PREFIX = "/me";
export const activityLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: ({ page = 1,search = "",ordering = "-created_at",entity="",action=""}) => {
        const params = { page }; 
        if (action) params.action = action;
        if (entity) params.entity = entity;
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        return {
          url: `${EXECUTION_PREFIX}/activity/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminActivityLogs"],
      transformResponse: (response) => {
        console.log(response,'response from service')
        return response;
      },
    }),
  }),
});

export const { useGetActivityLogsQuery } = activityLogApi;