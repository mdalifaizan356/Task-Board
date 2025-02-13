import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from "../../lib/axios";

// API call with createAsyncThunk
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token"); // Token fetch karo
    if (!token) return thunkAPI.rejectWithValue("No token found"); // Token nahi toh error return karo

    const response = await axiosInstance.get("/newuser/fetchUser", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

// Initial State
const initialState = {
  email: "",
  name: "",
  phone: "",
  role: "",
  id: "",
  createdDate: "",
  isLoggedIn: false,
  loading: false,  // Added loading state
  error: null      // Added error state
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: { 
    setUser(state, action) {
      const { email, name, phone, role, _id, createdDate } = action.payload; 
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.role = role;
      state.id = _id;
      state.createdDate = createdDate;
      state.isLoggedIn = true;
    },
    
    clearUser(state) {
      state.email = "";
      state.name = "";
      state.phone = "";
      state.role = "";
      state.id = "";
      state.createdDate = "";
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        const { email, name, phone, role, _id, createdDate } = action.payload; 
        state.email = email;
        state.name = name;
        state.phone = phone;
        state.role = role;
        state.id = _id;
        state.createdDate = createdDate;
        state.isLoggedIn = true;
      })
      
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;