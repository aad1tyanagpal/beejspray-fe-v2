import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../shared/services/axiosInstance";

export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI)=>{
    try {
      const response = await api.post("/register", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState:{
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },

  reducers: {
    clearError(state) {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export const { clearError } = authSlice.actions;
export default authSlice.reducer;