import { login, logout } from "../actions/Actions";
import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { logged: localStorage.getItem("jwt") !== null ? true : false },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {},
    [login.rejected]: (state, action) => {},
    [login.fulfilled]: (state, action) => {
      localStorage.setItem("jwt", action.payload.jwt);
      state.logged = true;
    },
    [logout]: (state, action) => {
      localStorage.removeItem("jwt");
      state.logged = false;
    },
  },
});
