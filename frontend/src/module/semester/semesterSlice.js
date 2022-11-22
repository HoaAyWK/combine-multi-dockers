import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import semesterApi from "../../api/semesterApi";
import { action_status } from "../../constant/status";

export const getSemester = createAsyncThunk("getSemester", async () => {
  const response = await semesterApi.getSemester();
  return response;
});

export const getSemesterId = createAsyncThunk(
  "getSemesterId",
  async (payload) => {
    const response = await semesterApi.getSemesterId(payload);
    return response;
  }
);

export const createSemester = createAsyncThunk(
  "createSemester",
  async (payload) => {
    const response = await semesterApi.createSemester(payload);
    return response;
  }
);

export const updateSemester = createAsyncThunk(
  "updateSemester",
  async (payload) => {
    const response = await semesterApi.updateSemester(payload);
    return response;
  }
);

export const deleteSemester = createAsyncThunk(
  "deleteSemester",
  async (payload) => {
    const response = await semesterApi.deleteSemester(payload);
    return response;
  }
);

const semesterSlice = createSlice({
  name: "semester",
  initialState: {
    status: action_status.IDLE,
    statusId: action_status.IDLE,
    semester: {},
    semesterId: {},
    addSemester: false,
    updateSemester: false,
    deleteSemester: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.addSemester = false;
      state.updateSemester = false;
      state.deleteSemester = false;
    },
  },
  extraReducers: {
    [getSemester.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getSemester.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.semester = action.payload;
    },
    [getSemester.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getSemesterId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getSemesterId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.semesterId = action.payload;
    },
    [getSemesterId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [createSemester.fulfilled]: (state, action) => {
      state.addSemester = true;
    },
    [updateSemester.fulfilled]: (state, action) => {
      state.updateSemester = true;
    },
    [deleteSemester.fulfilled]: (state, action) => {
      state.deleteSemester = true;
    },
  },
});

const { actions, reducer } = semesterSlice;
export const { refresh } = actions;

export default reducer;
