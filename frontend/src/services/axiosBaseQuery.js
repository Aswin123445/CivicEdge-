import axios from 'axios';
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params ,withCredentials = true,meta = {skipAuth: true} }) => {
    const { default: store } = await import('../store');
    const token = store.getState().auth.access_token;
      const headers = meta?.skipAuth
      ? {} // public endpoints: no Authorization header
      : token
      ? { Authorization: `Bearer ${token}` }
      : {};
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