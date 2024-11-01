import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/interface";


interface initialState {
  users: IUser[] ,
  token:null ,
  isLoading:boolean,
  error:null,
  isAddUserLoading:boolean,
  isDeletingUserLoading:boolean;
  selectedUser:IUser
}

const initialState:initialState= {
  users:[],
  token: null,
  isLoading: false,
  error: null,
  isAddUserLoading:false,
  isDeletingUserLoading:false,
  selectedUser:null
};

const userSlice= createSlice({
  name: "users",
  initialState,
  reducers: {
    reset:(state)=>{
      state.error = null;
      state.isLoading = false;
    },
    getAllUser:(state)=>{
      state.users = [];
      state.isLoading = true;
      state.error = null;
    },
    getAllUserSucces:(state, action)=>{
    state.users = action.payload.users;
    state.isLoading = false;
    },
    getAllUserError:(state, action)=>{
    state.error = action.payload.message;
    state.isLoading = false;
    },
    userRegister: (state, _action) => {
      state.isAddUserLoading = true;
      state.error = null;
    },
    userRegisterSuccess: (state, action) => {
      state.isAddUserLoading = false;
      state.users.push(action.payload.user);
      state.token = action.payload.token ;
      state.error = null
    },
    userRegisterError: (state, action) => {
      state.error = action.payload;
      state.isAddUserLoading = false;
    },
    editUser:(state, _)=>{
     state.isAddUserLoading  = true;
     state.error = null;
    }, 
    // what if states of the user are none
    editUserSuccess:(state, action)=>{
        //  I wantto check if that is happening and remove that user ()
         state.selectedUser = action.payload;
         state.isAddUserLoading  = false;
    },
    editUserError:(state, action)=>{
        state.error = action.payload;
        state.isAddUserLoading  = false;
    },
    deleteUser:(state, _action)=>{
      state.isDeletingUserLoading = true;
      state.error = null
    }, 
    deleteUserSuccess:(state, _action)=>{
      state.isDeletingUserLoading = false;
      state.error = null
    },
    deleteUserError:(state, action)=>{
      state.isDeletingUserLoading = false;
      state.error = action.payload
    },

    userRegisterToCourse: (state, _action) => {
      state.isAddUserLoading = true;
      state.error = null;
    },
    userRegisterSuccessToCourse: (state, action) => {
      state.isAddUserLoading = false;
      state.users.push(action.payload.user);
      state.token = action.payload.token ;
      state.error = null
    },
    userRegisterToCourseError: (state, action) => {
      state.error = action.payload;
      state.isAddUserLoading = false;
    },
    getUserById: (state,_action) => {
      state.selectedUser = null;
      state.isLoading = true;
      state.error = null;
    },
    // Set the fetched user data
    getUserByIdSuccess: (state, action) => {
      
    
      state.selectedUser = action.payload.user; // Assuming the payload contains the user object
      state.isLoading = false;
    },
    // Handle error while fetching user by ID
    getUserByIdError: (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const {
  userRegisterError,
  userRegister,
  userRegisterSuccess,
  reset,
  getAllUser,
  getAllUserError,
  getAllUserSucces,
  editUser,
  editUserError,
  editUserSuccess,
  deleteUser,
  deleteUserError,
  deleteUserSuccess,
  userRegisterSuccessToCourse,
  userRegisterToCourse,
  userRegisterToCourseError,
  getUserById,
  getUserByIdError,
  getUserByIdSuccess
} = userSlice.actions;

export default userSlice.reducer;
