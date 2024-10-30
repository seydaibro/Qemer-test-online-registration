import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/authSaga";
import { userSaga } from "./user/userSata";
import { courseSaga } from "./course/courseSaga";


const rootSaga = function* () {
  yield all([
   fork(authSaga),
   fork(userSaga),
   fork(courseSaga)
  ]);
};

export default rootSaga;
