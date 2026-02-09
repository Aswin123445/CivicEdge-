import { getToken } from "../features/auth/services/tokenStorage";
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
export default getAuthHeaders