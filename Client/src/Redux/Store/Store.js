import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import popupReducer from "../Slices/PopUpSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    popup: popupReducer,
  },
});

export default store;