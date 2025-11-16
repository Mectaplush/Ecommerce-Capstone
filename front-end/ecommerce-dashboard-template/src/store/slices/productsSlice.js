import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../lib/axios";
import {
  toggleCreateProductModal,
  toggleUpdateProductModal,
} from "./extraSlice";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    fetchingProduct: false,
    products: [],
    totalProducts: 0,
  },
  reducers: {
    createProductRequest: (state) => {
      state.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.products = [action.payload, ...state.products];
      state.totalProducts += 1;
      // state.products.unshift(action.payload);
      // state.totalProducts += 1;
    },
    createProductFailed: (state) => {
      state.loading = false;
    },
    fetchAllProductsRequest: (state) => {
      state.fetchingProducts = true;
    },
    fetchAllProductsSuccess: (state, action) => {
      state.fetchingProducts = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
    },
    fetchAllProductsFailed: (state) => {
      state.fetchingProducts = false;
    },
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.totalProducts = Math.max(0, state.totalProducts - 1);
    },
    deleteProductFailed: (state) => {
      state.loading = false;
    },
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    updateProductFailed: (state) => {
      state.loading = false;
    },
  },
});

export const createNewProduct = (productData) => async (dispatch) => {
  dispatch(productSlice.actions.createProductRequest());
  try {
    const response = await axiosInstance.post(
      "/product/admin/create",
      productData
    );
    dispatch(productSlice.actions.createProductSuccess(response.data.product));
    toast.success(response.data.message || "Product created successfully");
    dispatch(toggleCreateProductModal());
  } catch (error) {
    dispatch(productSlice.actions.createProductFailed());
    toast.error(error.response?.data?.message || "Failed to create product");
  }
};

export const fetchAllProducts = (page) => async (dispatch) => {
  dispatch(productSlice.actions.fetchAllProductsRequest());
  try {
    const response = await axiosInstance
      .get(`/product?page=${page || 1}`)
      .then((response) => {
        dispatch(productSlice.actions.fetchAllProductsSuccess(response.data));
      });
  } catch (error) {
    dispatch(productSlice.actions.fetchAllProductsFailed());
  }
};

export const deleteProduct = (id, page) => async (dispatch, getState) => {
  dispatch(productSlice.actions.deleteProductRequest());
  try {
    await axiosInstance
      .delete(`/product/admin/delete/${id}`)
      .then((response) => {
        dispatch(productSlice.actions.deleteProductSuccess(id));
        toast.success(response.data.message || "Product deleted successfully");

        const state = getState();
        const updateTotal = state.product.totalProducts;
        const updateMaxPage = Math.ceil(updateTotal / 10) || 1;

        const validPage = Math.min(page, updateMaxPage);
        dispatch(fetchAllProducts(validPage));
      });
  } catch (error) {
    dispatch(productSlice.actions.deleteProductFailed());
    toast.error(error.response?.data?.message || "Failed to delete product");
  }
};

export const updateProduct = (id, updatedData) => async (dispatch) => {
  dispatch(productSlice.actions.updateProductRequest());
  try {
    const response = await axiosInstance
      .put(`/product/admin/update/${id}`, updatedData)
      .then((response) => {
        dispatch(
          productSlice.actions.updateProductSuccess(
            response.data.updatedProduct
          )
        );
        toast.success(response.data.message || "Product updated successfully");
        dispatch(toggleUpdateProductModal());
      });
  } catch (error) {
    dispatch(productSlice.actions.updateProductFailed());
    toast.error(error.response?.data?.message || "Failed to update product");
  }
};

export default productSlice.reducer;
