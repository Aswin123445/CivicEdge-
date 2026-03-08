import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/services/authApi';
import { adminAuthApi } from '../features/auth/services/adminAuthApi';
import { commonApi } from '../features/auth/services/commonApi';
import { solverAuthApi } from '../features/auth/services/solverAuthApi';
import { profileApi } from '../features/core/services/coreApi';
import { issueApi } from '../features/issues/services/issue_services';
import { adminExecutionIssueApi } from '../features/issues_execution/services/admin/issue_execution_service';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authApi.reducerPath]: authApi.reducer,  
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [solverAuthApi.reducerPath]: solverAuthApi.reducer,
    [issueApi.reducerPath]: issueApi.reducer,
    [adminExecutionIssueApi.reducerPath]: adminExecutionIssueApi.reducer

  },
  middleware: (getDefault) => getDefault()
  .concat(authApi.middleware)
  .concat(adminAuthApi.middleware)
  .concat(commonApi.middleware)
  .concat(solverAuthApi.middleware)
  .concat(profileApi.middleware)
  .concat(issueApi.middleware)
  .concat(adminExecutionIssueApi.middleware)
});
export default store;
