import axiosBaseQuery from "../../../services/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


// here just created auth slice for core feature like home page about and contact page
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api/v1/me' }),
  endpoints: (builder) => ({
    home: builder.query({
      query: () => ({
        url: '/home',
        method: 'get',
        meta: { skipAuth: false },  

      }),
      transformResponse: (response) => {
        console.log(response);
        return response;
      },
    }),
  }),
});
export const { useHomeQuery } = profileApi