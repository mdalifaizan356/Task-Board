import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { axiosInstance } from "../../lib/axios";


// API call with createAsyncThunk
const token = localStorage.getItem("token"); 
export const fetchUser = createAsyncThunk("user/fetchUser", async (token, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/newuser/fetchUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});


// Slice
const initialState = {
  email: "",
  name: "",
  phone: "",
  role: "",
  id: "",
  createdDate: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: { 
    setUser(state, action) {
      const { email, name, phNo, role, _id, createdDate} = action.payload; 
      state.email = email;
      state.name = name;
      state.phone = phNo;
      state.role = role;
      state.id = _id;
      state.createdDate=createdDate;
      state.isLoggedIn = true;
    },
    
    clearUser(state) {
      state.email = null;
      state.name = null;
      state.phone = null;
      state.role = null;
      state.id = null;
      state.createdDate=null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;