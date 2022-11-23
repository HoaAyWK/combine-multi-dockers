import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

export const login = createAsyncThunk("login", async (payload) => {
  const response = await authApi.login(payload);
  localStorage.setItem("token", response.token);
  localStorage.setItem("user", response.username);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    current: localStorage.getItem("user"),
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // cập nhật state về rỗng
      state.current = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { logout } = actions;

export default reducer;
