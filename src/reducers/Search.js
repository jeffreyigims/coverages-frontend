import { createSlice } from "@reduxjs/toolkit";
import { search } from "../actions/Actions";

export const searchSlice = createSlice({
    name: "search",
    initialState: { results: [], status: "idle" },
    reducers: {},
    extraReducers: {
      [search.pending]: (state, action) => {
        state.status = "loading";
      },
      [search.failed]: (state, action) => {
        state.status = "failed";
      },
      [search.fulfilled]: (state, action) => {
        state.results = action.payload.data;
        state.status = "succeeded";
      },
    },
  });