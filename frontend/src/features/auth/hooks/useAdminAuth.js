import { useLoginMutation } from "../services/adminAuthApi";

export function useAdminAuth() {
    const [login, loginResult] = useLoginMutation();

    return { 
        login, 
        loginStatus: loginResult 
    };
}