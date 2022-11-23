import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subjectApi from "../../api/subjectApi";
import { action_status } from "../../constant/status";

export const getSubject = createAsyncThunk("getSubject", async () => {
  const response = await subjectApi.getSubject();
  return response;
});

export const getSubjectId = createAsyncThunk(
  "getSubjecttId",
  async (payload) => {
    const response = await subjectApi.getSubjectId(payload);
    return response;
  }
);

export const createSubject = createAsyncThunk(
  "createSubject",
  async (payload) => {
    const response = await subjectApi.createSubject(payload);
    return response;
  }
);

export const updateSubject = createAsyncThunk(
  "updateSubject",
  async (payload) => {
    const response = await subjectApi.updateSubject(payload);
    return response;
  }
);

export const deleteSubject = createAsyncThunk(
  "deleteSubject",
  async (payload) => {
    const response = await subjectApi.deleteSubject(payload);
    return response;
  }
);

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    status: action_status.IDLE,
    statusId: action_status.IDLE,
    subject: {},
    subjectId: {},
    addSubject: false,
    updateSubject: false,
    deleteSubject: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.addSubject = false;
      state.updateSubject = false;
      state.deleteSubject = false;
    },
  },
  extraReducers: {
    [getSubject.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getSubject.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.subject = action.payload;
    },
    [getSubject.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getSubjectId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getSubjectId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.subjectId = action.payload;
    },
    [getSubjectId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [createSubject.fulfilled]: (state, action) => {
      state.addSubject = true;
    },
    [updateSubject.fulfilled]: (state, action) => {
      state.updateSubject = true;
    },
    [deleteSubject.fulfilled]: (state, action) => {
      state.deleteSubject = true;
    },
  },
});

const { actions, reducer } = subjectSlice;
export const { refresh } = actions;

export default reducer;
