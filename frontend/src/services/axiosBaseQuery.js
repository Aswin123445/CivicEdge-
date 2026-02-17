import axios from 'axios';
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params ,withCredentials = true,meta = {skipAuth: true} },api) => {
     const token = api.getState().auth.access_token;
      const headers = {};
      if (token && !meta.skipAuth) {
        headers.Authorization = `Bearer ${token}`;
      }
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        withCredentials: withCredentials,
        headers
      });
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: axiosError.response
          ? {
              status: axiosError.response.status,
              data: axiosError.response.data,
            }
          : { status: 500, data: axiosError.message },
      };
    }
  };

export default axiosBaseQuery;