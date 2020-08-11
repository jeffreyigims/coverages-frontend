import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import { search, fetchMetrics } from "../actions/Actions";
import { createSlice } from "@reduxjs/toolkit";
import { redirectionSlice } from "./Redirections";
import { authenticationSlice } from "./Authentication";
import { alerts } from "./Alerts";

const searchSlice = createSlice({
  name: "search",
  initialState: { results: {}, hits: 0, status: "idle" },
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
      state.hits = action.payload.hits;
      state.status = "succeeded";
    },
  },
});

const metricsSlice = createSlice({
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
      state.coverages = action.payload.data.map(
        (coverage) => coverage.attributes
      );
      state.status = "succeeded";
    },
  },
});

// General reducer used for most tables and operations
function createTableReducer(name = "") {
  let initialState = {
    [name]: [],
    status: "idle",
    errors: null,
    selected: null,
  };
  return function reducer(state = initialState, action) {
    switch (action.type) {
      case `${name}/fetch_${name}/pending`:
        return Object.assign({}, state, {
          status: "loading",
        });
      case `${name}/fetch_${name}/rejected`:
        return Object.assign({}, state, {
          status: "failed",
          errors: action.payload,
        });
      case `${name}/fetch_${name}/fulfilled`:
        return Object.assign({}, state, {
          [name]: action.payload.data,
          status: "succeeded",
        });
      case `${name}/post_${name}/rejected`:
        return Object.assign({}, state, {
          [name]: state[name],
          errors: action.payload,
        });
      case `${name}/post_${name}/fulfilled`:
        return Object.assign({}, state, {
          [name]: state[name].concat(action.payload.data),
          status: "succeeded",
        });
      case `${name}/get_${name}/pending`:
        return Object.assign({}, state, {
          status: "loading",
        });
      case `${name}/get_${name}/rejected`:
        return Object.assign({}, state, {
          status: "failed",
        });
      case `${name}/get_${name}/fulfilled`:
        return Object.assign({}, state, {
          selected: action.payload.data,
          status: "succeeded",
        });
      case `${name}/update_${name}/rejected`:
        return Object.assign({}, state, {
          selected: state.selected,
          errors: action.payload,
        });
      case `${name}/update_${name}/fulfilled`:
        return Object.assign({}, state, {
          selected: action.payload.data,
          status: "succeeded",
        });
      case `${name}/delete_${name}/rejected`:
        return Object.assign({}, state, {
          selected: state.selected,
        });
      case `${name}/delete_${name}/fulfilled`:
        return Object.assign({}, state, {
          status: "succeeded",
        });
      default:
        return state;
    }
  };
}

// Slightly modified reducer from before used for tables that are paginated
function createPaginatedTableReducer(name = "") {
  let initialState = {
    [name]: [],
    rejected: [],
    status: "idle",
    errors: null,
    selected: null,
    defaultActivePage: 1,
    totalPages: null,
  };
  return function reducer(state = initialState, action) {
    switch (action.type) {
      case `${name}/fetch_${name}/pending`:
        return Object.assign({}, state, {
          status: "loading",
        });
      case `${name}/fetch_${name}/rejected`:
        return Object.assign({}, state, {
          status: "failed",
        });
      case `${name}/fetch_${name}/fulfilled`:
        return Object.assign({}, state, {
          [name]: action.payload.objects.data,
          totalPages: action.payload.pages,
          defaultActivePage: action.payload.page,
          status: "succeeded",
        });
      case `${name}/post_${name}/rejected`:
        return Object.assign({}, state, {
          [name]: state[name],
          error: action.payload,
          rejected: state.rejected.concat(action.payload),
        });
      case `${name}/post_${name}/fulfilled`:
        return Object.assign({}, state, {
          [name]: [action.payload.data].concat(state[name]),
          status: "succeeded",
        });
      case `${name}/get_${name}/rejected`:
        return Object.assign({}, state, {
          status: "failed",
        });
      case `${name}/get_${name}/fulfilled`:
        return Object.assign({}, state, {
          selected: action.payload.data,
          status: "succeeded",
        });
      case `${name}/update_${name}/rejected`:
        return Object.assign({}, state, {
          selected: state.selected,
          errors: action.payload,
        });
      case `${name}/update_${name}/fulfilled`:
        return Object.assign({}, state, {
          selected: action.payload.data,
          status: "succeeded",
        });
      case `${name}/delete_${name}/rejected`:
        return Object.assign({}, state, {
          selected: state.selected,
        });
      case `${name}/delete_${name}/fulfilled`:
        return Object.assign({}, state, {
          status: "succeeded",
        });
      default:
        return state;
    }
  };
}

// Reducer used for objects when we want to keep track of associated objects that are posted
function createSpecialTableReducer(name = "", target = "") {
  let initialState = {
    [name]: [],
    status: "idle",
    errors: null,
    selected: null,
    secondary: [],
  };
  return function reducer(state = initialState, action) {
    switch (action.type) {
      case `${name}/fetch_${name}/pending`:
        return Object.assign({}, state, {
          status: "loading",
        });
      case `${name}/fetch_${name}/rejected`:
        return Object.assign({}, state, {
          status: "failed",
          errors: action.payload,
        });
      case `${name}/fetch_${name}/fulfilled`:
        return Object.assign({}, state, {
          [name]: action.payload.data,
          status: "succeeded",
        });
      case `${name}/post_${name}/rejected`:
        return Object.assign({}, state, {
          [name]: state[name],
          errors: action.payload,
        });
      case `${name}/post_${name}/fulfilled`:
        return Object.assign({}, state, {
          [name]: state[name].concat(action.payload.data),
          status: "succeeded",
        });
      case `${name}/get_${name}/pending`:
        return Object.assign({}, state, {
          status: "loading",
        });
      case `${name}/get_${name}/rejected`:
        return Object.assign({}, state, {
          status: "failed",
        });
      case `${name}/get_${name}/fulfilled`:
        return Object.assign({}, state, {
          selected: action.payload.data,
          status: "succeeded",
          secondary: action.payload.data.attributes[target],
        });
      case `${name}/update_${name}/rejected`:
        return Object.assign({}, state, {
          errors: action.payload,
        });
      case `${name}/update_${name}/fulfilled`:
        return Object.assign({}, state, {
          selected: action.payload.data,
          status: "succeeded",
        });
      case `${name}/delete_${name}/rejected`:
        return Object.assign({}, state, {
          selected: state.selected,
        });
      case `${name}/delete_${name}/fulfilled`:
        return Object.assign({}, state, {
          status: "succeeded",
        });
      case `${target}/post_${target}/fulfilled`:
        return Object.assign({}, state, {
          selected: state.selected,
          secondary: state.secondary.concat(action.payload),
        });
      default:
        return state;
    }
  };
}

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  sports: createTableReducer("sports"),
  leagues: createTableReducer("leagues"),
  clubs: createTableReducer("clubs"),
  groups: createTableReducer("groups"),
  club_groups: createTableReducer("club_groups"),
  companies: createSpecialTableReducer("companies", "brokers"),
  brokers: createTableReducer("brokers"),
  carriers: createTableReducer("carriers"),
  users: createTableReducer("users"),
  categories: createSpecialTableReducer("categories", "sub_categories"),
  sub_categories: createTableReducer("sub_categories"),
  coverages: createPaginatedTableReducer("coverages"),
  alerts: alerts,
  redirections: redirectionSlice.reducer,
  search: searchSlice.reducer,
  metrics: metricsSlice.reducer,
  authentication: authenticationSlice.reducer,
});

export default createRootReducer;
