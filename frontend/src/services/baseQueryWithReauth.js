// baseQueryWithReauth.js
import axios from "axios";
import axiosBaseQuery from "./axiosBaseQuery";
import { setToken, logout_user } from "../features/auth/authSlice";

const AUTH_BASE_URL = "/api/v1/user";
let refreshPromise = null;

const baseQueryWithReauth =
  ({ baseUrl = "" } = {}) =>
  async (args, api, extraOptions) => {
    const baseQuery = axiosBaseQuery({ baseUrl });

    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status !== 401) {
      return result;
    }

    
    if (
      args.meta?.skipAuth === true ||
      args.url.includes("/login") ||
      args.url.includes("/refresh")
    ) {
      return result;
    }

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${AUTH_BASE_URL}/refresh/`, {}, { withCredentials: true })
          .then((res) => {
            const newAccessToken = res.data.access;
            api.dispatch(setToken(newAccessToken));
            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      result = await baseQuery(
        { ...args, meta: { ...args.meta, skipAuth: false } },
        api,
        extraOptions
      );

      return result;
    } catch (err) {
      api.dispatch(logout_user()); 
      return result;
    }
  };

export default baseQueryWithReauth;
