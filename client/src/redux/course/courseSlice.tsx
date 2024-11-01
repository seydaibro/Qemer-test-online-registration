import { createSlice } from "@reduxjs/toolkit";
import { ICourse } from "@/interface";

interface InitialState {
  courses: ICourse[];
  isLoading: boolean;
  error: null;
  isAddcourseLoading: boolean;
  isEditCourseLoading: boolean;
  isDeleteCourseLoading: boolean;
}

const initialState: InitialState = {
  courses: [],
  isLoading: false,
  error: null,
  isAddcourseLoading: false,
  isEditCourseLoading: false,
  isDeleteCourseLoading: false,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    getAllCourse: (state) => {
      state.courses = [];
      state.isLoading = true;
      state.error = null;
    },
    getAllCourseSuccess: (state, action) => {
      state.courses = action.payload;
      state.isLoading = false;
    },
    getAllCourseError: (state, action) => {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    addCourse: (state, _action) => {
      state.isAddcourseLoading = true;
      state.error = null;
    },
    addCourseSuccess: (state, action) => {
      state.isAddcourseLoading = false;
      state.courses.push(action.payload);
      state.error = null;
    },
    addCourseError: (state, action) => {
      state.error = action.payload;
      state.isAddcourseLoading = false;
    },
    EditCourse: (state, _action) => {
      state.isEditCourseLoading = true;
    },
    EditCourseSuccess: (state, action) => {
      const { id, updatedCourse } = action.payload;
      // const Brand_id = action.payload.Brand_id;
      const updated_Items = state.courses.reduce(
        (accumulater: ICourse[], c) => {
          if (id === c._id) {
            return [...accumulater, updatedCourse];
          } else {
            return [...accumulater, c];
          }
        },
        []
      );
      state.courses = updated_Items;
      state.isEditCourseLoading = false;
      state.error = null;
    },
    EditCourseError: (state, action) => {
      state.isEditCourseLoading = true;
      state.error = action.payload;
    },
    deleteCourse: (state, _action) => {
      state.isDeleteCourseLoading = true;
      state.error = null;
    },
    deleteCourseSuccess: (state, action) => {
      state.isDeleteCourseLoading = false;
      state.error = null;
      const { id} = action.payload;
      state.courses = state.courses.filter((c) => c._id !== id);
    },
    deleteCourseError: (state, action) => {
      state.isDeleteCourseLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = courseSlice.actions;

export default courseSlice.reducer;
