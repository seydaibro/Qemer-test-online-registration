// albumSaga.ts
import { takeLatest, put } from "redux-saga/effects";
import {
  addCourse,
  addCourseError,
  getAllCourseSuccess,
  reset,
  addCourseSuccess,
  getAllCourse,
  EditCourse,
  getAllCourseError,
  EditCourseError,
  EditCourseSuccess,
  deleteCourseError,
  deleteCourseSuccess,
  deleteCourse,
} from "./courseSlice"; // Import your actions
import { privateAxios } from "../../axios"; // Import your API functions or use axios directly

function* addCourseSaga(action: any): Generator {
  try {
    console.log("action.payload", action.payload)
    const response: any = yield privateAxios.post(
      "/course/create",
      action.payload
    );
    yield put(addCourseSuccess(response.data));
  } catch (error: any) {
    yield put(addCourseError(error.response.data.message));
  }
}
function* getAllCourseSaga(): Generator {
  try {
    const response: any = yield privateAxios.get("/course");
    yield put(getAllCourseSuccess(response.data));
  } catch (error: any) {
    yield put(getAllCourseError(error.response.data.message));
  }
}

function* EditCourseSaga(action: any): Generator {
  try {
    const { id, newData } = action.payload;

    const response: any = yield privateAxios.put("/course/edit/" + id, newData);
    yield put(
     EditCourseSuccess({ course_id: id, updateCourse: response.data })
    );
  } catch (error: any) {
    yield put(EditCourseError(error.response.data.error));
  }
}

function* DeleteCourseSaga(action: any): Generator {
  try {
    const { id } = action.payload;
    yield privateAxios.delete("/course/delete/" + id);
    yield put(deleteCourseSuccess(id));
  } catch (error: any) {
    yield put(deleteCourseError(error.response.data.error));
  }
}
export function* courseSaga() {
  yield takeLatest("courses/addCourse", addCourseSaga);
  yield takeLatest("courses/getAllCourse", getAllCourseSaga);
  yield takeLatest("courses/EditCourse", EditCourseSaga);
  yield takeLatest("courses/deleteCourse", DeleteCourseSaga);
}
