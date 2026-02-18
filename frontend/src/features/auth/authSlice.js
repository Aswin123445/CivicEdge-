import { createSlice } from '@reduxjs/toolkit';
// import { getToken } from './services/tokenStorage';
// import { authApi } from './services/authApi';
// import {solverAuthApi} from './services/solverAuthApi'
// import { commonApi } from './services/commonApi';
// import { adminAuthApi } from './services/adminAuthApi';

const initialState = {
  role:null,
  user: null,
  access_token:null,
  loading:true,
  status:'loading'
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout_user(state) {
      state.user = null;
      state.access_token = null;
      state.loading = false
      state.role = null
    },
    setStatus(state,action){
      state.status = action.payload
    },
    setUser(state, action) {
      const {access,user_id} = action.payload;
      state.user = user_id;
      state.access_token = access;
    },
    setToken(state, action) {
      state.access_token = action.payload;
    },
    citizenLogin(state,action){
      state.role = action.payload.role 
      state.access_token = action.payload.access;
      state.user = action.payload.email
      state.loading = false
    },
    solverLogin(state,action){
      state.role = action.payload.user.role 
      state.access_token = action.payload.access;
      state.user = action.payload.user.email
      state.loading = false
    },
    googleLogin(state, action) {
      state.user = action.payload.user.email;
      state.access_token = action.payload.access;
      state.loading = false
      state.role = action.payload.user.role
    },
    refreshToken(state, action) {
      state.access_token = action.payload.access;
      state.loading = action.payload.loading
    },
    adminLogin(state,action){
      state.role = action.payload.user.role 
      state.access_token = action.payload.access;
      state.loading = false
      state.user = action.payload.user.email
    },
    role(state,action){
      state.role = action.payload.role 
      state.loading = false
      state.user = action.payload.user
    }
    
  },
});

export const { logout_user,setStatus, setUser, setToken, googleLogin,refreshToken,role,citizenLogin,solverLogin,adminLogin } = slice.actions;
export default slice.reducer;
