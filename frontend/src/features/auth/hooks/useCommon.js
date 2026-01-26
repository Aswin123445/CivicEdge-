import { useLazyRoleQuery } from "../services/commonApi";

export default function useCommon() {
    const [fetchRole, roleStatus] = useLazyRoleQuery();

    return { 
        fetchRole,
        status:roleStatus,
    };
}