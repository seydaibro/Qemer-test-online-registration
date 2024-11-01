// albumSaga.ts
import { takeLatest, put } from "redux-saga/effects";
import {
  userRegisterSuccess,
  userRegisterError,
  getAllUserSucces,
  getAllUserError,
  editUserError,
  editUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  userRegisterSuccessToCourse,
  userRegisterToCourseError,
  getUserByIdError,
  getUserByIdSuccess
} from "./userSlice"; // Import your actions
import { privateAxios } from "../../axios"; // Import your API functions or use axios directly

function* RegisterSaga(action: any): Generator {
  try {
    console.log("user sage callded");
    const response: any = yield privateAxios.post(
      "/auth/register",
      action.payload
    );
    yield put(userRegisterSuccess(response.data));
    console.log("response", response);
  } catch (error: any) {
    console.log("error", error);
    yield put(userRegisterError(error.response.data.message));
  }
}
function* getAllUsersSaga(): Generator {
  try {
    console.log("user sage callded");
    const response: any = yield privateAxios.get("/user");
    yield put(getAllUserSucces(response.data));
    console.log("response", response);
  } catch (error: any) {
    console.log("error", error);
    yield put(getAllUserError(error.response.data.message));
  }
}


function* EditUserSaga(action: any): Generator {
  try {
    console.log("user sage callded");
    const { id, newData } = action.payload
    const response: any = yield privateAxios.put("/user/edit/" + id, newData);
    yield put(editUserSuccess(response.data));
    console.log("this is from edit course sucess",response.data)
    console.log("response", response);
  } catch (error: any) {
    console.log("error", error);
    yield put(editUserError(error.response.data.message));
  }
}

function* DeleteUserSaga(action: any): Generator {
  try {
    console.log("User delete sage callded");
    const { user_id, } = action.payload;
    const response: any = yield privateAxios.delete("/user/" + user_id);
    yield put(
      deleteUserSuccess({ user_id: user_id })
    );
    console.log("response", response);
  } catch (error: any) {
    console.log("error", error);
    yield put(deleteUserError(error.response.data.error));
  }
}

function* RegisterTocourseSaga(action: any): Generator {
  try {
    console.log("user sage callded", action.payload);
    const { user_id, course_id } = action.payload
    const response: any = yield privateAxios.post("/user/register/course", { user_id, course_id });
    yield put(userRegisterSuccessToCourse({ edit_user: response.data, user_id }));
    console.log("response", response);
  } catch (error: any) {
    console.log("error", error);
    yield put(userRegisterToCourseError(error.response.data.message));
  }
}


function* getUserByIdsSaga(action: any): Generator {
  try {
    console.log("user sage callded");
    const {id} = action.payload
    const response: any = yield privateAxios.get("/user/"+id);
    yield put(getUserByIdSuccess(response.data));
    console.log("response", response);
  } catch (error: any) {
    console.log("error", error);
    yield put(getUserByIdError(error.response.data.message));
  }
}

export function* userSaga() {
  yield takeLatest("users/userRegister", RegisterSaga);
  yield takeLatest("users/getAllUser", getAllUsersSaga);
  yield takeLatest("users/editUser", EditUserSaga);
  yield takeLatest("users/deleteUser", DeleteUserSaga);
  yield takeLatest("users/userRegisterToCourse", RegisterTocourseSaga);
  yield takeLatest("users/getUserById", getUserByIdsSaga);
}
