import { combineReducers } from "redux";
import {
  dismissAlert,
  deleteSport,
  deleteLeague,
  deleteClub,
  deleteGroup,
  deleteCategory,
  deleteCarrier,
  deleteCompany,
  deleteUser,
} from "./actions/Actions";
import { createSlice } from "@reduxjs/toolkit";

const fulfilledNew = (state) => {
  let alerts = state.alerts.concat({
    message: "The object was successfully added to the system.",
    variant: "success",
  });
  return { alerts };
};

const fulfilledUpdated = (state) => {
  let alerts = state.alerts.concat({
    message: "The object was successfully updated in the system.",
    variant: "success",
  });
  return { alerts };
};

const fulfilledDeleted = (state) => {
  let alerts = state.alerts.concat({
    message: "The object was successfully deleted in the system.",
    variant: "success",
  });
  return { alerts };
};

const rejected = (state, action) => {
  let alerts = state.alerts.concat({
    message: "The action could not be completed for the following reasons:",
    variant: "danger",
    errors: action.payload,
  });
  return { alerts };
};

const rejectedFetch = (state, action) => {
  let alerts = state.alerts.concat({
    message: "The data could not be fetched for the following reasons:",
    variant: "danger",
    errors: action.payload,
  });
  return { alerts };
};

function alerts(state = { alerts: [] }, action) {
  if (action.type === "alerts/dismissAlert") {
    return { alerts: [] };
  }
  const status = action.type.split("/").pop();
  const new_action = action.type.split("/")[1].split("_")[0];
  if (status === "rejected" && new_action !== "fetch" && new_action !== "get") {
    return rejected(state, action);
  }
  if (status === "rejected") {
    return rejectedFetch(state, action);
  }
  if (status === "pending") {
    return state;
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
    [deleteCarrier.fulfilled]: (state, action) => {
      state.link = "/carriers";
      state.redirect = true;
    },
    [deleteCompany.fulfilled]: (state, action) => {
      state.link = "/companies";
      state.redirect = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.link = "/users";
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
          [name]: state[name].concat(action.payload.data),
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
  companies: createTableReducer("companies"),
  brokers: createTableReducer("brokers"),
  carriers: createTableReducer("carriers"),
  users: createTableReducer("users"),
  categories: createTableReducer("categories"),
  coverages: createPaginatedTableReducer("coverages"),
  alerts: alerts,
  redirections: redirectionSlice.reducer,
});

export default reducer;
