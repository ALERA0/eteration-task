import { createSlice } from "@reduxjs/toolkit";
import {  getProductDetails } from "../../api";

export const getProductDetailsSlice = createSlice({
  name: "getProductDetails",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetProductDetails: (state) => {
      state.status = undefined;
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.status;
      });
  },

});

export const { resetGetProductDetails } = getProductDetailsSlice.actions;

export default getProductDetailsSlice.reducer;