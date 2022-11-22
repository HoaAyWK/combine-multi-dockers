import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { action_status } from "../../constant/status";
import instructorApi from "../../api/instructorApi";

export const getInstructor = createAsyncThunk("getInstructor", async () => {
  const response = await instructorApi.getInstructor();
  return response;
});

export const getInstructorId = createAsyncThunk(
  "getInstructorId",
  async (payload) => {
    const response = await instructorApi.getInstructorId(payload);
    return response;
  }
);

export const createInstructor = createAsyncThunk(
  "createInstructor",
  async (payload) => {
    const response = await instructorApi.createInstructor(payload);
    return response;
  }
);

export const deleteInstructor = createAsyncThunk(
  "deleteInstructor",
  async (payload) => {
    const response = await instructorApi.deleteInstructor(payload);
    return response;
  }
);

export const updateInstructor = createAsyncThunk(
  "updateInstructor",
  async (payload) => {
    const response = await instructorApi.updateInstructor(payload);
    return response;
  }
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState: {
    status: action_status.IDLE,
    statusId: action_status.IDLE,
    instructor: {},
    instructorId: {},
    addInstructor: false,
    updateInstructor: false,
    deleteInstructor: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.addInstructor = false;
      (state.updateInstructor = false), (state.deleteInstructor = false);
    },
  },
  extraReducers: {
    [getInstructor.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getInstructor.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.instructor = action.payload;
    },
    [getInstructor.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getInstructorId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getInstructorId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.instructorId = action.payload;
    },
    [getInstructorId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [createInstructor.fulfilled]: (state, action) => {
      state.addInstructor = true;
    },
    [updateInstructor.fulfilled]: (state, action) => {
      state.updateInstructor = true;
    },
    [deleteInstructor.fulfilled]: (state, action) => {
      state.deleteInstructor = true;
    },
  },
});

const { actions, reducer } = instructorSlice;
export const { refresh } = actions;

export default reducer;
