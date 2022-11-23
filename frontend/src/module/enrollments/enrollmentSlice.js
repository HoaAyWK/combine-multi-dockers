import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enrollmentApi from "../../api/enrollmentApi";
import { action_status } from "../../constant/status";

export const getEnrollment = createAsyncThunk("getEnrollment", async () => {
  const response = await enrollmentApi.getEnrollments();
  return response;
});

export const getEnrollmentId = createAsyncThunk(
  "getEnrollmentId",
  async (payload) => {
    const response = await enrollmentApi.getEnrollmentsId(payload);
    return response;
  }
);

export const createEnrollment = createAsyncThunk(
  "createEnrollment",
  async (payload) => {
    const response = await enrollmentApi.createEnrollments(payload);
    return response;
  }
);

export const deleteEnrollment = createAsyncThunk(
  "deleteEnrollment",
  async (payload) => {
    const response = await enrollmentApi.deleteEnrollments(payload);
    return response;
  }
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: {
    status: action_status.IDLE,
    statusId: action_status.IDLE,
    enrollment: {},
    enrollmentId: {},
    addEnrollment: false,
    deleteEnrollment: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.addEnrollment = false;
      state.deleteEnrollment = false;
    },
  },
  extraReducers: {
    [getEnrollment.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getEnrollment.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.enrollment = action.payload;
    },
    [getEnrollment.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getEnrollmentId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getEnrollmentId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.enrollmentId = action.payload;
    },
    [getEnrollmentId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [createEnrollment.fulfilled]: (state, action) => {
      state.addEnrollment = true;
    },
    [deleteEnrollment.fulfilled]: (state, action) => {
      state.deleteEnrollment = true;
    },
  },
});

const { actions, reducer } = enrollmentSlice;
export const { refresh } = actions;

export default reducer;
