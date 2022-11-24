import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";
import api from "../api";

const enrollmentsAdapter = createEntityAdapter();

const initialState = enrollmentsAdapter.getInitialState({
  status: action_status.IDLE,
  error: null,
  isAdded: false,
  isDeleted: false,
});

export const getEnrollments = createAsyncThunk(
  "enrollments/getEnrollments",
  async () => {
    const { data } = await api.get("/enrollments");
    console.log(data);
    return data;
  }
);

export const createEnrollment = createAsyncThunk(
  "enrollments/create",
  async (enrollment, thunkApi) => {
    try {
      const { data } = await api.post("/enrollments/create", enrollment);

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

export const deleteEnrollment = createAsyncThunk(
  "enrollments/delete",
  async (id, thunkApi) => {
    try {
      await api.delete(`/enrollments/${id}`);

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

const enrollmentslice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.isAdded = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEnrollments.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getEnrollments.fulfilled, (state, action) => {
        enrollmentsAdapter.setAll(state, action.payload);
        state.status = action_status.SUCCEEDED;
      })
      .addCase(getEnrollments.rejected, (state, action) => {
        state.status = action_status.FAILED;
        state.error = action.error;
      })
      .addCase(createEnrollment.fulfilled, (state, action) => {
        state.isAdded = true;
      })
      .addCase(createEnrollment.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteEnrollment.pending, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(deleteEnrollment.fulfilled, (state, action) => {
        state.isDeleted = true;
        enrollmentsAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllEnrollments,
  selectById: selectEnrollmentById,
  selectIds: selectEnrollmentIds,
} = enrollmentsAdapter.getSelectors((state) => state.enrollments);

const { reducer, actions } = enrollmentslice;
export const { refresh } = actions;

export default reducer;
