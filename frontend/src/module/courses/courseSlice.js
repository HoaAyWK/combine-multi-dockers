import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseApi from "../../api/courseApi";
import { action_status } from "../../constant/status";

export const getCourse = createAsyncThunk("getCourse", async () => {
  const response = await courseApi.getCourses();
  return response;
});

export const getCourseId = createAsyncThunk("getCourseId", async (payload) => {
  const response = await courseApi.getCoursesId(payload);
  return response;
});

export const createCourse = createAsyncThunk(
  "createCourse",
  async (payload) => {
    const response = await courseApi.createCourse(payload);
    return response;
  }
);

export const updateCourse = createAsyncThunk(
  "updateCourse",
  async (payload) => {
    const response = await courseApi.updateCourse(payload);
    return response;
  }
);

export const deleteCourse = createAsyncThunk(
  "deleteCourse",
  async (payload) => {
    const response = await courseApi.deleteCourse(payload);
    return response;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    status: action_status.IDLE,
    statusId: action_status.IDLE,
    course: {},
    courseId: {},
    addCourse: false,
    updateCourse: false,
    deleteCourse: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.addCourse = false;
      state.updateCourse = false;
      state.deleteCourse = false;
    },
  },
  extraReducers: {
    [getCourse.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getCourse.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.course = action.payload;
    },
    [getCourse.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getCourseId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getCourseId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.courseId = action.payload;
    },
    [getCourseId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [createCourse.fulfilled]: (state, action) => {
      state.addCourse = true;
    },
    [updateCourse.fulfilled]: (state, action) => {
      state.updateCourse = true;
    },
    [deleteCourse.fulfilled]: (state, action) => {
      state.deleteCourse = true;
    },
  },
});

const { actions, reducer } = courseSlice;
export const { refresh } = actions;

export default reducer;
