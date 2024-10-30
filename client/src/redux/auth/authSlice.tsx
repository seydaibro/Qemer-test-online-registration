import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/interface";



interface initialState {
  user:IUser ,
  token:null ,
  isLoading:boolean,
  error:null,
  isAuthenticated:boolean,
  isTokenValid:boolean
}

const initialState:initialState= {
  user: null ,
  token: null,
  isLoading: false,
  error: null,
  isTokenValid: false,
  isAuthenticated:false
};

const authSlice= createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    setAcessToken: (state, action) => {
      state.token = action.payload.token;
    },
    checkAccesTokenExpired: (state, action) => {
      state.isTokenValid = action.payload;
    },
    userLogin: (state, _action) => {
      state.isLoading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null
      state.token = action.payload.token ;
    },
    userLoginError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userLogout: (state) => {
      state.user = null,
      state.token = null,
      state.isLoading =  false,
      state.error = null,
      state.isTokenValid =  false,
      state.isAuthenticated = false
    },
    updatePermission:(state, action)=>{
     state.user = action.payload
    }
  },
});

export const {
  reset,
  setAcessToken,
  checkAccesTokenExpired,
  userLogin,
  userLoginError,
  userLoginSuccess,
  userLogout,
  updatePermission
} = authSlice.actions;




export default authSlice.reducer;
