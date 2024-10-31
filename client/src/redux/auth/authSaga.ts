// albumSaga.ts
import { takeLatest, put} from 'redux-saga/effects';
import {
    userLoginSuccess,
    userLoginError,
    checkAccesTokenExpired,
} from './authSlice'; // Import your actions
import {privateAxios,publicAxios} from '../../axios'; // Import your API functions or use axios directly

function* loginSaga(action:any):Generator {
    try {
      console.log("theis si")
        const response:any = yield publicAxios.post("/auth/login", action.payload);
        console.log("Action.Payload", action.payload)
        yield put(userLoginSuccess(response.data)); 
        console.log(response)
      } catch (error:any) {
        console.log(error)
        yield put(userLoginError(error?.response?.data?.message));
      }
   }
  
  function* checkAccessTokenExpiredSaga() {
    try {
      const isTokenValid:boolean = yield privateAxios.get("");
      yield put(checkAccesTokenExpired(isTokenValid));
    } catch (error) {
      yield put(checkAccesTokenExpired(false));
    }
  }

// Watcher saga
export function* authSaga() {
    yield takeLatest("auth/userLogin", loginSaga);
    yield takeLatest("auth/checkAccesTokenExpired", checkAccessTokenExpiredSaga);
  
}
