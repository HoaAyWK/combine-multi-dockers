import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";
import api from "../api";

const instructorsAdapter = createEntityAdapter();

const initialState = instructorsAdapter.getInitialState({
  status: action_status.IDLE,
  error: null,
  updateStatus: action_status.IDLE,
  isUpdated: false,
  isAdded: false,
  isDeleted: false,
});

export const getInstructors = createAsyncThunk(
  "intructors/getInstructors",
  async () => {
    const { data } = await api.get("/instructors");
    return data;
  }
);

export const createInstructor = createAsyncThunk(
  "instructors/create",
  async (instructor, thunkApi) => {
    try {
      const { data } = await api.post("/instructors/create", instructor, {
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

export const updateInstructor = createAsyncThunk(
  "intructors/update",
  async (instructor, thunkApi) => {
    try {
      const { data } = await api.put(
        `/instructors/update?id=${instructor.id}`,
        instructor,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
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

export const deleteInstructor = createAsyncThunk(
  "instructors/delete",
  async (id, thunkApi) => {
    try {
      await api.delete(`/instructors/${id}`);

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

const instructorslice = createSlice({
  name: "instructors",
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
      .addCase(getInstructors.pending, (state, action) => {
        state.status = action_status.LOADING;
      })
      .addCase(getInstructors.fulfilled, (state, action) => {
        instructorsAdapter.setAll(state, action.payload);
        state.status = action_status.SUCCEEDED;
      })
      .addCase(getInstructors.rejected, (state, action) => {
        state.status = action_status.FAILED;
        state.error = action.error;
      })
      .addCase(createInstructor.pending, (state, aciton) => {
        state.updateStatus = action_status.LOADING;
      })
      .addCase(createInstructor.fulfilled, (state, action) => {
        instructorsAdapter.addOne(state, action.payload);
        state.isAdded = true;
        state.updateStatus = action_status.SUCCEEDED;
      })
      .addCase(createInstructor.rejected, (state, action) => {
        state.error = action.error;
        state.updateStatus = action_status.FAILED;
      })
      .addCase(updateInstructor.pending, (state, action) => {
        state.updateStatus = action_status.LOADING;
      })
      .addCase(updateInstructor.fulfilled, (state, action) => {
        state.isUpdated = true;
        state.updateStatus = action_status.SUCCEEDED;
      })
      .addCase(updateInstructor.rejected, (state, action) => {
        state.error = action.error;
        state.updateStatus = action_status.FAILED;
      })
      .addCase(deleteInstructor.pending, (state, action) => {
        state.isDeleted = false;
      })
      .addCase(deleteInstructor.fulfilled, (state, action) => {
        state.isDeleted = true;
        instructorsAdapter.removeOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllInstructors,
  selectById: selectInstructorById,
  selectIds: selectInstructorIds,
} = instructorsAdapter.getSelectors((state) => state.instructors);

const { reducer, actions } = instructorslice;
export const { refresh } = actions;

export default reducer;
