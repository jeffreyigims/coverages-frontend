import { runAjax } from "../utils/APIUtils";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const dismissAlert = createAction("alerts/dismissAlert");

function createFetch(name = "") {
  return createAsyncThunk(
    `${name}/fetch_${name}`,
    async (parameters = {}, { rejectWithValue }) => {
      const response = await runAjax(
        `/${name}.json`,
        "GET",
        parameters,
        rejectWithValue
      );
      return response;
    }
  );
}

function createPost(name = "", object = "") {
  return createAsyncThunk(
    `${name}/post_${name}`,
    async (values, { rejectWithValue }) => {
      const response = await runAjax(
        `/${name}.json`,
        "POST",
        {
          [object]: values,
        },
        rejectWithValue
      );
      return response;
    }
  );
}

function createGet(name = "") {
  return createAsyncThunk(
    `${name}/get_${name}`,
    async (id, { rejectWithValue }) => {
      const response = await runAjax(
        `/${name}/${id}.json`,
        "GET",
        {},
        rejectWithValue
      );
      return response;
    }
  );
}

function createUpdate(name = "", object = "") {
  return createAsyncThunk(
    `${name}/update_${name}`,
    async (params, { rejectWithValue }) => {
      const response = await runAjax(
        `/${name}/${params.id}.json`,
        "PATCH",
        {
          [object]: params.values,
        },
        rejectWithValue
      );
      return response;
    }
  );
}

function createDelete(name = "") {
  return createAsyncThunk(
    `${name}/delete_${name}`,
    async (id, { rejectWithValue }) => {
      const response = await runAjax(
        `/${name}/${id}.json`,
        "DELETE",
        {},
        rejectWithValue
      );
      return response;
    }
  );
}

export const fetchSports = createFetch("sports");
export const postSport = createPost("sports", "sport");
export const fetchSport = createGet("sports");
export const updateSport = createUpdate("sports", "sport");
export const deleteSport = createDelete("sports");

export const fetchLeagues = createFetch("leagues");
export const postLeague = createPost("leagues", "league");
export const fetchLeague = createGet("leagues");
export const updateLeague = createUpdate("leagues", "league");
export const deleteLeague = createDelete("leagues");

export const fetchClubs = createFetch("clubs");
export const postClub = createPost("clubs", "club");
export const fetchClub = createGet("clubs");
export const updateClub = createUpdate("clubs", "club");
export const deleteClub = createDelete("clubs");

export const fetchGroups = createFetch("groups");
export const postGroup = createPost("groups", "group");
export const fetchGroup = createGet("groups");
export const updateGroup = createUpdate("groups", "group");
export const deleteGroup = createDelete("groups");

export const fetchCategories = createFetch("categories");
export const postCategory = createPost("categories", "category");
export const fetchCategory = createGet("categories");
export const updateCategory = createUpdate("categories", "category");
export const deleteCategory = createDelete("categories");

export const fetchCompanies = createFetch("companies");
export const postCompany = createPost("companies", "company");
export const fetchCompany = createGet("companies");
export const updateCompany = createUpdate("companies", "company");
export const deleteCompany = createDelete("companies");

export const fetchBrokers = createFetch("brokers");
export const postBroker = createPost("brokers", "broker");
export const fetchBroker = createGet("brokers");
export const updateBroker = createUpdate("brokers", "broker");
export const deleteBroker = createDelete("brokers");

export const fetchCarriers = createFetch("carriers");
export const postCarrier = createPost("carriers", "carrier");
export const fetchCarrier = createGet("carriers");
export const updateCarrier = createUpdate("carriers", "carrier");
export const deleteCarrier = createDelete("carriers");

export const fetchUsers = createFetch("users");
export const postUser = createPost("users", "user");
export const fetchUser = createGet("users");
export const updateUser = createUpdate("users", "user");
export const deleteUser = createDelete("users");

export const postSubCategory = createPost("sub_categories", "sub_category");
export const fetchSubCategory = createGet("sub_categories");
export const updateSubCategory = createUpdate("sub_categories", "sub_category");
export const deleteSubCategory = createDelete("sub_categories");

export const fetchCoverages = createFetch("coverages");
export const postCoverage = createPost("coverages", "coverage");
export const fetchCoverage = createGet("coverages");
export const updateCoverage = createUpdate("coverages", "coverage");
export const deleteCoverage = createDelete("coverages");

export const postClubGroup = createPost("club_groups", "club_group");
export const search = createFetch("search");
export const fetchMetrics = createFetch("metrics");

export const postCoverageCarrier = createPost(
  "coverage_carriers",
  "coverage_carrier"
);
export const deleteCoverageCarrier = createDelete("coverage_carriers");

export const postCoverageBroker = createPost(
  "coverage_brokers",
  "coverage_broker"
);
export const deleteCoverageBroker = createDelete("coverage_brokers");

export function postCoverageAssociations(coverage, carriers, brokers) {
  return (dispatch) => {
    var coverage_id;
    dispatch(postCoverage(coverage)).then((response) => {
      coverage_id = response.payload.data?.id;
    });
    if (coverage_id === null) {
      return;
    }
    carriers.map((carrier_id) =>
      dispatch(
        postCoverageCarrier({
          coverage_id: coverage_id,
          carrier_id: carrier_id,
        })
      )
    );
    brokers.map((broker_id) =>
      dispatch(
        postCoverageBroker({
          coverage_id: coverage_id,
          broker_id: broker_id,
        })
      )
    );
  };
}

export function updateCoverageAssociations(params, carriers, brokers) {
  return async (dispatch) => {
    await carriers.needAdded.map((object) =>
      dispatch(
        postCoverageCarrier({
          coverage_id: params.id,
          carrier_id: object,
        })
      )
    );
    await carriers.needDestroyed.map((object) =>
      dispatch(deleteCoverageCarrier(object))
    );
    await brokers.needAdded.map((object) =>
      dispatch(
        postCoverageBroker({
          coverage_id: params.id,
          broker_id: object,
        })
      )
    );
    await brokers.needDestroyed.map((object) =>
      dispatch(deleteCoverageBroker(object))
    );
    dispatch(updateCoverage(params));
  };
}

export const login = createAsyncThunk(
  `authentication/login`,
  async (auth, { rejectWithValue }) => {
    const response = await runAjax(
      `/user_token`,
      "POST",
      {
        auth,
      },
      rejectWithValue
    );
    return response;
  }
);

export const logout = createAction("authentication/logout");
