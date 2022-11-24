import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../api";
import { action_status, MESSAGE_VARIANT } from "../constants";
import { setMessage } from "./messageSlice";

const initialState = {
  user: null,
  loginStatus: action_status.IDLE,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkApi) => {
    try {
      const { data } = await api.post("/auth/login", { username, password });
      return data;
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.messages &&
          error.response.data.messages[0]) ||
        error.message ||
        error.toString();
        
      thunkApi.dispatch(
        setMessage({ message, variant: MESSAGE_VARIANT.ERROR })
      );

      return thunkApi.rejectWithValue();
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.error = null;
      state.loginStatus = action_status.IDLE;
      state.getUserStatus = action_status.IDLE;
      state.user = null;
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loginStatus = action_status.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = action_status.SUCCEEDED;
        state.user = action.payload.username;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("user", JSON.stringify(action.payload.username));
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = action_status.FAILED;
      });
  },
});

const { actions, reducer } = authSlice;
export const { logout } = actions;
export default reducer;
