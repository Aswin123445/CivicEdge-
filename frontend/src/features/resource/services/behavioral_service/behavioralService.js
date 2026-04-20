import { baseApi } from "../../../../services/baseApi";
///user/zone/list
const EXECUTION_PREFIX = "/civic";
export const behavioralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBehavioralList: builder.query({
      query: ({ page = 1, search = "" }) => {
        const params = { page };
        if (search) params.search = search;
        return {
          url: `${EXECUTION_PREFIX}/prompts/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminBehavioralList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createBheavioral: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/prompts/create/`,
        method: "POST",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminBehavioralList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    toggleBehavioralStatus: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/prompts/${id}/toggle/`,
        method: "PATCH",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminBehavioralList"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetBehavioralListQuery,
  useCreateBheavioralMutation,
  useToggleBehavioralStatusMutation,
} = behavioralApi;
