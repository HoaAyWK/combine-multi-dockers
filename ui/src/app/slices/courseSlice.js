import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";
import api from "../api";

const coursesAdapter = createEntityAdapter();

const initialState = coursesAdapter.getInitialState({
  status: action_status.IDLE,
  error: null,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
});

export const getCourses = createAsyncThunk("courses/getCourses", async () => {
  const { data } = await api.get("/courses");
  console.log(data);
  return data;
});

export const createCourse = createAsyncThunk(
  "courses/create",
  async (course, thunkApi) => {
    try {
      const { data } = await api.post("/courses/create", course);

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkApi.dispatch(
        setMessage({ message, variant: MESSAGE_VARIANT.ERROR })
      );

      return thunkApi.rejectWithValue();
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async (courses, thunkApi) => {
    try {
      const { data } = await api.put(
        `/courses/update?id=${courses.id}`,
        courses
      );

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkApi.dispatch(
        setMessage({ message, variant: MESSAGE_VARIANT.ERROR })
      );

      return thunkApi.rejectWithValue();
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id, thunkApi) => {
    try {
      await api.delete(`/courses/${id}`);
      
      return id;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkApi.dispatch(
        setMessage({ message, variant: MESSAGE_VARIANT.ERROR })
      );

      return thunkApi.rejectWithValue();
    }
  }
);

const courseslice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.isUpdated = false;
      state.isAdded = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        coursesAdapter.setAll(state, action.payload);
        state.status = action_status.SUCCEEDED;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.status = action_status.FAILED;
        state.error = action.error;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isAdded = true;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isUpdated = true;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteCourse.pending, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isDeleted = true;
        coursesAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCourseIds,
} = coursesAdapter.getSelectors((state) => state.courses);

const { reducer, actions } = courseslice;
export const { refresh } = actions;

export default reducer;
