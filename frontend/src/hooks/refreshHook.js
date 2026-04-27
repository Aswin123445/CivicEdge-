// useAuthBootstrap.js
import { useEffect, useRef } from "react";
import { useRefreshMutation } from "../features/auth/services/authApi";
import { useDispatch } from "react-redux";
import { setStatus } from "../features/auth/authSlice";
import { commonApi } from "../features/auth/services/commonApi";
import { infoToast } from "../utils/Toaster";

export function useAuthBootstrap() {
  const [refresh, { isLoading }] = useRefreshMutation();
  const dispatch = useDispatch();
  const ranRef = useRef(false);
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    (async () => {
      try {
        await refresh().unwrap();
        try {
          const role = await dispatch(
            commonApi.endpoints.role.initiate(),
          ).unwrap();
        } catch (error) {
          infoToast({ title: "Unable to fetch user", description: "please login again" });
        }

        dispatch(setStatus("authenticated"));
      } catch {
        dispatch(setStatus("guest"));
      }
    })();
  }, [refresh, dispatch]);

  return { isLoading };
}
