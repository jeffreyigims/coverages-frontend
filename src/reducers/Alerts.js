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

const actions = ["fetch", "get", "update", "post", "delete"];
const statuses = ["idle", "pending", "rejected", "fulfilled"];

function express(action, status) {
  return `${actions.indexOf(action)}${statuses.indexOf(status)}`;
}

export function alerts(state = { alerts: [] }, action) {
  if (action.type === "alerts/dismissAlert") {
    return { alerts: [] };
  }
  // Split request into components
  // Example request: "sports/fetch_sports/fulfilled"
  const split = action.type.split("/");
  const new_action = split[1].split("_")[0]; // fetch
  // const object = split[1].split("_")[1]; // sports
  const status = split[2]; // fulfilled

  // We use a function to evaluate a key for each combnination to match against
  switch (express(new_action, status)) {
    case express("post", "rejected"):
      return rejected(state, action);
    case express("post", "fulfilled"):
      return fulfilledNew(state);
    case express("update", "rejected"):
      return rejected(state, action);
    case express("update", "fulfilled"):
      return fulfilledUpdated(state);
    case express("delete", "rejected"):
      return rejected(state, action);
    case express("delete", "fulfilled"):
      return fulfilledDeleted(state);
    case express("fetch", "rejected"):
      return rejectedFetch(state, action);
    case express("get", "rejected"):
      return rejectedFetch(state, action);
    default:
      return state;
  }
}
