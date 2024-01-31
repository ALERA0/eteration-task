import { createSlice } from "@reduxjs/toolkit";
import {  getProductsByFilter } from "../../api";

export const getProductsByFilterSlice = createSlice({
  name: "getProductsByFilter",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetProductsByFilter: (state) => {
      state.status = undefined;
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(getProductsByFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      });
  },

});

export const { resetGetProductsByFilter } = getProductsByFilterSlice.actions;

export default getProductsByFilterSlice.reducer;