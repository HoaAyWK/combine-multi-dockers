import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";
import api from "../api";

const gradesAdapter = createEntityAdapter();

const initialState = gradesAdapter.getInitialState({
  status: action_status.IDLE,
  error: null,
  isAdded: false,
  isDeleted: false,
});

export const getGrades = createAsyncThunk("grades/getGrades", async () => {
  const { data } = await api.get("/grades");
  console.log(data);
  return data;
});

export const createGrade = createAsyncThunk(
  "grades/create",
  async (grade, thunkApi) => {
    try {
      const { data } = await api.post("/grades/create", grade);

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

export const deleteGrade = createAsyncThunk(
  "grades/delete",
  async (id, thunkApi) => {
    try {
      const { data } = await api.delete(`/grades/${id}`);

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

const gradeslice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.isAdded = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGrades.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getGrades.fulfilled, (state, action) => {
        gradesAdapter.setAll(state, action.payload);
        state.status = action_status.SUCCEEDED;
      })
      .addCase(getGrades.rejected, (state, action) => {
        state.status = action_status.FAILED;
        state.error = action.error;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        gradesAdapter.addOne(state, action.payload);
        state.isAdded = true;
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteGrade.pending, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.isDeleted = true;
        gradesAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllGrades,
  selectById: selectGradeById,
  selectIds: selectGradeIds,
} = gradesAdapter.getSelectors((state) => state.grades);

const { reducer, actions } = gradeslice;
export const { refresh } = actions;

export default reducer;
