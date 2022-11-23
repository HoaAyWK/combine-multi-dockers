import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { action_status } from "../../constant/status";
import studentApi from "../../api/studentApi";

export const getStudent = createAsyncThunk("getStudent", async () => {
  const response = await studentApi.getStudent();
  return response;
});

export const getStudentId = createAsyncThunk(
  "getStudentId",
  async (payload) => {
    const response = await studentApi.getStudentId(payload);
    return response;
  }
);

export const createStudent = createAsyncThunk(
  "createStudent",
  async (payload) => {
    const response = await studentApi.createStudent(payload);
    return response;
  }
);

export const updateStudent = createAsyncThunk(
  "updateStudent",
  async (payload) => {
    const response = await studentApi.updateStudent(payload);
    return response;
  }
);

export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (payload) => {
    const response = await studentApi.deleteStudent(payload);
    return response;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    statusStudent: action_status.IDLE,
    statusId: action_status.IDLE,
    student: {},
    studentId: {},
    addStudent: false,
    updateStudent: false,
    deleteStudent: false,
  },
  reducers: {
    refresh: (state, action) => {
      state.addStudent = false;
      state.updateStudent = false;
      state.deleteStudent = false;
    },
  },
  extraReducers: {
    [getStudent.pending]: (state, action) => {
      state.statusStudent = action_status.LOADING;
    },
    [getStudent.fulfilled]: (state, action) => {
      state.statusStudent = action_status.SUCCEEDED;
      state.student = action.payload;
    },
    [getStudent.rejected]: (state, action) => {
      state.statusStudent = action_status.FAILED;
    },
    [getStudentId.pending]: (state, action) => {
      state.statusId = action_status.LOADING;
    },
    [getStudentId.fulfilled]: (state, action) => {
      state.statusId = action_status.SUCCEEDED;
      state.studentId = action.payload;
    },
    [getStudentId.rejected]: (state, action) => {
      state.statusId = action_status.FAILED;
    },
    [createStudent.fulfilled]: (state, action) => {
      state.addStudent = true;
    },
    [updateStudent.fulfilled]: (state, action) => {
      state.updateStudent = true;
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.deleteStudent = true;
    },
  },
});

const { actions, reducer } = studentSlice;
export const { refresh } = actions;

export default reducer;
