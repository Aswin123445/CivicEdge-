import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/services/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,  //store the result in store eg -> mailbox
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware), //make funtions like cashing ,refresh,revaliation etc -> postman
});
