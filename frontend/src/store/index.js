import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/services/authApi';
import { adminAuthApi } from '../features/auth/services/adminAuthApi';
import { commonApi } from '../features/auth/services/commonApi';
import { solverAuthApi } from '../features/auth/services/solverAuthApi';
import { profileApi } from '../features/core/services/coreApi';
import { issueApi } from '../features/issues/services/issue_services';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,  
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [solverAuthApi.reducerPath]: solverAuthApi.reducer,
    [issueApi.reducerPath]: issueApi.reducer

  },
  middleware: (getDefault) => getDefault()
  .concat(authApi.middleware)
  .concat(adminAuthApi.middleware)
  .concat(commonApi.middleware)
  .concat(solverAuthApi.middleware)
  .concat(profileApi.middleware)
  .concat(issueApi.middleware)
});
export default store;
