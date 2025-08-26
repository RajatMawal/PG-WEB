import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_BACKEND_URL;

export const userLogin = createAsyncThunk(
  "user/login",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(`${URL}/api/user/login`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message || "Server Error");
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (data, thunkApi) => {
    try {
      const response = await axios.post(`${URL}/api/user/register`, data,{withCredentials:true});
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${URL}/api/user/allUsers`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateRole = createAsyncThunk(
  "user/updateRole",
  async ({ id, role }, thunkApi) => {
    try {
      const response = await axios.patch(
        `${URL}/api/user/update-role/${id}`,
        { role },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAccess = createAsyncThunk(
  "user/getAccess",async(_,thunkApi)=>{
    try {
      const response = await axios.get(`${URL}/api/user/getAccess`,{withCredentials:true})
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data)
    }
  }
)

export const logoutUser = createAsyncThunk(
  "user/logoutUser",async(_,thunkApi)=>{
    try {
      const response = await axios.get(`${URL}/api/user/logoutUser`,{withCredentials:true})
    return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message || "Failed to Logout")
    }
  }
)

export const deleteUser = createAsyncThunk(
  "user/delete", async(id,thunkApi)=>{
try {
    const response = await axios.delete(`${URL}/api/user/delete-user/${id}`,{withCredentials:true})
    return response.data
} catch (error) {
  return thunkApi.rejectWithValue(error)
}  }
)

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",async(data,thunkApi)=>{
    try {
      const response = await axios.post(`${URL}/api/user/forgotPassword`,{ email: data.email })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message || "Something went wrong")
    }
  }
)

export const otpVerify = createAsyncThunk(
  "user/otpVerify", async(otp,thunkApi)=>{
    try {
      const response = await axios.post(`${URL}/api/user/otp-Verify`,otp)
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.messagem || "Failed to Verify Otp ")
    }
  }
)

export const updatepassword = createAsyncThunk(
  "user/updatepassword",
  async ({ email, newPassword }, thunkApi) => {
    try {
      const response = await axios.post(`${URL}/api/user/updatePassword`, {
        email,
        password: newPassword, 
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);


const initialState = {
  users: null,
  email:null,
  otp:null,
  password:null,
  loading: true,
  error: false,
  role:null,
  allUsers: [],
  isAuthenticated:false
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.isAuthenticated=false
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.isAuthenticated = true
        state.error = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated=false
        state.error = action.payload || action.error.message;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
      if (state.allUsers) {
        state.allUsers.push(action.payload);
      } else {
        state.allUsers = [action.payload];
      }
      state.loading = false;
      state.isAuthenticated = true;
    })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
        state.error = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.user || action.payload;
        state.allUsers = state.allUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      }).addCase(getAccess.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAccess.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.role = action.payload.user.role; 
      })
      .addCase(getAccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      }).addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.isAuthenticated = false
        state.role = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      }).addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      }).addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      }).addCase(otpVerify.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload;
      })
      .addCase(otpVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      }).addCase(updatepassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatepassword.fulfilled, (state, action) => {
        state.loading = false;
        state.password = action.payload;
      })
      .addCase(updatepassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
  },
});

export default userSlice.reducer;
