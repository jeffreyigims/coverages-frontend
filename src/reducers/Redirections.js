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
  login,
} from "../actions/Actions";
import { createSlice } from "@reduxjs/toolkit";

export const redirectionSlice = createSlice({
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
    [login.fulfilled]: (state, action) => {
      state.link = "/coverages";
      state.redirect = true;
    },
  },
});
