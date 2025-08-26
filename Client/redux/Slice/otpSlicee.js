import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const sendOtp = createAsyncThunk(
  "otp/sendOtp",
  async ({ email }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/otp/send-otp`, { email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: "Failed to send OTP" });
    }
  }
);


export const verifyOtp = createAsyncThunk(
  "otp/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/otp/verify-otp`, { email, otp });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: "Invalid OTP" });
    }
  }
);


const otpSlice = createSlice({
  name: "otp",
  initialState: {
    loading: false,
    otps: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otps = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otps = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default otpSlice.reducer;
