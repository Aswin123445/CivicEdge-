import { createSlice } from '@reduxjs/toolkit';
// import { getToken } from './services/tokenStorage';
import { authApi } from './services/authApi';
import { commonApi } from './services/commonApi';
import { adminAuthApi } from './services/adminAuthApi';

const initialState = {
  role:null,
  user: null,
  access_token:null,
  loading:true
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout_user(state) {
      state.user = null;
      state.access_token = null;
      state.loading = false
    },
    setUser(state, action) {
      const {access,user_id} = action.payload;
      state.user = user_id;
      state.access_token = access;
    },
    setToken(state, action) {
      state.access_token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.role = payload.role
        state.access_token = payload.access;
        state.user = payload.email
        state.loading = false
      }
    );
    builder.addMatcher(
      authApi.endpoints.googleLogin.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user.email;
        state.access_token = payload.access;
        state.loading = false
      }
    );
    builder.addMatcher(
      authApi.endpoints.refresh.matchFulfilled,
      (state, { payload }) => {
        console.log(payload)
        state.access_token = payload.access;
        state.loading = false
      }
    );
    builder.addMatcher(
      authApi.endpoints.refresh.matchPending,
      (state) => {
        state.loading = true
      }
    );
    builder.addMatcher(
      authApi.endpoints.refresh.matchRejected,
      (state) => {
        state.loading = false
      }
    );
    builder.addMatcher(
      adminAuthApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.access_token = payload.access;
        state.user = payload.email
        state.loading = false
      }
    );
    builder.addMatcher(
      commonApi.endpoints.role.matchFulfilled,
      (state, action) => {
        const data = action.payload
        state.user = data.user;
        state.role = data.role;
        state.loading = false;
      }
    );
  },
});

export const { logout_user, setUser, setToken } = slice.actions;
export default slice.reducer;
