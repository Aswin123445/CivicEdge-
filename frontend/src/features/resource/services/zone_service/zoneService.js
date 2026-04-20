import { baseApi } from "../../../../services/baseApi";
///user/zone/list
const EXECUTION_PREFIX = "/user/zone";
export const zoneApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getZoneList: builder.query({
      query: ({ page = 1, search = "" }) => {
        const params = { page };
        if (search) params.search = search;
        return {
          url: `${EXECUTION_PREFIX}/list/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminZoneList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createZone: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/create/`,
        method: "POST",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminZoneList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    zoneToggle: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/${id}/toggle/`,
        method: "patch",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminZoneList"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useGetZoneListQuery, useCreateZoneMutation, useZoneToggleMutation } = zoneApi;
