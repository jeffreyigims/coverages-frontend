import { createSlice } from "@reduxjs/toolkit";
import { fetchMetrics } from "../actions/Actions";

export const metricsSlice = createSlice({
    name: "metrics",
    initialState: { coverages: [], status: "idle", error: null },
    reducers: {},
    extraReducers: {
      [fetchMetrics.pending]: (state, action) => {
        state.status = "loading";
      },
      [fetchMetrics.rejected]: (state, action) => {
        state.status = "failed";
      },
      [fetchMetrics.fulfilled]: (state, action) => {
        state.coverages = action.payload.data;
        state.status = "succeeded";
      },
    },
  });
  