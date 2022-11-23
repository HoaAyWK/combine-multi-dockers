import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";
import api from "../api";

const studentsAdapter = createEntityAdapter();

const initialState = studentsAdapter.getInitialState({
  status: action_status.IDLE,
  error: null,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
});

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async () => {
    const { data } = await api.get("/students");
    console.log(data);
    return data;
  }
);

export const createStudent = createAsyncThunk(
  "students/create",
  async (student, thunkApi) => {
    try {
      const { data } = await api.post("/students/create", student, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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

export const updateStudent = createAsyncThunk(
  "students/update",
  async (student, thunkApi) => {
    try {
      const { data } = await api.put(
        `/students/update?id=${student.id}`,
        student,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id, thunkApi) => {
    try {
      await api.delete(`/students/${id}`);

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

const studentslice = createSlice({
  name: "students",
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
      .addCase(getStudents.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        studentsAdapter.setAll(state, action.payload);
        state.status = action_status.SUCCEEDED;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.status = action_status.FAILED;
        state.error = action.error;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        studentsAdapter.addOne(state, action.payload);
        state.isAdded = true;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.isUpdated = true;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteStudent.pending, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isDeleted = true;
        studentsAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectIds: selectStudentIds,
} = studentsAdapter.getSelectors((state) => state.students);

const { reducer, actions } = studentslice;
export const { refresh } = actions;

export default reducer;
