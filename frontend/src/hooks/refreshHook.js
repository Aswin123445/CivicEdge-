// useAuthInit.js
import { useEffect } from "react";
import { useRefreshMutation } from "../features/auth/services/authApi";
import { useSelector } from "react-redux";

export function useAuthInit() {
  const [refresh, { isLoading }] = useRefreshMutation();
  const access_token = useSelector((s) => s.auth.access_token);
  useEffect(() => {
    async function init() {
      if(!access_token){
      try {
        await refresh();
      } catch (err) {
        console.error("Silent refresh failed", err);
      }
      }
    }
    init();
  }, [refresh,access_token]);

  return { isLoading };
}
