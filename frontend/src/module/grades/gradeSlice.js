import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { action_status } from "../../constant/status";
import gradeApi from "../../api/gradeApi";

export const getGrade = createAsyncThunk("getGrade", async () => {
  const response = await gradeApi.getGrades();
  return response;
});

export const getGradeId = createAsyncThunk("getGradeId", async (payload) => {
  const response = await gradeApi.getGradesId(payload);
  return response;
});

export const createGrade = createAsyncThunk("createGrade", async (payload) => {
  const response = await gradeApi.createGrades(payload);
  return response;
});

export const deleteGrade = createAsyncThunk("deleteGrade", async (payload) => {
  const response = await gradeApi.deleteGrades(payload);
  return response;
});

const gradeSlice = createSlice({
  name: "grade",
  initialState: {
    status: action_status.IDLE,
    statusId: action_status.IDLE,
    grade: {},
    gradeId: {},
    addGrade: false,
    deleteGrade: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.addGrade = false;
      state.deleteGrade = false;
    },
  },
  extraReducers: {
    [getGrade.pending]: (state, action) => {
      state.status = action_status.LOADING;
    },
    [getGrade.fulfilled]: (state, action) => {
      state.status = action_status.SUCCEEDED;
      state.grade = action.payload;
    },
    [getGrade.rejected]: (state, action) => {
      state.status = action_status.FAILED;
    },
    [getGradeId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getGradeId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.gradeId = action.payload;
    },
    [getGradeId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [createGrade.fulfilled]: (state, action) => {
      state.addGrade = true;
    },
    [deleteGrade.fulfilled]: (state, action) => {
      state.deleteGrade = true;
    },
  },
});

const { actions, reducer } = gradeSlice;
export const { refresh } = actions;

export default reducer;
