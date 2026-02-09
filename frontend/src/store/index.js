import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/services/authApi';
import { adminAuthApi } from '../features/auth/services/adminAuthApi';
import { commonApi } from '../features/auth/services/commonApi';
import { solverAuthApi } from '../features/auth/services/solverAuthApi';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,  
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [solverAuthApi.reducerPath]: solverAuthApi.reducer

  },
  middleware: (getDefault) => getDefault()
  .concat(authApi.middleware)
  .concat(adminAuthApi.middleware)
  .concat(commonApi.middleware)
  .concat(solverAuthApi.middleware)
});
export default store;
