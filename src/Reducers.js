import { combineReducers } from "redux";
import {
  deleteSport,
  deleteLeague,
  deleteClub,
  deleteGroup,
  deleteCategory,
  deleteCarrier,
  deleteCompany,
  deleteBroker,
  deleteUser,
  deleteSubCategory,
  deleteCoverage,
  search,
  fetchMetrics,
} from "./actions/Actions";
import { createSlice } from "@reduxjs/toolkit";

const fulfilledNew = (state) => {
  let alerts = [].concat({
    message: "The object was successfully added to the system.",
    variant: "success",
  });
  return { alerts };
};

const fulfilledUpdated = (state) => {
  let alerts = [].concat({
    message: "The object was successfully updated in the system.",
    variant: "success",
  });
  return { alerts };
};

const fulfilledDeleted = (state) => {
  let alerts = [].concat({
    message: "The object was successfully deleted in the system.",
    variant: "success",
  });
  return { alerts };
};

const rejected = (state, action) => {
  let alerts = [].concat({
    message: "The action could not be completed.",
    variant: "danger",
    errors: action.payload,
  });
  return { alerts };
};

const rejectedFetch = (state, action) => {
  let alerts = [].concat({
    message: "The data could not be fetched.",
    variant: "danger",
    errors: action.payload.data,
  });
  return { alerts };
};

function alerts(state = { alerts: [] }, action) {
  if (action.type === "alerts/dismissAlert") {
    return { alerts: [] };
  }
  const split = action.type.split("/");
  const status = split[2];
  const new_action = split[1].split("_")[0];
  const object = split[1].split("_")[1];
  if (
    status === "pending" ||
    object === "coverage_brokers" ||
    object === "coverage_carriers"
  ) {
    return state;
  }
  if (status === "rejected" && new_action !== "fetch" && new_action !== "get") {
    return rejected(state, action);
  }
  if (status === "rejected") {
    return rejectedFetch(state, action);
  }

  switch (new_action) {
    case "post":
      return fulfilledNew(state);
    case "update":
      return fulfilledUpdated(state);
    case "delete":
      return fulfilledDeleted(state);
    default:
      return state;
  }
}

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

const redirectionSlice = createSlice({
  name: "redirections",
  initialState: { link: "", redirect: false },
  reducers: {},
  extraReducers: {
    [deleteSport.fulfilled]: (state, action) => {
      state.link = "/sports";
      state.redirect = true;
    },
    [deleteLeague.fulfilled]: (state, action) => {
      state.link = "/leagues";
      state.redirect = true;
    },
    [deleteClub.fulfilled]: (state, action) => {
      state.link = "/clubs";
      state.redirect = true;
    },
    [deleteGroup.fulfilled]: (state, action) => {
      state.link = "/groups";
      state.redirect = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.link = "/categories";
      state.redirect = true;
    },
    [deleteSubCategory.fulfilled]: (state, action) => {
      const id = action.payload.data.attributes.category_id;
      state.link = "/categories/".concat(id);
      state.redirect = true;
    },
    [deleteCarrier.fulfilled]: (state, action) => {
      state.link = "/carriers";
      state.redirect = true;
    },
    [deleteCompany.fulfilled]: (state, action) => {
      state.link = "/companies";
      state.redirect = true;
    },
    [deleteBroker.fulfilled]: (state, action) => {
      const id = action.payload.data.attributes.company.id;
      state.link = "/companies/".concat(id);
      state.redirect = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.link = "/users";
      state.redirect = true;
    },
    [deleteCoverage.fulfilled]: (state, action) => {
      state.link = "/coverages";
      state.redirect = true;
    },
  },
});

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
      // case `${name}/delete_${name}/fulfilled`:
      //   return Object.assign({}, state, {
      //     status: "succeeded",
      //   });
      default:
        return state;
    }
  };
}

function createPaginatedTableReducer(name = "") {
  let initialState = {
    [name]: [],
    status: "idle",
    errors: null,
    selected: null,
    page: 1,
    pages: null,
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
          pages: action.payload.pages,
          page: action.payload.page,
          status: "succeeded",
        });
      case `${name}/post_${name}/rejected`:
        return Object.assign({}, state, {
          [name]: state[name],
          error: action.payload,
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
      // case `${name}/delete_${name}/fulfilled`:
      //   return Object.assign({}, state, {
      //     status: "succeeded",
      //   });
      default:
        return state;
    }
  };
}

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
          status: "failed",
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
      // case `${name}/delete_${name}/fulfilled`:
      //   return Object.assign({}, state, {
      //     status: "succeeded",
      //   });
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

const reducer = combineReducers({
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
});

export default reducer;
