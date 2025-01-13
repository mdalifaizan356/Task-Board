import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
