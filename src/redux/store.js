import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  basketSlice,
  getAllProductsSlice,
  getProductDetailsSlice,
  getProductsByFilterSlice,
} from "./slice";

const reducer = combineReducers({
  getAllProducts: getAllProductsSlice,
  getProductsByFilter: getProductsByFilterSlice,
  getProductDetails: getProductDetailsSlice,
  basket: basketSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});
