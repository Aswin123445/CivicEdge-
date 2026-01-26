import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/services/authApi';
import { adminAuthApi } from '../features/auth/services/adminAuthApi';
import { commonApi } from '../features/auth/services/commonApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,  
    [adminAuthApi.reducerPath]: adminAuthApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer

  },
  middleware: (getDefault) => getDefault()
  .concat(authApi.middleware)
  .concat(adminAuthApi.middleware)
  .concat(commonApi.middleware),
});
export default store;
