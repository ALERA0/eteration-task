import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = baseUrl;

const getAllProducts = createAsyncThunk(
  "getAllProducts/getAllProducts",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getProductsByFilter = createAsyncThunk(
  "getProductsByFilter/getProductsByFilter",
  async ({ args }, { rejectWithValue }) => {
    try {
      const response = await axios.get(args ? `/?${args}` : "/");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getProductDetails = createAsyncThunk(
  "getProductDetails/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export { getAllProducts, getProductDetails, getProductsByFilter };
