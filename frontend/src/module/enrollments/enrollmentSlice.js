import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api";
import { action_status } from "../../constant/status";

export const getEnrollment = createAsyncThunk("enrollment", async () => {
  const response = await Api.getEnrollments();
  return response;
});

export const getEnrollmentId = createAsyncThunk(
  "enrollmentId",
  async (payload) => {
    const response = await Api.getEnrollmentsId(payload);
    return response;
  }
);

export const createEnrollment = createAsyncThunk(
  "createEnrollment",
  async (payload) => {
    const response = await Api.createEnrollments(payload);
    return response;
  }
);

export const deleteEnrollment = createAsyncThunk(
  "deleteEnrollment",
  async () => {
    const response = await Api.deleteEnrollments();
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
    add: false,
    delete: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.add = false;
      state.delete = false;
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
      state.add = true;
    },
    [deleteEnrollment.fulfilled]: (state, action) => {
      state.delete = true;
    },
  },
});

const { actions, reducer } = enrollmentSlice;

export default reducer;
