import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../api";

export const getAllProductsSlice = createSlice({
  name: "getAllProducts",
  initialState: { data: null, status: {}, message: {}, isLoading: false },
  reducers: {
    resetGetAllProducts: (state) => {
      state.status = undefined;
      state.data = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.status;
      });
  },

});

export const { resetGetAllProducts } = getAllProductsSlice.actions;

export default getAllProductsSlice.reducer;