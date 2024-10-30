import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "@/interface";


interface initialState {
  users: IUser[] ,
  token:null ,
  isLoading:boolean,
  error:null,
  isAddUserLoading:boolean,
  isDeletingUserLoading:boolean;
}

const initialState:initialState= {
  users:[],
  token: null,
  isLoading: false,
  error: null,
  isAddUserLoading:false,
  isDeletingUserLoading:false,
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
      const {user_id, edit_user} = action.payload
         const editedUser = state.users.find((user)=> user._id == user_id)
         const updated_users =  state.users.reduce((accumulater:IUser[], user )=>{
                if(user._id === editedUser?._id){
                  return [...accumulater, edit_user]
                }else{
                  return  [...accumulater, user]
                }
         },[]); 


        //  I wantto check if that is happening and remove that user ()
         state.users = updated_users;
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
    deleteUserSuccess:(state, action)=>{
      state.isDeletingUserLoading = false;
      state.error = null
      const {user_id} = action.payload;
      console.log("users in sate.users", JSON.parse(JSON.stringify(state.users)))
      state.users = state.users.filter((user)=> user._id !== user_id)
    },
    deleteUserError:(state, action)=>{
      state.isDeletingUserLoading = false;
      state.error = action.payload
    }
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
} = userSlice.actions;

export default userSlice.reducer;
