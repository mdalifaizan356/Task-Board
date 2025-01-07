import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    showPopup: false,
    message: "",
  },
  reducers: {
    show(state, action) {
      state.showPopup = true;
      state.message = action.payload; 
    },
    hide(state) {
      state.showPopup = false;
      state.message = "";
    },
  },
});

export const { show, hide } = popupSlice.actions;
export default popupSlice.reducer;
