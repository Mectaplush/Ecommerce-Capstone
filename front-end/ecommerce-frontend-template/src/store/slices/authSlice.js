import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { toggleAuthPopup } from "./popupSlice";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res.data.message);
      thunkAPI.dispatch(toggleAuthPopup());
      return res.data.user;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
        try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success(res.data.message);
      thunkAPI.dispatch(toggleAuthPopup());
      return res.data.user;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (data, thunkAPI) => {
            try {
      const res = await axiosInstance.get("/auth/me");
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Cannot get user data");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/logout");
      thunkAPI.dispatch(toggleAuthPopup());
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// export const forgotPassword = createAsyncThunk(
//   "auth/password/forgot",
//   async (email, thunkAPI) => {
//     try {
//       const res = await axiosInstance.post("/auth/password/forgot", { email });
//       toast.success(res.data.message);
//       return null;
//     } catch (error) {
//       toast.error(error.response.data.message);
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   }
// );

// ...existing code...
export const forgotPassword = createAsyncThunk(
  "auth/password/forgot",
  async ({ email, frontend }, thunkAPI) => {
    try {
      const payload = {
        email: String(email || "").trim().toLowerCase(),
        frontend: frontend || window.location.origin,
      };
      const res = await axiosInstance.post("/auth/password/forgot", payload);
      toast.success(res.data.message);
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Forgot Password Failed");
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Forgot Password Failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset/password",
  async ({token, password, confirmPassword}, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/password/reset/${token}`, { password, confirmPassword });
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message = toast.error(error.response.data.message || "Failed to reset password");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/update/password",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/password/update`, data);
      toast.success(res.data.message);
      return null;
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/me/update",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/auth/profile/update`, data);
      toast.success(res.data.message);
      return res.data.user;
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isSigningUp = false;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      // Get User
      .addCase(getUser.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state, action) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state,action) => {
        state.authUser = state.authUser;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isRequestingForToken = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isRequestingForToken = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isRequestingForToken = false;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isUpdatingPassword = false;
        state.authUser = action.payload;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isUpdatingPassword = false;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      })
      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isUpdatingPassword = false;
      });
  },
});

export default authSlice.reducer;
