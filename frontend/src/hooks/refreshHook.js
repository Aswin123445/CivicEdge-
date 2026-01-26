// useAuthInit.js
import { useEffect } from "react";
import { useRefreshMutation, } from "../features/auth/services/authApi";
import { useSelector } from "react-redux";
import { useLazyRoleQuery } from "../features/auth/services/commonApi";
export function useAuthInit() {
  const [refresh, { isLoading }] = useRefreshMutation();
  const access_token = useSelector((s) => s.auth.access_token);
  const [triggerRole] = useLazyRoleQuery();
  useEffect(() => {
    async function init() {
      if(!access_token){
      try {
        await refresh().unwrap();
        await triggerRole()

      } catch (err) {
        console.error("Silent refresh failed", err);
      }
      }
    }
    init();
  }, [refresh,access_token,triggerRole]);

  return { isLoading };
}
