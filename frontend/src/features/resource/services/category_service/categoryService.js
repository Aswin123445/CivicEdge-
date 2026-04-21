import { baseApi } from "../../../../services/baseApi";

const EXECUTION_PREFIX = "/civic/issues";
export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminIssueListCategory: builder.query({
      query: ({ page = 1, search = "" }) => {
        const params = { page };
        if (search) params.search = search;
        return {
          url: `${EXECUTION_PREFIX}/categories-admin/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["AdminCategoryList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${EXECUTION_PREFIX}/categories-admin/create/`,
        method: "POST",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminCategoryList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    categoryUpdate: builder.mutation({
      query: ({data,id}) => ({
        url: `${EXECUTION_PREFIX}/categories-admin/${id}/update/`,
        method: "PATCH",
        meta: { skipAuth: false },
        data,
      }),
      invalidatesTags: ["AdminCategoryList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    toggleCategoryStatus: builder.mutation({
      query: (id) => ({
        url: `${EXECUTION_PREFIX}/categories-admin/${id}/toggle/`,
        method: "PATCH",
        meta: { skipAuth: false },
      }),
      invalidatesTags: ["AdminCategoryList"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useAdminIssueListCategoryQuery,
  useCreateCategoryMutation,
  useCategoryUpdateMutation,
  useToggleCategoryStatusMutation,
} = categoryApi;
