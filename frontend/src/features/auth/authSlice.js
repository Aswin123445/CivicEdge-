import { createSlice } from '@reduxjs/toolkit';
import { getToken } from './services/tokenStorage';
import { authApi } from './services/authApi';

const initialState = {
  user: null,
  token: getToken(),
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;  
        state.token = payload.token;
      }
    );
  },
});

export const { logout, setUser, setToken } = slice.actions;
export default slice.reducer;
