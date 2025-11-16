import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../lib/axios";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    totalUsers: 0,
    users: [],
    totalRevenueAllTime: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    totalUsersCount: 0,
    monthlySales: [],
    orderStatusCounts: {},
    topSellingProducts: [],
    lowStockProducts: 0,
    revenueGrowth: "",
    newUsersThisMonth: 0,
    currentMonthSales: 0,
  },
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
    },
    getAllUsersFail: (state) => {
      state.loading = false;
    },
    getDashboardStatsRequest: (state) => {
      state.loading = true;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.totalUsers = Math.max(0, state.totalUsers - 1);
      state.totalUsers = Math.max(0, state.totalUsersCount - 1);
    },
    deleteUserFail: (state) => {
      state.loading = false;
    },
    getDashboardStatsRequest: (state) => {
      state.loading = true;
    },
    getDashboardStatsSuccess: (state, action) => {
      state.loading = false;
      state.totalRevenueAllTime = action.payload.totalRevenueAllTime;
      state.todayRevenue = action.payload.todayRevenue;
      state.yesterdayRevenue = action.payload.yesterdayRevenue;
      state.totalUsersCount = action.payload.totalUsersCount;
      state.monthlySales = action.payload.monthlySales;
      state.orderStatusCounts = action.payload.orderStatusCounts;
      state.topSellingProducts = action.payload.topSellingProducts;
      state.lowStockProducts = action.payload.lowStockProducts?.length || 0;
      state.revenueGrowth = action.payload.revenueGrowth;
      state.newUsersThisMonth = action.payload.newUsersThisMonth;
      state.currentMonthSales = action.payload.currentMonthSales;
    },
    getDashboardStatsFail: (state) => {
      state.loading = false;
    },
  },
});

export const fetchAllUsers = (page) => async (dispatch) => {
  dispatch(adminSlice.actions.getAllUsersRequest());
  await axiosInstance
    .get(`/admin/get-all-users?page=${page || 1}`)
    .then((response) => {
      dispatch(adminSlice.actions.getAllUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(adminSlice.actions.getAllUsersFail());
    });
};

export const deleteUser = (id, page) => async (dispatch, getState) => {
  dispatch(adminSlice.actions.deleteUserRequest());
  await axiosInstance
    .delete(`/admin/delete/${id}`)
    .then((response) => {
      dispatch(adminSlice.actions.deleteUserSuccess(id));
      toast.success(response.data.message || "User deleted successfully");
    
      const state = getState();
      const updateTotal = state.admin.totalUsers;
      const updateMaxPage = Math.ceil(updateTotal / 10) || 1;

      const validPage = Math.min(page, updateMaxPage);
      dispatch(fetchAllUsers(validPage));
    })
    .catch((error) => {
      dispatch(adminSlice.actions.deleteUserFail());
      toast.error(
        error.response?.data?.message || "Failed to delete user"
      );
    });
};

export const getDashboardStats = (page) => async (dispatch) => {
  dispatch(adminSlice.actions.getDashboardStatsRequest());
  await axiosInstance
    .get(`/admin/fetch/dashboard-stats`)
    .then((response) => {
      dispatch(adminSlice.actions.getDashboardStatsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(adminSlice.actions.getDashboardStatsFail());
    });
};

export default adminSlice.reducer;
