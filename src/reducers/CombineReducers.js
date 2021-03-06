import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { redirectionSlice } from "./Redirections";
import { authenticationSlice } from "./Authentication";
import { searchSlice } from "./Search";
import { metricsSlice } from "./Metrics";
import { alerts } from "./Alerts";

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
    pending: [],
    carriers: [],
    brokers: [],
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
        });
      case `${name}/post_${name}/fulfilled`:
        return Object.assign({}, state, {
          [name]: [action.payload.data].concat(state[name]),
          pending: state.pending.filter(
            (coverage) => coverage.id !== action.payload.id
          ),
          status: "succeeded",
        });
      case `${name}/get_${name}/rejected`:
        return Object.assign({}, state, {
          status: "failed",
        });
      case `${name}/get_${name}/fulfilled`:
        return Object.assign({}, state, {
          selected: action.payload.data,
          carriers: state.carriers.concat(
            action.payload.data.attributes.coverage_carriers.map((c) => c.data)
          ),
          brokers: state.brokers.concat(
            action.payload.data.attributes.coverage_brokers.map((b) => b.data)
          ),
          status: "succeeded",
        });
      case `${name}/update_${name}/rejected`:
        return Object.assign({}, state, {
          selected: state.selected,
          errors: action.payload,
        });
      case `${name}/update_${name}/fulfilled`:
        let coverage = action.payload.data;
        return Object.assign({}, state, {
          selected: action.payload.data,
          carriers: state.carriers,
          brokers: state.brokers,
          status: "succeeded",
          [name]: state[name].map((object) =>
            object.attributes.id === coverage.attributes.id ? coverage : object
          ),
        });
      case `${name}/delete_${name}/rejected`:
        return Object.assign({}, state, {
          selected: state.selected,
        });
      case `${name}/delete_${name}/fulfilled`:
        return Object.assign({}, state, {
          status: "succeeded",
        });
      case "coverages/postCoveragePending":
        return Object.assign({}, state, {
          pending: state.pending.concat(action.payload),
        });
      case "coverages/deleteCoveragePending":
        return Object.assign({}, state, {
          pending: state.pending.filter(
            (coverage) => coverage.id !== action.payload
          ),
        });
      case "coverage_brokers/post_coverage_brokers/fulfilled":
        return Object.assign({}, state, {
          selected: state.selected,
          brokers: state.brokers.concat(action.payload.data),
        });
      case "coverage_carriers/post_coverage_carriers/fulfilled":
        return Object.assign({}, state, {
          selected: state.selected,
          carriers: state.carriers.concat(action.payload.data),
        });
      case "coverage_brokers/delete_coverage_brokers/fulfilled":
        return Object.assign({}, state, {
          selected: state.selected,
          brokers: state.brokers.filter(
            (broker) =>
              broker.attributes.id !== action.payload.data.attributes.id
          ),
        });
      case "coverage_carriers/delete_coverage_carriers/fulfilled":
        return Object.assign({}, state, {
          selected: state.selected,
          carriers: state.carriers.filter(
            (carrier) =>
              carrier.attributes.id !== action.payload.data.attributes.id
          ),
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

const createRootReducer = (history) =>
  combineReducers({
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
