import { baseApi } from "../../../../services/baseApi";
const EXECUTION_PREFIX = "/polls/citizen";
export const PollCitizenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchPollHome: builder.query({
      query: () => {
        return {
          url: `${EXECUTION_PREFIX}/home/`,
          method: "GET",
          meta: { skipAuth: true },
        };
      },
      providesTags: ["PollHome"],
      transformResponse: (response) => {
        return response;
      },
    }),
    pollList: builder.query({
      query: ({ page = 1, search = "", ordering = "-created_at" }) => {
        const params = { page }; 
        if (search) params.search = search;
        if (ordering) params.ordering = ordering;
        return {
          url: `${EXECUTION_PREFIX}/active-polls/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["PollList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    pollDetails: builder.query({
      query: (id) => {
        return {
          url: `${EXECUTION_PREFIX}/active-polls/${id}`,
          method: "GET",
          meta: { skipAuth: false },
        };
      },
      providesTags: ["PollDetails"],
      transformResponse: (response) => {
        return response;
      },
    }),
    votePoll: builder.mutation({
      query: ({data,id}) => {
        return {
          url: `${EXECUTION_PREFIX}/active-polls/${id}/vote/`,
          method: "POST",
          meta: { skipAuth: false },
          data
        };
      },
      invalidatesTags: ["PollDetails","PollList","PollHome","MyVotesList"],
      transformResponse: (response) => {
        return response;
      },
    }),
    myVotesList: builder.query({
      query: ({ page = 1, search = "", voted_at = "-voted_at" }) => {
        const params = { page }; 
        if (search) params.search = search;
        if (voted_at) params.ordering = voted_at;
        return {
          url: `${EXECUTION_PREFIX}/my-votes/`,
          method: "GET",
          meta: { skipAuth: false },
          params,
        };
      },
      providesTags: ["MyVotesList"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useFetchPollHomeQuery,
  usePollListQuery,
  usePollDetailsQuery,
  useVotePollMutation,
  useMyVotesListQuery
} = PollCitizenApi;