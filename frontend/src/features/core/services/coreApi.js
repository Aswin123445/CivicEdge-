import axiosBaseQuery from "../../../services/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


// here just created auth slice for core feature like home page about and contact page
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api/v1/user' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/register/',
        method: 'post',
        data: credentials,
        // meta: { skipAuth: true },
        withCredentials: false
      }),
      transformResponse: (response) => {
        return {
          user: response.user,
          message: response.message,
        }
      },
    }),
  }),
});