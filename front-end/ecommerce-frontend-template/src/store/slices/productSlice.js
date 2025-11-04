import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async({
    availability="",
    price="0-10000",
    category="",
    ratings="",
    search="",
    page=1,
  },thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if(category) params.append("category", category);
      if(price) params.append("price", price);
      if(search) params.append("search", search);
      if(ratings) params.append("ratings", ratings);
      if(availability) params.append("availability", availability);
      if(page) params.append("page", page); 

      const res = await axiosInstance.get(`/products?${params.toString()}`);

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/products/${productId}`);
      return res.data.product;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch product details");
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch product details");
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    productDetails: {},
    totalProducts: 0,
    topRatedProducts: [],
    newProducts: [],
    aiSearching: false,
    isReviewDeleting: false,
    isPostingReview: false,
    productReviews: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.newProducts = action.payload.newProducts;
      state.topRatedProducts = action.payload.topRatedProducts;
      state.totalProducts = action.payload.totalProducts;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
