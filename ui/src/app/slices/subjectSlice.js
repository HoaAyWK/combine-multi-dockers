import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";
import api from "../api";

const subjectsAdapter = createEntityAdapter();

const initialState = subjectsAdapter.getInitialState({
  status: action_status.IDLE,
  error: null,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
});

export const getSubjects = createAsyncThunk(
  "subjects/getSubjects",
  async () => {
    const { data } = await api.get("/subjects");
    console.log(data);
    return data;
  }
);

export const createSubject = createAsyncThunk(
  "subjects/create",
  async (subject, thunkApi) => {
    try {
      const { data } = await api.post("/subjects/create", subject);

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

export const updateSubject = createAsyncThunk(
  "subjects/update",
  async (subject, thunkApi) => {
    try {
      const { data } = await api.put(
        `/subjects/update?id=${subject.id}`,
        subject
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

export const deleteSubject = createAsyncThunk(
  "subjects/delete",
  async (id, thunkApi) => {
    try {
      await api.delete(`/subjects/${id}`);

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

const subjectslice = createSlice({
  name: "subjects",
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
      .addCase(getSubjects.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        subjectsAdapter.setAll(state, action.payload);
        state.status = action_status.SUCCEEDED;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.status = action_status.FAILED;
        state.error = action.error;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        subjectsAdapter.addOne(state, action.payload);
        state.isAdded = true;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.isUpdated = true;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteSubject.pending, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.isDeleted = true;
        deleteSubject.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllSubjects,
  selectById: selectSubjectById,
  selectIds: selectSubjectIds,
} = subjectsAdapter.getSelectors((state) => state.subjects);

const { reducer, actions } = subjectslice;
export const { refresh } = actions;

export default reducer;
