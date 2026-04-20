import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/services/authApi';
import { adminAuthApi } from '../features/auth/services/adminAuthApi';
import { commonApi } from '../features/auth/services/commonApi';
import { solverAuthApi } from '../features/auth/services/solverAuthApi';
import { profileApi } from '../features/core/services/coreApi';
import { issueApi } from '../features/issues/services/issue_services';
import { adminExecutionIssueApi } from '../features/issues_execution/services/admin/issue_execution_service';
import { baseApi } from '../services/baseApi';
import { setupListeners } from '@reduxjs/toolkit/query';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer

  },
  middleware: (getDefault) => getDefault()
  .concat(baseApi.middleware)
});
export default store;
setupListeners(store.dispatch);
