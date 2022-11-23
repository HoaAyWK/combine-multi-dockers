import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";
import api from "../api";

const semestersAdapter = createEntityAdapter();

const initialState = semestersAdapter.getInitialState({
  status: action_status.IDLE,
  error: null,
  isAdded: false,
  isDeleted: false,
  isUpdated: false,
});

export const getSemesters = createAsyncThunk(
  "semesters/getSemesters",
  async () => {
    const { data } = await api.get("/semesters");
    console.log(data);
    return data;
  }
);

export const createSemester = createAsyncThunk(
  "semesters/create",
  async (semester, thunkApi) => {
    try {
      const { data } = await api.post("/semesters/create", semester);

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

export const updateSemester = createAsyncThunk(
  "semesters/update",
  async (semester, thunkApi) => {
    try {
      const { data } = await api.put(
        `/semesters/update?id=${semester.id}`,
        semester
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

export const deleteSemester = createAsyncThunk(
  "semesters/delete",
  async (id, thunkApi) => {
    try {
      const { data } = await api.delete(`/semesters/${id}`);

      data.id = id;
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

const semesterslice = createSlice({
  name: "semesters",
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.isAdded = false;
      state.isDeleted = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSemesters.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getSemesters.fulfilled, (state, action) => {
        semestersAdapter.setAll(state, action.payload);
        state.status = action_status.SUCCEEDED;
      })
      .addCase(getSemesters.rejected, (state, action) => {
        state.status = action_status.FAILED;
        state.error = action.error;
      })
      .addCase(createSemester.fulfilled, (state, action) => {
        semestersAdapter.addOne(state, action.payload);
        state.isAdded = true;
      })
      .addCase(createSemester.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteSemester.pending, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(deleteSemester.fulfilled, (state, action) => {
        state.isDeleted = true;
        semestersAdapter.removeOne(state, action.payload);
      })
      .addCase(updateSemester.fulfilled, (state, action) => {
        state.isUpdated = true;
      })
      .addCase(updateSemester.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const {
  selectAll: selectAllSemesters,
  selectById: selectSemesterById,
  selectIds: selectSemesterIds,
} = semestersAdapter.getSelectors((state) => state.semesters);

const { reducer, actions } = semesterslice;
export const { refresh } = actions;

export default reducer;
